document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const idUsuario = document.getElementById("idUsuario").value;
    const contraseniaUsuario = document.getElementById("contraseniaUsuario").value;

    fetch("http://localhost:8080/api/usuarios/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuario: idUsuario,
            contraseniaUsuario: contraseniaUsuario
        })
    })
    .then(response => {
        if (response.ok) {
            document.getElementById("loginMessage").innerText = "Inicio de sesión exitoso!";
            window.location.href = "dashboard.html"; // Redirige si el login es exitoso
        } else {
            throw new Error("Login incorrecto");
        }
    })
    .catch(error => {
        document.getElementById("loginMessage").innerText = error.message;
    });
});
