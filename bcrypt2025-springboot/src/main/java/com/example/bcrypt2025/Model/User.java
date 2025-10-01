package com.example.bcrypt2025.Model;

import jakarta.persistence.*;
import lombok.Data;


import jakarta.persistence.Id;
import jakarta.persistence.Table;



@Entity

// Nombre de la tabla de la base de datos que esta mapeada la entidad
@Table(name = "USUARIO")
public class User {

    @Id
    @Column(name="ID_USUARIO", unique = true, nullable = false)
    private int idUsuario;

    @Column(name = "NOMBRE_USUARIO")
    private  String nombreUsuario;

    @Column(name = "CONTRASENIA_USUARIO")
    private String contraseniaUsuario;


    public int getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(int idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public String getContraseniaUsuario() {
        return contraseniaUsuario;
    }

    public void setContraseniaUsuario(String contraseniaUsuario) {
        this.contraseniaUsuario = contraseniaUsuario;
    }
}