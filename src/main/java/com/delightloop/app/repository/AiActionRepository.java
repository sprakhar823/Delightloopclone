package com.delightloop.app.repository;

import com.delightloop.app.entity.AiAction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AiActionRepository extends JpaRepository<AiAction, Long> {
    List<AiAction> findByUserIdOrderByExecutedAtDesc(Long userId);
}
