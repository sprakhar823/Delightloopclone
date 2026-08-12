package com.delightloop.app.controller;

import com.delightloop.app.dto.McpConnectorDto;
import com.delightloop.app.entity.McpConnector;
import com.delightloop.app.repository.McpConnectorRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

/**
 * REST Controller for managing Model Context Protocol (MCP) integrations (HubSpot, Salesforce, Gmail).
 */
@RestController
@RequestMapping("/api/mcp")
public class McpConnectorController {

    private final McpConnectorRepository mcpConnectorRepository;

    public McpConnectorController(McpConnectorRepository mcpConnectorRepository) {
        this.mcpConnectorRepository = mcpConnectorRepository;
    }

    @GetMapping("/connectors")
    public ResponseEntity<List<McpConnectorDto>> getAllConnectors() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        List<McpConnectorDto> list = mcpConnectorRepository.findAll().stream().map(c -> new McpConnectorDto(
                c.getId(),
                c.getName(),
                c.getProvider(),
                c.getAuthType(),
                c.getStatus(),
                c.getLastSyncedAt() != null ? c.getLastSyncedAt().format(formatter) : "Never"
        )).collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @PostMapping("/connectors/{id}/sync")
    public ResponseEntity<McpConnectorDto> syncConnector(@PathVariable Long id) {
        return mcpConnectorRepository.findById(id).map(c -> {
            c.setLastSyncedAt(LocalDateTime.now());
            c.setStatus("CONNECTED");
            McpConnector saved = mcpConnectorRepository.save(c);
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            McpConnectorDto dto = new McpConnectorDto(
                    saved.getId(),
                    saved.getName(),
                    saved.getProvider(),
                    saved.getAuthType(),
                    saved.getStatus(),
                    saved.getLastSyncedAt().format(formatter)
            );
            return ResponseEntity.ok(dto);
        }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/connectors")
    public ResponseEntity<McpConnectorDto> createConnector(@RequestBody McpConnectorDto dto) {
        McpConnector connector = new McpConnector(
                dto.getName() != null ? dto.getName() : "CRM Integration",
                dto.getProvider() != null ? dto.getProvider() : "HubSpot",
                dto.getAuthType() != null ? dto.getAuthType() : "OAUTH2",
                "CONNECTED"
        );
        connector.setLastSyncedAt(LocalDateTime.now());
        McpConnector saved = mcpConnectorRepository.save(connector);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        McpConnectorDto response = new McpConnectorDto(
                saved.getId(),
                saved.getName(),
                saved.getProvider(),
                saved.getAuthType(),
                saved.getStatus(),
                saved.getLastSyncedAt().format(formatter)
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
