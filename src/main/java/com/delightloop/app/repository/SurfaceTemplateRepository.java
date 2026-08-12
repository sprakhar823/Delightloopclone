package com.delightloop.app.repository;

import com.delightloop.app.entity.SurfaceTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SurfaceTemplateRepository extends JpaRepository<SurfaceTemplate, Long> {
    List<SurfaceTemplate> findByIsActiveTrue();
}
