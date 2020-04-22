window.onload = viewCompany();

function viewCompany() {
  const id = localStorage.getItem("CompanyID");
  firebase.database.ref(`company/${id}`).once("value", (snapshot) => {
    //Alterar el dom aquí
    console.dir(snapshot.val());
  });
}

function getEmployees() {
  firebase.database.ref(`employee/${id}`).once("value", (snapshot) => {
    //Alterar el dom aquí
    console.dir(snapshot.val());
  });
}
