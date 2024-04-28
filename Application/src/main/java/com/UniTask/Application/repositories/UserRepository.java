package com.UniTask.Application.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.UniTask.Application.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}