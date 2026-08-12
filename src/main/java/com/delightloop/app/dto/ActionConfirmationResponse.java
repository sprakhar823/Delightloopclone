package com.delightloop.app.dto;

public class ActionConfirmationResponse {

    private Boolean success;
    private String actionId;
    private String action;
    private String message;

    public ActionConfirmationResponse() {}

    public ActionConfirmationResponse(Boolean success, String actionId, String action, String message) {
        this.success = success;
        this.actionId = actionId;
        this.action = action;
        this.message = message;
    }

    public Boolean getSuccess() { return success; }
    public void setSuccess(Boolean success) { this.success = success; }

    public String getActionId() { return actionId; }
    public void setActionId(String actionId) { this.actionId = actionId; }

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
