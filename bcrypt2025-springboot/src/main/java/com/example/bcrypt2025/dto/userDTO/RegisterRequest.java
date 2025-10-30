package com.example.bcrypt2025.dto.userDTO;


import com.example.bcrypt2025.model.enums.IdentificationType;
import com.example.bcrypt2025.model.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;



// DTO para registro
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    private Integer idCard;
    //COMPOSICION
    private IdentificationType identificationType;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phoneNumber;
    private String direction;
    private Role role; // ADMIN o USER
}
