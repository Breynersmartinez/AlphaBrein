//Actualizacion de contraseña
public boolean actualizarContrasenia(int idUsuario, String nuevaContrasenia) {
Optional<User> optionalUser = userRepository.findById(idUsuario);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setContraseniaUsuario(encoder.encode(nuevaContrasenia));
            userRepository.save(user);
            return true;
        }
        return false;
    }