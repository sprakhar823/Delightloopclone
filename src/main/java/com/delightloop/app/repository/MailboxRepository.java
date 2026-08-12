package com.delightloop.app.repository;

import com.delightloop.app.entity.Mailbox;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MailboxRepository extends JpaRepository<Mailbox, Long> {
    Optional<Mailbox> findByEmailAddress(String emailAddress);
    List<Mailbox> findByUserId(Long userId);
}
