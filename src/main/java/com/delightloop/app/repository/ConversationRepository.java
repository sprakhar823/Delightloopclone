package com.delightloop.app.repository;

import com.delightloop.app.entity.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Long> {
    List<Conversation> findByContactId(Long contactId);
    List<Conversation> findByUnreadTrue();
}
