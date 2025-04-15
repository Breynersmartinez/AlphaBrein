 const infoSesion = document.getElementById("infoSesion");
    const btnLogin = document.getElementById("btnLogin");
    const btnCerrarSesion = document.getElementById("cerrarSesion");

    const usuario = JSON.parse(localStorage.getItem("usuarioLogeado"));

    if (usuario) {
      infoSesion.innerHTML = `
        <p><strong>Usuario Logueado:</strong> ${usuario.nombreUsuario} (ID: ${usuario.idUsuario})</p>
      `;
      btnLogin.style.display = "none";
      btnCerrarSesion.style.display = "inline-block";
    } else {
      infoSesion.innerHTML = `<p>No has iniciado sesión.</p>`;
    }

    btnCerrarSesion.addEventListener("click", () => {
      localStorage.removeItem("usuarioLogeado");
      location.reload(); // Refresca para actualizar la interfaz
    });