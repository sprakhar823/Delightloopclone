package com.delightloop.app.dto;

import java.util.List;

public class ConversationDto {

    private Long id;
    private Long contactId;
    private String prospectName;
    private String company;
    private String title;
    private String avatar;
    private String subject;
    private String lastMessage;
    private String timestamp;
    private Boolean unread;
    private String status;
    private List<MessageDto> messages;

    public ConversationDto() {}

    public ConversationDto(Long id, Long contactId, String prospectName, String company, String title, String avatar, String subject, String lastMessage, String timestamp, Boolean unread, String status, List<MessageDto> messages) {
        this.id = id;
        this.contactId = contactId;
        this.prospectName = prospectName;
        this.company = company;
        this.title = title;
        this.avatar = avatar;
        this.subject = subject;
        this.lastMessage = lastMessage;
        this.timestamp = timestamp;
        this.unread = unread;
        this.status = status;
        this.messages = messages;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getContactId() { return contactId; }
    public void setContactId(Long contactId) { this.contactId = contactId; }

    public String getProspectName() { return prospectName; }
    public void setProspectName(String prospectName) { this.prospectName = prospectName; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public String getLastMessage() { return lastMessage; }
    public void setLastMessage(String lastMessage) { this.lastMessage = lastMessage; }

    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }

    public Boolean getUnread() { return unread; }
    public void setUnread(Boolean unread) { this.unread = unread; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public List<MessageDto> getMessages() { return messages; }
    public void setMessages(List<MessageDto> messages) { this.messages = messages; }
}
