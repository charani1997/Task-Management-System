package com.example.taskmanagementapp.service;

import com.example.taskmanagementapp.dto.RegisterDto;
import com.example.taskmanagementapp.dto.TaskDto;

import java.util.List;

public interface TaskService {
    TaskDto addTask(TaskDto taskDto);
    TaskDto getTask(Long id);
    List<TaskDto> getAllTasks();
    TaskDto updateTask(TaskDto taskDto, Long id);
    void deleteTask(Long id);

    interface AuthService {
        String register(RegisterDto registerDto);
    }
}