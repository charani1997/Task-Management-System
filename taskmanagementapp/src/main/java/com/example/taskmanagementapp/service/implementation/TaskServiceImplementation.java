package com.example.taskmanagementapp.service.implementation;

import com.example.taskmanagementapp.dto.TaskDto;
import com.example.taskmanagementapp.entity.Task;
import com.example.taskmanagementapp.exception.ResourceNotFoundException;
import com.example.taskmanagementapp.repository.TaskRepository;
import com.example.taskmanagementapp.service.TaskService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
@AllArgsConstructor
public class TaskServiceImplementation implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private ModelMapper modelMapper;
    @Override
    public TaskDto addTask(TaskDto taskDto) {

        Task task = modelMapper.map(taskDto, Task.class);

        Task savedTask = taskRepository.save(task);

        return modelMapper.map(savedTask, TaskDto.class);
    }

    @Override
    public TaskDto getTask(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Todo not found with id: " + id));
        return modelMapper.map(task, TaskDto.class);
    }

    @Override
    public List<TaskDto> getAllTasks() {
        List<Task> taskList = taskRepository.findAll();
        return taskList.stream()
                .map((item)-> modelMapper.map(item,TaskDto.class))
                .toList();
    }

    @Override
    public TaskDto updateTask(TaskDto taskDto, Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Todo not found with id: " + id));
        task.setTitle(taskDto.getTitle());
        task.setDescription(taskDto.getDescription());

        Task updatedTask = taskRepository.save(task);
        return modelMapper.map(updatedTask, TaskDto.class);
    }

    @Override
    public void deleteTask(Long id) {
        Task todo = taskRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Todo not found with id: " + id));
        taskRepository.deleteById(id);
    }
}
