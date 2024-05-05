package com.UniTask.Application.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.UniTask.Application.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	
//	@Query("select	u"
//		 + "from	User u"
//		 + "where	u.mail = ?1"
//		 + "and		u.password = ?2")
//	User findByMailPassword(String mail, String password);
	
	long countByEmailAndPassword(String email, String password);
}