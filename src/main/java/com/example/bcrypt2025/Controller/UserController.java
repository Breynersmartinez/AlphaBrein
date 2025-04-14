package com.example.bcrypt2025.Controller;


import com.example.bcrypt2025.Model.User;
import com.example.bcrypt2025.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService service;

    @PostMapping("/login")
    public boolean login(@RequestBody User user) {
        return service.login(user.getUserId(), user.getPassword());
    }

    @PostMapping
    public User register(@RequestBody User user) {
        return service.register(user);
    }

    @GetMapping("/{id}")
    public Optional<User> getUser(@PathVariable("id") int userId) {
        return service.findById(userId);
    }

    @PutMapping
    public User update(@RequestBody User user) {
        return service.update(user);
    }

    @DeleteMapping("/{id}")
    public boolean delete(@PathVariable("id") int userId) {
        return service.delete(userId);
    }

}