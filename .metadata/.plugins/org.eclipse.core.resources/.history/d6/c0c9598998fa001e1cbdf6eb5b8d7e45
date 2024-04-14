package com.UniTask.Application.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.UniTask.Application.model.User;
import com.UniTask.Application.repositories.UserRepository;

@Configuration
@Profile("test")
public class ProdConfig implements CommandLineRunner{

	@Autowired	
	private UserRepository userRepository; // Declarando dependência.
	
	@Override
	public void run(String... args) throws Exception{
		
		User u1 = new User(2L, "Maria Brown", "maria@gmail.com", "988888888");
		User u2 = new User(3L, "Alex Green", "alex@gmail.com", "977777777"); 
		userRepository.saveAll(Arrays.asList(u1, u2));
	}
}
