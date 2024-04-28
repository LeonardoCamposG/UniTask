package com.UniTask.Application.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.UniTask.Application.model.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

}