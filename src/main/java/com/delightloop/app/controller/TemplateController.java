package com.delightloop.app.controller;

import com.delightloop.app.dto.TemplateDto;
import com.delightloop.app.entity.Template;
import com.delightloop.app.repository.TemplateRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * REST Controller for managing messaging copy and outreach templates.
 */
@RestController
@RequestMapping("/api/templates")
public class TemplateController {

    private final TemplateRepository templateRepository;

    public TemplateController(TemplateRepository templateRepository) {
        this.templateRepository = templateRepository;
    }

    @GetMapping
    public ResponseEntity<List<TemplateDto>> getAllTemplates() {
        List<TemplateDto> list = templateRepository.findAll().stream().map(t -> new TemplateDto(
                t.getId(),
                t.getTitle(),
                t.getCategory(),
                t.getSubjectLine(),
                t.getBodyContent()
        )).collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @PostMapping
    public ResponseEntity<TemplateDto> createTemplate(@RequestBody TemplateDto dto) {
        Template template = new Template(
                dto.getTitle() != null ? dto.getTitle() : "Custom Outreach Template",
                dto.getCategory() != null ? dto.getCategory() : "COLD_EMAIL",
                dto.getSubjectLine() != null ? dto.getSubjectLine() : "Quick question regarding {{company_name}}",
                dto.getBodyContent() != null ? dto.getBodyContent() : "Hi {{first_name}}, loved your recent post!"
        );
        Template saved = templateRepository.save(template);
        TemplateDto response = new TemplateDto(
                saved.getId(),
                saved.getTitle(),
                saved.getCategory(),
                saved.getSubjectLine(),
                saved.getBodyContent()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
