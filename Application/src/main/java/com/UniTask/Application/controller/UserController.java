package com.UniTask.Application.controller;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.UniTask.Application.model.User;
import com.UniTask.Application.services.UserService;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/user")
public class UserController {

	@Autowired
	private UserService service;
	
	@GetMapping("/login/{email}/{password}")
    public ResponseEntity<Boolean> login(@PathVariable String email, @PathVariable String password) {
        long result = service.login(email, password);
        if(result > 0) {
        	return ResponseEntity.ok().body(true);
        }
		return ResponseEntity.notFound().build();
    }
	
	@PostMapping
	public ResponseEntity<User> insert(@RequestBody User obj){
		obj = service.insert(obj);
		URI uri = ServletUriComponentsBuilder.
				fromCurrentRequest().			// Esse URI é para garantir que o retorno da requisição post seja 201(obj created)
				path("/{id").			
				buildAndExpand(obj.getId()).	
				toUri();				
		return ResponseEntity.created(uri).body(obj);		
	}
}
