package com.delightloop.app.service;

import com.delightloop.app.dto.AssistantQueryResponse;

/**
 * Interface defining the Agentic AI Goalie Engine contract.
 * Allows switching between deterministic local rules and external LLM models (e.g. Gemini).
 */
public interface GoalieAgentEngine {

    AssistantQueryResponse processUserQuery(String userMessage);
}
