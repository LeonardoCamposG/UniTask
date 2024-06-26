package com.UniTask.Application.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.UniTask.Application.model.User;
import com.UniTask.Application.repositories.UserRepository;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

	@InjectMocks
	UserService service;
	
	@Mock
	UserRepository repository;
	
	User user;
	
	@BeforeEach
	public void setUp() {
		user = new User(1L, "Maria Brown", "maria@gmail.com", "988888888");
	}
	
	@Test
	public void testLoginSuccessful() {
		when(repository.countByEmailAndPassword(user.getEmail(), user.getPassword())).thenReturn(1L);
		
		Long test = service.login(user.getEmail(), user.getPassword());
		
		assertEquals(1L, test);
		verify(repository).countByEmailAndPassword(user.getEmail(), user.getPassword());
		verifyNoMoreInteractions(repository);
	}
}
