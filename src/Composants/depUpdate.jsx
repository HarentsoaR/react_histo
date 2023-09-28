import axios from "axios";
import Depnewup from '../Departements/dep_new_up';
import Depoldup from '../Departements/dep_old_up';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes ,faSave  } from '@fortawesome/free-solid-svg-icons';

function Update({ itemId, itemMat }) {

  const handleModifSave = async (itemId) => {
   
    const id_old = document.getElementById('old_up').value;
    const id_new = document.getElementById('new_up').value;
    const rawDate = document.getElementById('date_up').value;
    const formattedDate = moment(rawDate).format('DD/MM/YYYY');
    try {
      const response = await axios.put(`http://localhost:8088/update_dep/${itemId}`, {
        id_old,
        id_new,
        date: formattedDate
      
      });
      document.getElementById('old_up').value = '';
      document.getElementById('new_up').value = '';
      document.getElementById('date_up').value = '';

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };


return (
  <div>
    <div className="modal fade" id="myModalModif">
      <div className="modal-dialog">
        <div className="modal-content">

          {/* Modal Header  */}
          <div className="modal-header">
            <h4 className="modal-title">Modification matricule : <span id='ModalsID'>0{itemMat}</span></h4>
            <button type="button" className="close" data-dismiss="modal">×</button>
          </div>

          {/*  Modal body  */}
          <div className="modal-body">
            <div className="form">

            </div><br />
            <div className="form">
              <label>Ancien département:</label>
              <Depoldup />
            </div><br />
            <div className="form">
              <label>Nouveau département:</label>
              <Depnewup />
            </div><br />
            <div className="form">

              <label>Date de basculement:</label>  <br />
              <input type="date" name="date" id="date_up" />
              <br />

            </div>
            <br />
          </div>

          {/* Modal footer*/}
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => handleModifSave(itemId)} ><FontAwesomeIcon icon={faSave} className="save-icon" />Sauvegarder</button>
            <button type="button" className="btn btn-secondary" data-dismiss="modal"><FontAwesomeIcon icon={faTimes} className="cancel-icon" /> Annuler</button>
          </div>

        </div>
      </div>
    </div>
  </div>

);
}

export default Update;