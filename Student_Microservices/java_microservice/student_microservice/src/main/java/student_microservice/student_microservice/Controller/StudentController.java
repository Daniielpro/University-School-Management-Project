package student_microservice.student_microservice.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import student_microservice.student_microservice.Service.StudentService;
import student_microservice.student_microservice.StudentEntety.Student;

@RestController
@RequestMapping("/api/student")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @PostMapping("/crear")
    @ResponseStatus(HttpStatus.CREATED)
    public void saveCourse(@RequestBody Student student) {
        studentService.save(student);
    }

    @GetMapping("/all")
    public ResponseEntity<?> findAllCourse(){

        return ResponseEntity.ok(studentService.findAll());
    }

    @GetMapping("/search/{id_student}")
    public ResponseEntity<?> findAllCourse(@PathVariable Long id_student){
        return ResponseEntity.ok(studentService.findById(id_student));
    }


    @GetMapping("/search_by_departamento/{id_carrera}")
    public ResponseEntity<?> findbylibro(@PathVariable Long id_carrera){

        return ResponseEntity.ok(studentService.findByCarrera(id_carrera));
    }
}
