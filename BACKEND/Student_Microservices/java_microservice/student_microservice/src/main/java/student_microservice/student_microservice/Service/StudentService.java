package student_microservice.student_microservice.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import student_microservice.student_microservice.Persistence.StudentRepository;
import student_microservice.student_microservice.StudentEntety.Student;

import java.util.List;

@Service
public class StudentService implements IStudent{
    @Autowired
    private StudentRepository StudentRepository;


    @Override
    public List<Student> findAll() {
        return (List<Student>) StudentRepository.findAll();
    }

    @Override
    public Student findById(Long id_student) {
        return StudentRepository.findById(id_student).orElseThrow();
    }

    @Override
    public void save(Student student) {
        StudentRepository.save(student);

    }

    @Override
    public List<Student> findByCarrera(Long id_carrera) {
        return StudentRepository.findByIdcarrera(id_carrera);
    }


}

