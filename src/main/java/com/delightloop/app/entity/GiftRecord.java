package com.delightloop.app.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Entity tracking digital gift dispatches and redemptions.
 */
@Entity
@Table(name = "gift_records")
public class GiftRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String trackingId;

    @Column(nullable = false)
    private String recipientEmail;

    @Column(nullable = false)
    private String giftType;

    private Double valueAmount;
    private String status;
    private LocalDateTime sentAt;

    public GiftRecord() {}

    public GiftRecord(String trackingId, String recipientEmail, String giftType, Double valueAmount, String status, LocalDateTime sentAt) {
        this.trackingId = trackingId;
        this.recipientEmail = recipientEmail;
        this.giftType = giftType;
        this.valueAmount = valueAmount;
        this.status = status;
        this.sentAt = sentAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTrackingId() { return trackingId; }
    public void setTrackingId(String trackingId) { this.trackingId = trackingId; }

    public String getRecipientEmail() { return recipientEmail; }
    public void setRecipientEmail(String recipientEmail) { this.recipientEmail = recipientEmail; }

    public String getGiftType() { return giftType; }
    public void setGiftType(String giftType) { this.giftType = giftType; }

    public Double getValueAmount() { return valueAmount; }
    public void setValueAmount(Double valueAmount) { this.valueAmount = valueAmount; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getSentAt() { return sentAt; }
    public void setSentAt(LocalDateTime sentAt) { this.sentAt = sentAt; }
}
