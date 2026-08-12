package com.delightloop.app.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Entity representing an Outreach Campaign created by a User.
 */
@Entity
@Table(name = "campaigns")
public class Campaign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(length = 30)
    private String status;

    @Column(name = "total_prospects")
    private Integer totalProspects;

    @Column(name = "open_rate_percent")
    private Double openRatePercent;

    @Column(name = "reply_rate_percent")
    private Double replyRatePercent;

    @Column(name = "gifts_sent")
    private Integer giftsSent;

    @Column(name = "gifts_redeemed")
    private Integer giftsRedeemed;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Campaign() {}

    public Campaign(User user, String name, String status, Integer totalProspects, Double openRatePercent, Double replyRatePercent, Integer giftsSent, Integer giftsRedeemed) {
        this.user = user;
        this.name = name;
        this.status = status;
        this.totalProspects = totalProspects;
        this.openRatePercent = openRatePercent;
        this.replyRatePercent = replyRatePercent;
        this.giftsSent = giftsSent;
        this.giftsRedeemed = giftsRedeemed;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // Helper method to convert created_at to LocalDate for DTOs
    public LocalDate getCreatedDate() {
        return createdAt != null ? createdAt.toLocalDate() : LocalDate.now();
    }

    public String getOpenRate() {
        return openRatePercent != null ? String.format("%.0f%%", openRatePercent) : "0%";
    }

    public String getReplyRate() {
        return replyRatePercent != null ? String.format("%.0f%%", replyRatePercent) : "0%";
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Integer getTotalProspects() { return totalProspects; }
    public void setTotalProspects(Integer totalProspects) { this.totalProspects = totalProspects; }

    public Double getOpenRatePercent() { return openRatePercent; }
    public void setOpenRatePercent(Double openRatePercent) { this.openRatePercent = openRatePercent; }

    public Double getReplyRatePercent() { return replyRatePercent; }
    public void setReplyRatePercent(Double replyRatePercent) { this.replyRatePercent = replyRatePercent; }

    public Integer getGiftsSent() { return giftsSent; }
    public void setGiftsSent(Integer giftsSent) { this.giftsSent = giftsSent; }

    public Integer getGiftsRedeemed() { return giftsRedeemed; }
    public void setGiftsRedeemed(Integer giftsRedeemed) { this.giftsRedeemed = giftsRedeemed; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
