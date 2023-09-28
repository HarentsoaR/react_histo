import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import UpdateEquipe from "./eqUpdate";
 import SupprEquipe from "./eqSuppr";
 import AddEquipe from "./equAdd";
 import Recharts from './equipeChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';

function IndexEquipe() {
  const [data, setData] = useState([]);
  const [dataChanged, setDataChanged] = useState(false);
  const [matricule, setMatricule] = useState("");
  const [errorMat, setErrorMat] = useState("");


  const historiqueEmploye = async (event) => {
    event.preventDefault();
    // const inputValue = event.target.value;
    // setMatricule(inputValue);
  
    try {
      const response = await axios.get(`http://localhost:8088/affiche_equipe?matricule=${matricule}`);
    console.log(response.data.data);
      setData(response.data.data); // pour userController1.js
      // setData(response.data); pour userController.js

      if (response.data.data === null) {
        setErrorMat("Veuillez entrer un matricule valide");
      } else if (response.data.data.length === 0) {
        setErrorMat("Pas d'historique d'equipe pour ce matricule");
      } else {
        setErrorMat(response.data.data.length + " changement de d'equipe");
      }

    } catch (error) {
      
    }
  };

  const handleItemAdded = (newEquipe) => {
    // Update the data state to include the new department
    setData([...data, newEquipe]);

    setDataChanged(true);
  };

  const handleMatriculeChange = (event) => {
    setMatricule(event.target.value);

    setDataChanged(true);
  };

  const handleItemDeleted = (deletedItemId) => {
    // Filter the data array to exclude the deleted item
    setData((prevData) => prevData.filter(item => item.id !== deletedItemId));
  };
  
  useEffect(() => {
    const historiqueEmployeChanged = async () => {
      try {
        const response = await axios.get(`http://localhost:8088/affiche_equipe?matricule=${matricule}`);
        setData(response.data.data);

        setDataChanged(false);
      } catch (error) {
        // Uncomment the line below to clear data on error
        // setData([]);
      }
    };
  
    if (dataChanged) {
      console.log("setDataChanged true");
      historiqueEmployeChanged();
      setDataChanged(true);
    }
  }, [dataChanged, matricule]);
  


  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItemMat, setselectedItemMat] = useState(null);

  const handleModifierClick = (id, id_pers) => {
    setSelectedItemId(id);
    setselectedItemMat(id_pers);
  };

  const handleSupprimerClick = (id) => {
    setSelectedItemId(id);
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-3 col-md-6 col-lg-4">
              <div className="row content_1" data-aos="zoom-in">
                <form onSubmit={historiqueEmploye}>
                  <h2>Matricule</h2>
                  <div className="d-flex">
                    <input type="text" className="form-control" id="matricule" placeholder="Numéro matricule" onChange={handleMatriculeChange} />
                    <button type="submit" className="btn btn-primary"><FontAwesomeIcon icon={faSearch} className="search-icon" /></button>
                  </div>
                  {errorMat && <div className="error_message">{errorMat}</div>}
                </form>
              </div>

              <div className="row content_1" data-aos="fade-left">
                <p className="more"><strong>{data && data.length > 0 ? data[0].id_pers.toString().padStart(5, '0') : ""}</strong></p>
                <p>Prénom: <strong>{data &&  data.length > 0 ? data[0].prenom : ""}</strong></p>
                <p>Equipe actuel: <strong>{data &&  data.length > 0 ? data[data.length - 1].libelle_new : ""}</strong></p>
              </div>
              {console.log(data)}

            </div>
            {/* Représentation graphique */}
            <div className="col-sm-9 col-md-6 col-lg-8">
              <div className="content_Graph" data-aos="flip-right">
                <h2>Représentation graphique:</h2>
                <div id="myChart">
                  <Recharts
                    dataMat={data}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <table className="table content_2 ">
          <thead>
            <tr>

              <th scope="col">Matricule</th>
              <th scope="col">Nom</th>
              <th scope="col">Prénom</th>
              <th scope="col">Ancien Equipe</th>
              <th scope="col">Nouveau Equipe</th>
              <th scope="col">Date de basculement</th>
              <th scope="col"></th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data && Array.isArray(data) && data.map((item, index) => {

              const isFirstDate = index === 0;
              const isSameValue = item.libelle_old === item.libelle_new || !item.libelle_old || !item.libelle_new;
              const SameValuAndFirstDate = isSameValue && !isFirstDate;

              return (
                <tr key={item.id}>
                  <th className={SameValuAndFirstDate ? 'same-value' : ''} scope="row">{item.id_pers.toString().padStart(5, '0')}</th>
                  <td className={SameValuAndFirstDate ? 'same-value' : ''}>{item.nom}</td>
                  <td className={SameValuAndFirstDate ? 'same-value' : ''}>{item.prenom}</td>
                  <td className={SameValuAndFirstDate ? 'same-value' : ''}>{item.libelle_old}</td>
                  <td className={SameValuAndFirstDate ? 'same-value' : ''}>{item.libelle_new}</td>
                  <td className={SameValuAndFirstDate ? 'same-value' : ''}>{item.date_basculement}</td>
                  <th className={SameValuAndFirstDate ? 'same-value ' : ''}>{SameValuAndFirstDate ? 'A modifier' : ''}</th>
                  <td className={SameValuAndFirstDate ? 'same-value' : ''}>
                    <div className="btn-group" role="group">
                      <button type="button" className="btn modif btn-sm" data-toggle="modal" data-target="#myModalModif" onClick={() => handleModifierClick(item.id, item.id_pers)}>
                        <FontAwesomeIcon icon={faEdit} className="icon" />  Modifier
                      </button>
                      <button type="button" className="btn supp btn-sm" data-toggle="modal" data-target="#myModalSupr" onClick={() => handleSupprimerClick(item.id)}>
                        <FontAwesomeIcon icon={faTrash} className="delete-icon" /> Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            
          </tbody>
        </table>
        <h3>
        </h3>
        <button type="button" className="btn btn-success btn-lg" data-toggle="modal" data-target="#eqModalAdd">
          <FontAwesomeIcon icon={faPlus} className="add-icon" /> Ajouter a un équipe
        </button><br /><br /><br />
      </div>

      {/* Modal Ajouter */}
      <AddEquipe
        dataChanged={dataChanged}
        setDataChanged={setDataChanged}
        onItemAdded={handleItemAdded}
      />

      {/* Modal Modifier */}
      <UpdateEquipe
        itemId={selectedItemId}
        itemMat={selectedItemMat}
        setDataChanged={setDataChanged}
      />

      <SupprEquipe
        itemId={selectedItemId}
        setDataChanged={setDataChanged}
        onItemDeleted={handleItemDeleted}
      />



    </div>

  );
}

export default IndexEquipe;