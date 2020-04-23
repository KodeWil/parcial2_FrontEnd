$("#boton-empleado").click((event) => {
  event.preventDefault();
  createEmployee(
    $("#employee-input").val(),
    $("#employeeEmail-input").val(),
    $("#direction-input").val(),
    $("#password-input").val(),
    $("#foto-input").val()
  );
});

function createEmployee(name, email, address, password, file) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((result) => {
      lert("Registro Exitoso");
      //Save user id
      localStorage.setItem("EmployeeID", result.user.uid);
      const id = localStorage.getItem("CompanyID");
      firebase
        .database()
        .ref(`employee/${id}/${result.user.uid}`)
        .set({
          name,
          address,
          password,
          company: id,
        })
        .then(() => {
          if (file) {
            firebase
              .app()
              .storage("gs://primer-parcial-e3f34.appspot.com")
              .ref()
              .child(`employee/${id}.jpg`)
              .put(file, metadata)
              .then(() => {
                alert("Imagen subida correctamente");
              });
          }
        });
    })
    .catch((error) => {
      //Handle errors
      const errCode = error.code;
      const errMessage = error.message;
      switch (errCode) {
        case "auth/email-already-in-use":
          alert("Este correo ya está en uso");
          break;

        case "auth/invalid-email":
          alert("Email invalido");
          break;

        case "auth/weak-password":
          alert("Contraseña muy debil, por favor digitar una más segura");
          break;

        default:
          alert(errMessage);
          break;
      }
    });
}

function getEmployees() {
  const id = localStorage.getItem("CompanyID");
  firebase.database.ref(`employee/${id}`).on("value", (snapshot) => {
    console.log(snapshot.val());
  });
}
