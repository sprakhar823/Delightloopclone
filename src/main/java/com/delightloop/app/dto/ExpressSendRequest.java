package com.delightloop.app.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class ExpressSendRequest {

    @NotBlank(message = "Recipient email is required")
    @Email(message = "Invalid email format")
    private String recipient;

    @NotBlank(message = "Gift type is required")
    private String giftType;

    public ExpressSendRequest() {}

    public ExpressSendRequest(String recipient, String giftType) {
        this.recipient = recipient;
        this.giftType = giftType;
    }

    public String getRecipient() { return recipient; }
    public void setRecipient(String recipient) { this.recipient = recipient; }

    public String getGiftType() { return giftType; }
    public void setGiftType(String giftType) { this.giftType = giftType; }
}
