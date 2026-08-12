package com.delightloop.app.dto;

public class PendingAgentAction {

    private String actionId;
    private String actionType;
    private String message;
    private Long targetId;
    private Integer itemCount;
    private String targetName;

    public PendingAgentAction() {}

    public PendingAgentAction(String actionId, String actionType, String message, Long targetId, Integer itemCount, String targetName) {
        this.actionId = actionId;
        this.actionType = actionType;
        this.message = message;
        this.targetId = targetId;
        this.itemCount = itemCount;
        this.targetName = targetName;
    }

    public String getActionId() { return actionId; }
    public void setActionId(String actionId) { this.actionId = actionId; }

    public String getActionType() { return actionType; }
    public void setActionType(String actionType) { this.actionType = actionType; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public Long getTargetId() { return targetId; }
    public void setTargetId(Long targetId) { this.targetId = targetId; }

    public Integer getItemCount() { return itemCount; }
    public void setItemCount(Integer itemCount) { this.itemCount = itemCount; }

    public String getTargetName() { return targetName; }
    public void setTargetName(String targetName) { this.targetName = targetName; }
}
