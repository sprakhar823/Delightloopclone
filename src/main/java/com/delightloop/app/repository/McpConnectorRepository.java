package com.delightloop.app.repository;

import com.delightloop.app.entity.McpConnector;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface McpConnectorRepository extends JpaRepository<McpConnector, Long> {
    Optional<McpConnector> findByName(String name);
}
