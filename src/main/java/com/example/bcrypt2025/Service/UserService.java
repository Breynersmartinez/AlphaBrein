package com.example.bcrypt2025.Service;



import com.example.bcrypt2025.Model.User;
import com.example.bcrypt2025.Repository.UserRepository;
import com.example.bcrypt2025.util.MD5Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


// business logic

@Service
public class UserService  {

    @Autowired
    private UserRepository repository;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public boolean login(int userId, String password) {
        Optional<User> userOpt = repository.findById(userId);
        return userOpt.map(user -> passwordEncoder.matches(password, user.getPassword()))
                .orElse(false);
    }

    public User register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return repository.save(user);
    }

    public Optional<User> findById(int userId) {
        return repository.findById(userId);
    }

    public boolean delete(int userId) {
        if (repository.existsById(userId)) {
            repository.deleteById(userId);
            return true;
        }
        return false;
    }

    public User update(User user) {
        if (!user.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        } else {
            user.setPassword(repository.findById(user.getUserId()).get().getPassword());
        }
        return repository.save(user);
    }

}
