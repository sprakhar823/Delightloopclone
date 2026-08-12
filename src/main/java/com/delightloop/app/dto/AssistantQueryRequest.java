package com.delightloop.app.dto;

public class AssistantQueryRequest {

    private String message;
    private String prompt;

    public AssistantQueryRequest() {}

    public AssistantQueryRequest(String message) {
        this.message = message;
        this.prompt = message;
    }

    public String getMessage() {
        return message != null && !message.trim().isEmpty() ? message : prompt;
    }

    public void setMessage(String message) {
        this.message = message;
        if (this.prompt == null) {
            this.prompt = message;
        }
    }

    public String getPrompt() {
        return prompt != null && !prompt.trim().isEmpty() ? prompt : message;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
        if (this.message == null) {
            this.message = prompt;
        }
    }
}
