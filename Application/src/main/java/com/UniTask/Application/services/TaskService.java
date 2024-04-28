package com.UniTask.Application.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.UniTask.Application.model.Task;
import com.UniTask.Application.repositories.TaskRepository;

@Service
public class TaskService {

	@Autowired
	private TaskRepository repository;
	
	public List<Task> findAll(){
		return repository.findAll();
	}

	public Task findById(Long id) {
		Optional<Task> obj = repository.findById(id);
		return obj.get();
	}

	public Task insert(Task obj) {
		return repository.save(obj); // retorna obj salvo.
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