package com.delightloop.app.controller;

import com.delightloop.app.dto.SurfaceDto;
import com.delightloop.app.entity.Campaign;
import com.delightloop.app.entity.Surface;
import com.delightloop.app.repository.CampaignRepository;
import com.delightloop.app.repository.SurfaceRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

/**
 * REST Controller for managing digital Surfaces (landing pages).
 */
@RestController
@RequestMapping("/api/surfaces")
public class SurfaceController {

    private final SurfaceRepository surfaceRepository;
    private final CampaignRepository campaignRepository;

    public SurfaceController(SurfaceRepository surfaceRepository, CampaignRepository campaignRepository) {
        this.surfaceRepository = surfaceRepository;
        this.campaignRepository = campaignRepository;
    }

    @GetMapping
    public ResponseEntity<List<SurfaceDto>> getAllSurfaces() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        List<SurfaceDto> list = surfaceRepository.findAll().stream().map(s -> new SurfaceDto(
                s.getId(),
                s.getCampaign() != null ? s.getCampaign().getId() : null,
                s.getTitle(),
                s.getSlug(),
                s.getTheme(),
                s.getHeroHeadline(),
                s.getCtaText(),
                s.getViewCount(),
                s.getCreatedAt() != null ? s.getCreatedAt().format(formatter) : ""
        )).collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SurfaceDto> getSurfaceById(@PathVariable Long id) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return surfaceRepository.findById(id).map(s -> new SurfaceDto(
                s.getId(),
                s.getCampaign() != null ? s.getCampaign().getId() : null,
                s.getTitle(),
                s.getSlug(),
                s.getTheme(),
                s.getHeroHeadline(),
                s.getCtaText(),
                s.getViewCount(),
                s.getCreatedAt() != null ? s.getCreatedAt().format(formatter) : ""
        )).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<SurfaceDto> createSurface(@RequestBody SurfaceDto dto) {
        Campaign campaign = dto.getCampaignId() != null ? campaignRepository.findById(dto.getCampaignId()).orElse(null) : null;
        Surface surface = new Surface(
                campaign,
                dto.getTitle() != null ? dto.getTitle() : "Custom Executive Brief",
                dto.getSlug() != null ? dto.getSlug() : "surface-" + System.currentTimeMillis(),
                dto.getTheme() != null ? dto.getTheme() : "DARK_PURPLE",
                dto.getHeroHeadline() != null ? dto.getHeroHeadline() : "Accelerate Executive Velocity",
                dto.getCtaText() != null ? dto.getCtaText() : "Claim Your Digital Coffee"
        );
        Surface saved = surfaceRepository.save(surface);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        SurfaceDto response = new SurfaceDto(
                saved.getId(),
                saved.getCampaign() != null ? saved.getCampaign().getId() : null,
                saved.getTitle(),
                saved.getSlug(),
                saved.getTheme(),
                saved.getHeroHeadline(),
                saved.getCtaText(),
                saved.getViewCount(),
                saved.getCreatedAt().format(formatter)
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSurface(@PathVariable Long id) {
        if (surfaceRepository.existsById(id)) {
            surfaceRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
