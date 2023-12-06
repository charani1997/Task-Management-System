package com.example.taskmanagementapp.controller;

        import com.example.taskmanagementapp.dto.TaskDto;
        import com.example.taskmanagementapp.service.TaskService;
        import lombok.AllArgsConstructor;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.http.HttpStatus;
        import org.springframework.http.ResponseEntity;
        import org.springframework.security.access.prepost.PreAuthorize;
        import org.springframework.web.bind.annotation.*;
        import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/tasks")
@AllArgsConstructor
public class TaskController {
    @Autowired
    private TaskService taskService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<TaskDto> addTask(@RequestBody TaskDto taskDto) {
        TaskDto savedTask = taskService.addTask(taskDto);
        return new ResponseEntity<>(savedTask, HttpStatus.CREATED);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("{id}")
    public ResponseEntity<TaskDto> getTask(@PathVariable("id") Long todoId) {
        TaskDto todoDto = taskService.getTask(todoId);
        return new ResponseEntity<>(todoDto, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping
    public ResponseEntity<List<TaskDto>> getAllTasks() {
        List<TaskDto> taskDtoList = taskService.getAllTasks();
        return new ResponseEntity<>(taskDtoList, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("{id}")
    public ResponseEntity<TaskDto> updateTask(@RequestBody TaskDto taskDto,
                                              @PathVariable("id") Long taskId) {
        TaskDto updatedTask = taskService.updateTask(taskDto, taskId);
        return new ResponseEntity<>(updatedTask, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteTask(@PathVariable("id") Long taskId) {
        taskService.deleteTask(taskId);
        return new ResponseEntity<>("Task deleted successfully", HttpStatus.OK);
    }

/*    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PatchMapping("{id}/complete")
    public ResponseEntity<TaskDto> completeTask(@PathVariable("id") Long taskId) {
        TaskDto taskDto = taskService.completeTask(taskId);
        return new ResponseEntity<>(taskDto, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PatchMapping("{id}/incomplete")
    public ResponseEntity<TaskDto> inCompleteTask(@PathVariable("id") Long taskId){
        TaskDto taskDto = taskService.inCompleteTask(taskId);
        return new ResponseEntity<>(taskDto, HttpStatus.OK);
    }*/


}