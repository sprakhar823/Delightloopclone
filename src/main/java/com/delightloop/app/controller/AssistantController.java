package com.delightloop.app.controller;

import com.delightloop.app.dto.*;
import com.delightloop.app.service.AssistantService;
import com.delightloop.app.service.ExpressSendService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST Controller for Goalie Agentic AI Assistant query, actions confirmation, and Express Send workflows.
 */
@RestController
@RequestMapping("/api/assistant")
public class AssistantController {

    private final AssistantService assistantService;
    private final ExpressSendService expressSendService;

    public AssistantController(AssistantService assistantService, ExpressSendService expressSendService) {
        this.assistantService = assistantService;
        this.expressSendService = expressSendService;
    }

    /**
     * Agentic AI Query Endpoint
     * POST /api/assistant/query
     */
    @PostMapping("/query")
    public ResponseEntity<AssistantQueryResponse> processQuery(@RequestBody AssistantQueryRequest request) {
        AssistantQueryResponse response = assistantService.processQuery(request);
        return ResponseEntity.ok(response);
    }

    /**
     * Human-in-the-loop Action Confirmation Endpoint
     * POST /api/assistant/actions/{id}/confirm
     */
    @PostMapping("/actions/{id}/confirm")
    public ResponseEntity<ActionConfirmationResponse> confirmAction(@PathVariable("id") String actionId) {
        ActionConfirmationResponse response = assistantService.confirmAction(actionId);
        return ResponseEntity.ok(response);
    }

    /**
     * Human-in-the-loop Action Cancellation Endpoint
     * POST /api/assistant/actions/{id}/cancel
     */
    @PostMapping("/actions/{id}/cancel")
    public ResponseEntity<ActionConfirmationResponse> cancelAction(@PathVariable("id") String actionId) {
        ActionConfirmationResponse response = assistantService.cancelAction(actionId);
        return ResponseEntity.ok(response);
    }

    /**
     * Backwards-compatible Chat Prompt Endpoint
     * POST /api/assistant/chat
     */
    @PostMapping("/chat")
    public ResponseEntity<ChatResponse> chat(@Valid @RequestBody ChatRequest request) {
        ChatResponse response = assistantService.processChatPrompt(request);
        return ResponseEntity.ok(response);
    }

    /**
     * Express Send Gifting Endpoint
     * POST /api/assistant/express-send
     */
    @PostMapping("/express-send")
    public ResponseEntity<ExpressSendResponse> expressSend(@Valid @RequestBody ExpressSendRequest request) {
        ExpressSendResponse response = expressSendService.processExpressSend(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
