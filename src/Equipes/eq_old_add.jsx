import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Eqoldadd = () => {
  const [libelleOptions, setLibelleOptions] = useState([]);
  const [selectedLibelleId, setSelectedLibelleId] = useState('');

  useEffect(() => {
    // Make an HTTP GET request to fetch the libelle options
    axios.get('http://localhost:8088/getLibelle')
      .then((response) => {
        if (response.data && Array.isArray(response.data.data)) {
          setLibelleOptions(response.data.data);
        } else {
          console.error('Response data does not contain an array:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching libelle options:', error);
      });
  }, []);

  const handleLibelleChange = (event) => {
    const selectedId = event.target.value;
    setSelectedLibelleId(selectedId);
  };

  return (
    <div>
      {libelleOptions.length > 0 ? (
        <div>
          <select
            name=""
            className="custom-select"
            id="old_add_equipe"
            onChange={handleLibelleChange}
            value={selectedLibelleId}
          >
            <option value=""></option>
            {libelleOptions.map((equipe) => (
              <option key={equipe.id_equipe} value={equipe.id}>
                {equipe.libelle}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Eqoldadd;
