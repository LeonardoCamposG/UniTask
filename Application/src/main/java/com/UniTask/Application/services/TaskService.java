package com.UniTask.Application.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.UniTask.Application.model.Task;
import com.UniTask.Application.model.User;
import com.UniTask.Application.repositories.TaskRepository;

@Service
public class TaskService {

	@Autowired
	private TaskRepository repository;
	
	public List<Task> findAll(){
		return repository.findAll();
	}
	
	public List<Task> findAllByEmail(String email){
		return repository.findAllByEmail(email);
	}

	public Task findById(Long id) {
		Optional<Task> obj = repository.findById(id);
		return obj.get();
	}

	public Task insert(Task obj, String email) {
		User user = repository.findUserByEmail(email);
		obj.setUser(user);
		return repository.save(obj); // retorna obj salvo.
	}
	
	public User findId(String email) {
		return repository.findUserByEmail(email);
	}

	public void delete(Long id) {
		repository.deleteById(id); // Está sem tratamento de try catch por hora, apenas para demonstrar requisição.
	}

	public Task update(Long id, Task obj) {
		Task entity = findById(id);
		entity.setTitle(obj.getTitle());
		entity.setDesc(obj.getDesc());
		entity.setDate(obj.getDate());
		return repository.save(entity);
	}
}
