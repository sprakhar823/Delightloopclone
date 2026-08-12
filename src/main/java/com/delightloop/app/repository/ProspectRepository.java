package com.delightloop.app.repository;

import com.delightloop.app.entity.Prospect;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProspectRepository extends JpaRepository<Prospect, Long> {
    Optional<Prospect> findByEmail(String email);
}
