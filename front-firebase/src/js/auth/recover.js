function recoverPassword(email) {
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      alert("Se le ha enviando un codigo de recuperación al correo");
    })
    .catch((error) => {
      const errCode = error.code;
      const errMessage = error.message;
      switch (errCode) {
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

function confirmRecover(code, newPassword) {
  firebase
    .auth()
    .confirmPasswordReset(code, newPassword)
    .then(() => {
      alert("Contraseña cambiada");
    })
    .catch((error) => {
      const errCode = error.code;
      const errMessage = error.message;
      switch (errCode) {
        case "auth/expired-action-code":
          alert("Codigo vencido");
          break;

        case "auth/invalid-action-code":
          alert("Codigo invalido");
          break;

        case "auth/weak-password":
          alert("Contraseña muy debil");
          break;

        default:
          alert(errMessage);
          break;
      }
    });
}
