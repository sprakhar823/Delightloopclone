package com.delightloop.app.dto;

public class ExpressSendResponse {

    private boolean success;
    private String trackingId;
    private String recipient;
    private String giftType;

    public ExpressSendResponse() {}

    public ExpressSendResponse(boolean success, String trackingId, String recipient, String giftType) {
        this.success = success;
        this.trackingId = trackingId;
        this.recipient = recipient;
        this.giftType = giftType;
    }

    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }

    public String getTrackingId() { return trackingId; }
    public void setTrackingId(String trackingId) { this.trackingId = trackingId; }

    public String getRecipient() { return recipient; }
    public void setRecipient(String recipient) { this.recipient = recipient; }

    public String getGiftType() { return giftType; }
    public void setGiftType(String giftType) { this.giftType = giftType; }
}
