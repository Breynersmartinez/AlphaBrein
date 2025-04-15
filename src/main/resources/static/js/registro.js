// js/registro.js
document.getElementById("registroForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const user = {
        idUsuario: parseInt(document.getElementById("idUsuario").value),
        nombreUsuario: document.getElementById("nombreUsuario").value,
        contraseniaUsuario: document.getElementById("contraseniaUsuario").value
    };

    fetch("/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    }).then(res => {
        if (res.ok) {
            alert("Usuario registrado con éxito");
            location.href = "index.html";
        } else {
            alert("Error al registrar");
        }
    });
});
