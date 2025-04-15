package com.example.bcrypt2025.Controller;


import com.example.bcrypt2025.Model.User;

import com.example.bcrypt2025.Service.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
public class UserController {


    @Autowired
    private UserService userService;



    @GetMapping("/{idUsuario}")
    public Optional<User> getById(@PathVariable("idUsuario") int idUsuario) {
        return userService.getUser(idUsuario);
    }


    @PostMapping
    public void getAll(@RequestBody User user)
    {
        userService.save(user);
    }


    @PutMapping("/{idUsuario}")
    public ResponseEntity<?> updateUser(@PathVariable("idUsuario") int idUsuario, @RequestBody User user) {
        user.setIdUsuario(idUsuario); // Asegura que el ID esté bien asignado
        userService.Update(user);
        return ResponseEntity.ok("Usuario actualizado");
    }



    @DeleteMapping("/{idUsuario}")
    public void saveOrUpdate(@PathVariable("idUsuario")int idUsuario)
    {
        userService.delete(idUsuario);
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        boolean valid = userService.login(user.getIdUsuario(), user.getContraseniaUsuario());
        if (valid) {
            return ResponseEntity.ok("Login correcto");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login incorrecto");
        }
    }






}