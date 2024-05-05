package com.UniTask.Application.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.UniTask.Application.model.User;
import com.UniTask.Application.repositories.UserRepository;

@Service
public class UserService {

	@Autowired
	private	UserRepository repository;
	
	public Long login(String email, String password) {
		return repository.countByEmailAndPassword(email, password);
	}
	
	public User insert(User obj) {
		return repository.save(obj);	// retorna obj salvo.
	}
}
