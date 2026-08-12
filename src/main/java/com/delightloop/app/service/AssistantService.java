package com.delightloop.app.service;

import com.delightloop.app.dto.*;
import org.springframework.stereotype.Service;

/**
 * Service managing Goalie AI Assistant interactions, agentic query dispatching, and action confirmations.
 */
@Service
public class AssistantService {

    private final GoalieAgentEngine goalieAgentEngine;
    private final AssistantActionService assistantActionService;

    public AssistantService(GoalieAgentEngine goalieAgentEngine, AssistantActionService assistantActionService) {
        this.goalieAgentEngine = goalieAgentEngine;
        this.assistantActionService = assistantActionService;
    }

    public AssistantQueryResponse processQuery(AssistantQueryRequest request) {
        String queryText = request != null ? request.getMessage() : "";
        return goalieAgentEngine.processUserQuery(queryText);
    }

    public ActionConfirmationResponse confirmAction(String actionId) {
        return assistantActionService.confirmAction(actionId);
    }

    public ActionConfirmationResponse cancelAction(String actionId) {
        return assistantActionService.cancelAction(actionId);
    }

    public ChatResponse processChatPrompt(ChatRequest request) {
        String prompt = request != null ? request.getPrompt() : "";
        AssistantQueryResponse agentResponse = goalieAgentEngine.processUserQuery(prompt);
        return new ChatResponse(agentResponse.getMessage());
    }
}
