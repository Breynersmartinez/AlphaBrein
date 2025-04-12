package com.example.SOLID_Principles.SRP.Model;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Getter
@Setter
@Data
@Entity
@Table(name=("Usuarios"))
public class User {


    @Id
}
