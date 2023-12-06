package com.example.taskmanagementapp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TaskDto {
    private Long id;

    private String title;

    private String description;

    private String status;

    private LocalDate dueDate;
}