package com.UniTask.Application.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.UniTask.Application.model.Task;
import com.UniTask.Application.model.User;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

	@Query("SELECT t FROM Task t INNER JOIN t.user u WHERE u.email = :email")
	List<Task> findAllByEmail(@Param("email") String email);
	
	@Query("SELECT u FROM User u WHERE u.email = :email")
	User findUserByEmail(@Param("email") String email);
}