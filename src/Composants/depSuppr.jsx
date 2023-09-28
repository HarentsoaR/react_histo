import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faTrash, faTimes   } from '@fortawesome/free-solid-svg-icons';
function Suppr({ itemId, onItemDeleted }) {
  const handleDelete = async (itemId) => {
    axios
      .delete(`http://localhost:8088/delete_dep/${itemId}`)
      .then(response => {
        console.log(response.data);
        // Call the onItemDeleted callback to remove the deleted item from the data state
        onItemDeleted(itemId);
      })
      .catch(error => {
        console.error(error);
      });
  };

return (
  <div>
  <div className="modal fade" id="myModalSupr">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">

        {/* <!-- Modal Header --> */}
        <div className="modal-header">
          <h4 className="modal-title">Confirmer la suppression</h4>
          <button type="button" className="close" data-dismiss="modal">&times;</button>
        </div>

        {/* <!-- Modal footer --> */}
        <div className="modal-footer">
          <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => handleDelete(itemId)} ><FontAwesomeIcon icon={faTrash} className="delete-icon" /> Supprimer</button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal"><FontAwesomeIcon icon={faTimes} className="cancel-icon" /> Annuler</button>
        </div>

      </div>
    </div>
  </div>

</div>

);
}

export default Suppr;