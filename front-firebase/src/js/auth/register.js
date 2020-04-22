const bytes = new Uint8Array([
  0x48,
  0x65,
  0x6c,
  0x6c,
  0x6f,
  0x2c,
  0x20,
  0x77,
  0x6f,
  0x72,
  0x6c,
  0x64,
  0x21,
]);

$("#boton-register").click((event) => {
  console.dir($("#formdata-input")); //Como sacar la imagen !!
  event.preventDefault();
  register(
    $("#email-input").val(),
    $("#password-input").val(),
    $("#password-confirmation-input").val(),
    $("#legal-name").val(),
    $(".dropdown-menu").val(),
    $("#id-input").val(),
    $("#telephone-input").val(),
    $("#enterprise-input").val(),
    $("#formdata-input").val()
  );
});

function register(
  email,
  password,
  conpassword,
  name,
  doctype,
  docnum,
  phone,
  company,
  file
) {
  const metadata = {
    contentType: "image/jpg",
  };
  if (password !== conpassword) {
    alert("Las contraseñas no coinciden");
  } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        alert("Usuario añadido");
        //Save user id
        localStorage.setItem("CompanyID", result.user.uid);
        //Save aditional data on database
        firebase
          .database()
          .ref(`company/${result.user.uid}`)
          .set({
            name,
            doctype,
            docnum,
            phone,
            company,
          })
          .then(() => {
            if (file) {
              firebase
                .app()
                .storage("gs://primer-parcial-e3f34.appspot.com")
                .ref()
                .child(`company/${result.user.uid}.jpg`)
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
}
