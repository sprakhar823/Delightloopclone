package com.delightloop.app.dto;

public class MailboxDto {

    private Long id;
    private String emailAddress;
    private String provider;
    private Integer dailySendLimit;
    private Integer sentToday;
    private Double healthScore;
    private String status;

    public MailboxDto() {}

    public MailboxDto(Long id, String emailAddress, String provider, Integer dailySendLimit, Integer sentToday, Double healthScore, String status) {
        this.id = id;
        this.emailAddress = emailAddress;
        this.provider = provider;
        this.dailySendLimit = dailySendLimit;
        this.sentToday = sentToday;
        this.healthScore = healthScore;
        this.status = status;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmailAddress() { return emailAddress; }
    public void setEmailAddress(String emailAddress) { this.emailAddress = emailAddress; }

    public String getProvider() { return provider; }
    public void setProvider(String provider) { this.provider = provider; }

    public Integer getDailySendLimit() { return dailySendLimit; }
    public void setDailySendLimit(Integer dailySendLimit) { this.dailySendLimit = dailySendLimit; }

    public Integer getSentToday() { return sentToday; }
    public void setSentToday(Integer sentToday) { this.sentToday = sentToday; }

    public Double getHealthScore() { return healthScore; }
    public void setHealthScore(Double healthScore) { this.healthScore = healthScore; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
