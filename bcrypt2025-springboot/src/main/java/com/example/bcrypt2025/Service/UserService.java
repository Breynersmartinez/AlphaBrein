package com.example.bcrypt2025.Service;


import com.example.bcrypt2025.Model.User;
import com.example.bcrypt2025.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.List;


@Service
public class UserService {
     private final UserRepository userRepository;
    private final  BCryptPasswordEncoder encoder;


    public UserService(UserRepository userRepository, BCryptPasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.encoder = encoder;
    }

    public Optional<User> getUser(int idUsuario)
    {
        return userRepository.findById(idUsuario);
    }




    public void save(User user) {
        user.setContraseniaUsuario(encoder.encode(user.getContraseniaUsuario()));
        userRepository.save(user);
    }



    public void Update(User user) {
        Optional<User> existingUser = userRepository.findById(user.getIdUsuario());

        if (existingUser.isPresent()) {
            User userFromDb = existingUser.get();

            // Actualizar el nombre de usuario si cambió
            userFromDb.setNombreUsuario(user.getNombreUsuario());

            // Verificar si la contraseña fue cambiada antes de volver a codificarla
            String nuevaContrasenia = user.getContraseniaUsuario();
            if (!encoder.matches(nuevaContrasenia, userFromDb.getContraseniaUsuario())) {
                userFromDb.setContraseniaUsuario(encoder.encode(nuevaContrasenia));
            }

            userRepository.save(userFromDb);
        } else {
            // Si no existe, crear uno nuevo con la contraseña codificada
            user.setContraseniaUsuario(encoder.encode(user.getContraseniaUsuario()));
            userRepository.save(user);
        }
    }


    public void delete( int idUsuario)
    {
        userRepository.deleteById(idUsuario);
    }



    //Login
    public boolean login(int idUsuario, String rawPassword) {
        Optional<User> optionalUser = userRepository.findById(idUsuario);
        if (optionalUser.isPresent()) {
            String hashedPassword = optionalUser.get().getContraseniaUsuario();
            return encoder.matches(rawPassword, hashedPassword);
        }
        return false;
    }
}