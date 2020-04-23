//Cuando se presione el input de id boton-login se activa la funcion
//Y se mandan los valores de email y password
$("#boton-login").click((event) => {
  event.preventDefault();
  login($("#email-input").val(), $("#password-input").val());
});

function login(email, password) {
  console.dir({ email, password });
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((result) => {
      alert("Sesión iniciada exitosamente");
      console.dir(user);
      //Save user id
      localStorage.setItem("UserID", result.user.uid);
      console.dir("Cambio de contraseña");
      window.location.href = "../private/perfil.html";
    })
    .catch((error) => {
      //Handle errors
      const errCode = error.code;
      const errMessage = error.message;
      switch (errCode) {
        case "auth/wrong-password":
          alert("Contraseña incorrecta");
          break;

        case "auth/invalid-email":
          alert("Email invalido");
          break;

        case "auth/user-not-found":
          alert("El usuario no existe o ha sido restringido");
          break;

        default:
          alert(errMessage);
          break;
      }
    });
}
