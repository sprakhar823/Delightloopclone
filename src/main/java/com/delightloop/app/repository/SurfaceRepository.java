package com.delightloop.app.repository;

import com.delightloop.app.entity.Surface;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SurfaceRepository extends JpaRepository<Surface, Long> {
    Optional<Surface> findBySlug(String slug);
}
