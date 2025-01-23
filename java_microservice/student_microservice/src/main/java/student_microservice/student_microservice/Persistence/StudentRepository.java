package student_microservice.student_microservice.Persistence;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import student_microservice.student_microservice.StudentEntety.Student;

import java.util.List;

@Repository
public interface StudentRepository extends CrudRepository<Student,Long> {
    public List<Student> findByIdcarrera (Long id_carrera);
}
