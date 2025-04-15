// js/editar.js
document.getElementById("editarForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const id = document.getElementById("idUsuario").value;
    const usuarioActualizado = {
        nombreUsuario: document.getElementById("nombreUsuario").value,
        contraseniaUsuario: document.getElementById("contraseniaUsuario").value
    };

    fetch(`/api/usuarios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioActualizado)
    })
    .then(res => {
        if (res.ok) {
            alert("Usuario actualizado");
        } else {
            alert("No se pudo actualizar");
        }
    });
});
