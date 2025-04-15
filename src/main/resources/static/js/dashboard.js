// js/dashboard.js
document.getElementById("buscarForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const id = document.getElementById("idUsuario").value;

    fetch(`/api/usuarios/${id}`)
        .then(res => res.json())
        .then(user => {
            document.getElementById("resultadoUsuario").innerHTML = `
                <p><strong>ID:</strong> ${user.idUsuario}</p>
                <p><strong>Nombre:</strong> ${user.nombreUsuario}</p>
            `;
        })
        .catch(() => {
            document.getElementById("resultadoUsuario").innerText = "Usuario no encontrado.";
        });
});
