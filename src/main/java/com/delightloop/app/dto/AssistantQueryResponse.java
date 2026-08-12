package com.delightloop.app.dto;

public class AssistantQueryResponse {

    private String intent;
    private Boolean requiresConfirmation;
    private String actionId;
    private String message;
    private String action;
    private Object data;

    public AssistantQueryResponse() {}

    public AssistantQueryResponse(String intent, String message, Object data) {
        this.intent = intent;
        this.requiresConfirmation = false;
        this.message = message;
        this.data = data;
    }

    public AssistantQueryResponse(String intent, Boolean requiresConfirmation, String actionId, String message, String action, Object data) {
        this.intent = intent;
        this.requiresConfirmation = requiresConfirmation;
        this.actionId = actionId;
        this.message = message;
        this.action = action;
        this.data = data;
    }

    public String getIntent() { return intent; }
    public void setIntent(String intent) { this.intent = intent; }

    public Boolean getRequiresConfirmation() { return requiresConfirmation; }
    public void setRequiresConfirmation(Boolean requiresConfirmation) { this.requiresConfirmation = requiresConfirmation; }

    public String getActionId() { return actionId; }
    public void setActionId(String actionId) { this.actionId = actionId; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }

    public Object getData() { return data; }
    public void setData(Object data) { this.data = data; }
}
