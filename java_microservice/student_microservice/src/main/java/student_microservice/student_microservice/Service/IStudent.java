package student_microservice.student_microservice.Service;

import student_microservice.student_microservice.StudentEntety.Student;

import java.util.List;

public interface IStudent {
    List<Student> findAll();

    Student findById(Long id_student);

    void save(Student libro);
    List<Student> findByCarrera(Long id_carrera);
}
