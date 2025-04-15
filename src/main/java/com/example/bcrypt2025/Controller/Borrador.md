@PutMapping("/modificar-contrasenia/{idUsuario}")
public ResponseEntity<String> actualizarContrasenia(
@PathVariable int idUsuario,
@RequestBody String nuevaContrasenia) {

        boolean actualizado = userService.actualizarContrasenia(idUsuario, nuevaContrasenia);

        if (actualizado) {
            return ResponseEntity.ok("✅ Contraseña actualizada correctamente.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(" Usuario no encontrado.");
        }
    }