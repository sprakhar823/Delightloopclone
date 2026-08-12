package com.delightloop.app.dto;

public class MessageDto {

    private Long id;
    private Long conversationId;
    private String senderType;
    private String body;
    private String sentAt;

    public MessageDto() {}

    public MessageDto(Long id, Long conversationId, String senderType, String body, String sentAt) {
        this.id = id;
        this.conversationId = conversationId;
        this.senderType = senderType;
        this.body = body;
        this.sentAt = sentAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getConversationId() { return conversationId; }
    public void setConversationId(Long conversationId) { this.conversationId = conversationId; }

    public String getSenderType() { return senderType; }
    public void setSenderType(String senderType) { this.senderType = senderType; }

    public String getBody() { return body; }
    public void setBody(String body) { this.body = body; }

    public String getSentAt() { return sentAt; }
    public void setSentAt(String sentAt) { this.sentAt = sentAt; }
}
