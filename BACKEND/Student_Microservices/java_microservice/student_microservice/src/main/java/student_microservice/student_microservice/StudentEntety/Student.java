package student_microservice.student_microservice.StudentEntety;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@Table(name="Student")
@AllArgsConstructor
@NoArgsConstructor
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id_student;
    private String nombre;
    private String apellido;
    private String direccion;
    private String edad;
    private Long idcarrera;
}



