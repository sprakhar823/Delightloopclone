package com.delightloop.app.repository;

import com.delightloop.app.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
    Optional<Contact> findByEmail(String email);
    List<Contact> findByIntentScoreGreaterThanEqual(Integer intentScore);
}
