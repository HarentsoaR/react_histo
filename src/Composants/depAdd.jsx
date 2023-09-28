import Depnewadd from '../Departements/dep_new_add';
import Depoldadd from '../Departements/dep_old_add';
import axios from "axios";
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSave } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function Add({ setDataChanged }) {
  const [errorMessages, setErrorMessages] = useState({
    matricul_add: "",
    old_add: "",
    new_add: "",
    dateInput_add: "",
    heureInput_add: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Récupérer les valeurs des champs de formulaire
    const id_pers = document.getElementById('matricul_add').value;
    const id_old = document.getElementById('old_add').value;
    const id_new = document.getElementById('new_add').value;
    const rawDate = document.getElementById('dateInput_add').value;
    const heure = document.getElementById('heureInput_add').value;

    // Validate the fields
    const errors = {};

    if (!id_pers) {
      errors.matricul_add = "Veuillez remplir ce champ.";
    }

    if (!id_old) {
      errors.old_add = "Aucun département selectionné";
    }

    if (!id_new) {
      errors.new_add = "Aucun département selectionné !";
    }

    if (!rawDate) {
      errors.dateInput_add = "Veuillez remplir ce champ.";
    }

    if (!heure) {
      errors.heureInput_add = "Veuillez remplir ce champ.";
    }

    if (Object.keys(errors).length > 0) {
      // If there are errors, set error messages and return
      setErrorMessages(errors);
      return;
    }

    // Clear error messages if there are no errors
    setErrorMessages({});

    // Convert the rawDate to the desired format
    const formattedDate = moment(rawDate).format('DD/MM/YYYY');

    // Effectuer la requête POST vers la route /add_dep
    try {
      const response = await axios.post('http://localhost:8088/add_dep', {
        newId: null,
        id_old,
        id_new,
        date: formattedDate,
        heure,
        id_pers
      });

      // Clear the form fields
      document.getElementById('matricul_add').value = '';
      document.getElementById('old_add').value = '';
      document.getElementById('new_add').value = '';
      document.getElementById('dateInput_add').value = '';
      document.getElementById('heureInput_add').value = '';

      // Trigger data change
      setDataChanged(true);

      // Set success message
      setSuccessMessage("Département ajouté !");

      // Clear success message after 2 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 1000);

      console.log(response);
    } catch (error) {
      setErrorMessage("Erreur lors de l'insertion !");

      setTimeout(() => {
        setErrorMessage("");
      }, 1000);
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='modal fade' id="myModalAdd">
          <div className="modal-dialog">
          {successMessage && (
        <div className="alert alert-success mt-3">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="alert alert-danger mt-3">{errorMessage}</div>
      )}
            <div className="modal-content">
              {/* <!-- Modal Header --> */}
              <div className="modal-header">
                <h4 className="modal-title">Ajouter un département</h4>
                <button type="button" className="close close-button" data-dismiss="modal">&times;</button>
              </div>
              {/* <!-- Modal body --> */}
              <div className="modal-body">
                <div className="form">
                  <label>Matricule</label>
                  <input type="text" className={`form-control ${errorMessages.matricul_add ? 'is-invalid' : ''}`} id="matricul_add"
                  />
                  {errorMessages.matricul_add && <div className="invalid-feedback">{errorMessages.matricul_add}</div>}
                </div><br />
                <div className="form">
                  <label>Ancien département:</label>
                  <Depoldadd className={`form-control ${errorMessages.old_add ? 'is-invalid' : ''}`} />
                  {errorMessages.old_add && <div className="invalid-feedback">{errorMessages.old_add}</div>}
                </div><br />
                <div className="form">
                  <label>Nouveau département:</label>
                  <Depnewadd className={`form-control ${errorMessages.new_add ? 'is-invalid' : ''}`} />
                  {errorMessages.new_add && <div className="invalid-feedback">{errorMessages.new_add}</div>}
                </div><br />
                <div className="flex-container">
                  <div className="flex-item">
                    <label>Date de basculement:</label>
                    <input type="date" className={`form-control ${errorMessages.dateInput_add ? 'is-invalid' : ''}`} name="date" id="dateInput_add" />
                    {errorMessages.dateInput_add && <div className="invalid-feedback">{errorMessages.dateInput_add}</div>}
                  </div><br />
                  <div className="flex-item">
                    <label>Heure de basculement:</label>
                    <input type="time" className={`form-control ${errorMessages.heureInput_add ? 'is-invalid' : ''}`} name="heure" id="heureInput_add" />
                    {errorMessages.heureInput_add && <div className="invalid-feedback">{errorMessages.heureInput_add}</div>}
                  </div>
                </div>
                <br />
              </div>
              {/* <!-- Modal footer --> */}
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" id="save" onClick={handleSubmit}><FontAwesomeIcon icon={faSave} className="save-icon" /> Sauvegarder</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal"><FontAwesomeIcon icon={faTimes} className="cancel-icon" /> Annuler</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Add;
