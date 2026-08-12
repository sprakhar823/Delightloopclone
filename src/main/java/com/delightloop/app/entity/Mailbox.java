package com.delightloop.app.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Entity representing a connected outreach Mailbox account.
 */
@Entity
@Table(name = "mailboxes")
public class Mailbox {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "email_address", nullable = false, unique = true, length = 150)
    private String emailAddress;

    @Column(length = 50)
    private String provider;

    @Column(name = "daily_send_limit")
    private Integer dailySendLimit = 100;

    @Column(name = "sent_today")
    private Integer sentToday = 0;

    @Column(name = "health_score")
    private Double healthScore = 98.5;

    @Column(length = 30)
    private String status;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public Mailbox() {}

    public Mailbox(User user, String emailAddress, String provider, Integer dailySendLimit, Integer sentToday, Double healthScore, String status) {
        this.user = user;
        this.emailAddress = emailAddress;
        this.provider = provider;
        this.dailySendLimit = dailySendLimit;
        this.sentToday = sentToday;
        this.healthScore = healthScore;
        this.status = status;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

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

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
