import axios from "axios";
import Eqnewadd from '../Equipes/eq_new_add';
import Eqoldadd from '../Equipes/eq_old_add';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes ,faSave   } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function AddEquipe({ setDataChanged }) {

  const [errorMessages, setErrorMessages] = useState({
    matricul_add_equipe: "",
    dateInput_add_equipe: "",
    heureInput_add_equipe: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Récupérer les valeurs des champs de formulaire
    const id_pers = document.getElementById('matricul_add_equipe').value;
    const id_old = document.getElementById('old_add_equipe').value;
    const id_new = document.getElementById('new_add_equipe').value;
    const rawDate = document.getElementById('dateInput_add_equipe').value;
    const formattedDate = moment(rawDate).format('DD/MM/YYYY');
    const heure = document.getElementById('heureInput_add_equipe').value;
  
    // Validate the fields
    const errors = {};
  
    if (!id_pers) {
      errors.matricul_add_equipe = "Veuillez remplir ce champ.";
    }
  
    if (!rawDate) {
      errors.dateInput_add_equipe = "Veuillez remplir ce champ.";
    }
  
    if (!heure) {
      errors.heureInput_add_equipe = "Veuillez remplir ce champ.";
    }
  
    if (Object.keys(errors).length > 0) {
      // If there are errors, set error messages and return
      setErrorMessages(errors);
      return;
    }
  
    // Clear error messages if there are no errors
    setErrorMessages({});
  
    // Effectuer la requête POST vers la route /add_dep
    try {
      const response = await axios.post('http://localhost:8088/add_equipe', {
        newId: null,
        id_old,
        id_new,
        date: formattedDate,
        heure,
        id_pers
      });
      document.getElementById('matricul_add_equipe').value = '';
      document.getElementById('old_add_equipe').value = '';
      document.getElementById('new_add_equipe').value = '';
      document.getElementById('dateInput_add_equipe').value = '';
      document.getElementById('heureInput_add_equipe').value = '';
  
      // Set success message
      setSuccessMessage("Equipe ajoutée !");

      setDataChanged(true);
  
      // Clear success message after 2 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
  
      console.log(response);
    } catch (error) {
      
      setErrorMessage("Erreur lors de l'insertion !");
      setTimeout(() => {
        setErrorMessage("");
      }, 1000);
      console.error(error);
    }
  };
  ;
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div className={`modal fade`} id="eqModalAdd">
          <div className="modal-dialog">
          {successMessage && (
        <div className="alert alert-success mt-3">{successMessage}</div>
      )}
            <div className="modal-content">

              {/* <!-- Modal Header --> */}
              <div className="modal-header">
                <h4 className="modal-title">Ajout d'un équipe</h4>
                <button type="button" className="close" data-dismiss="modal">×</button>
              </div>
              {/* <!-- Modal body --> */}
              <div className="modal-body">
                <div className="form">
                  <label>Matricule</label>
                  <input type="text" className={`form-control ${errorMessages.matricul_add_equipe ? 'is-invalid' : ''}`}  id="matricul_add_equipe" />
                  {errorMessages.matricul_add_equipe && <div className="invalid-feedback">{errorMessages.matricul_add_equipe}</div>}
                  {errorMessage && (
        <div className="alert alert-danger mt-3">{errorMessage}</div>
      )}
                </div><br />
                <div className="form">
                  <label>Ancien Equipe:</label>
                  <Eqoldadd />
                </div><br />
                <div className="form">
                  <label>Nouveau Equipe:</label>
                  <Eqnewadd />
                </div><br />
                <div className="flex-container">
                  <div className="flex-item">
                    <label>Date de basculement:</label>
                    <input type="date" className={`form-control ${errorMessages.dateInput_add_equipe ? 'is-invalid' : ''}`} name="date" id="dateInput_add_equipe" />
                    {errorMessages.dateInput_add_equipe && <div className="invalid-feedback">{errorMessages.dateInput_add_equipe}</div>}
                  </div><br />
                  <div className="flex-item">
                    <label>Heure de basculement:</label>
                    <input type="time" className={`form-control ${errorMessages.heureInput_add_equipe ? 'is-invalid' : ''}`} name="heure" id="heureInput_add_equipe" />
                    {errorMessages.heureInput_add_equipe && <div className="invalid-feedback">{errorMessages.heureInput_add_equipe}</div>}
                  </div>
                </div>
                <br />
              </div>
              {/* <!-- Modal footer --> */}
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary" id="save" onClick={handleSubmit}><FontAwesomeIcon icon={faSave} className="save-icon" /> Sauvegarder</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal"><FontAwesomeIcon icon={faTimes} className="cancel-icon" /> Annuler</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>

  );
}

export default AddEquipe;