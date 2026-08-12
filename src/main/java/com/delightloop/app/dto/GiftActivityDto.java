package com.delightloop.app.dto;

public class GiftActivityDto {

    private Long id;
    private String trackingId;
    private String giftName;
    private Double giftValue;
    private String recipientName;
    private String recipientEmail;
    private String campaignName;
    private String status;
    private String sentAt;

    public GiftActivityDto() {}

    public GiftActivityDto(Long id, String trackingId, String giftName, Double giftValue, String recipientName, String recipientEmail, String campaignName, String status, String sentAt) {
        this.id = id;
        this.trackingId = trackingId;
        this.giftName = giftName;
        this.giftValue = giftValue;
        this.recipientName = recipientName;
        this.recipientEmail = recipientEmail;
        this.campaignName = campaignName;
        this.status = status;
        this.sentAt = sentAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTrackingId() { return trackingId; }
    public void setTrackingId(String trackingId) { this.trackingId = trackingId; }

    public String getGiftName() { return giftName; }
    public void setGiftName(String giftName) { this.giftName = giftName; }

    public Double getGiftValue() { return giftValue; }
    public void setGiftValue(Double giftValue) { this.giftValue = giftValue; }

    public String getRecipientName() { return recipientName; }
    public void setRecipientName(String recipientName) { this.recipientName = recipientName; }

    public String getRecipientEmail() { return recipientEmail; }
    public void setRecipientEmail(String recipientEmail) { this.recipientEmail = recipientEmail; }

    public String getCampaignName() { return campaignName; }
    public void setCampaignName(String campaignName) { this.campaignName = campaignName; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getSentAt() { return sentAt; }
    public void setSentAt(String sentAt) { this.sentAt = sentAt; }
}
