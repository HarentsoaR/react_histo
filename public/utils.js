
function historiqueEmploye() {

  console.log("mety");
  // const matricule = document.getElementById("matricule").value;
  // window.location.href = `/affiche_dep?matricule=${matricule}`;
  // document.getElementById("mat").textContent = matricule;
}

document.addEventListener('DOMContentLoaded', function () {
  const dateInput = "06/13/2023";
  const [month, day, year] = dateInput.split("/");
  const convertedDate = new Date(`${year}-${month}-${day}`);
  const formattedDate = convertedDate.toISOString().split("T")[0];
  console.log(formattedDate);
  const saveButton = document.getElementById('save');

});



