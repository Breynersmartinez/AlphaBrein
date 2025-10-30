package com.example.bcrypt2025.dto.authDTO;



import com.example.bcrypt2025.model.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;



// DTO para respuesta de autenticación
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String email;
    private String firstName;
    private String lastName;
    private Role role;
    private String message;
}