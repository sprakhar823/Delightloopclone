package com.delightloop.app.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Entity representing an audit log entry for Goalie AI agent decisions and automated actions.
 */
@Entity
@Table(name = "ai_actions")
public class AiAction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "action_type", nullable = false, length = 100)
    private String actionType;

    @Column(columnDefinition = "TEXT")
    private String details;

    @Column(name = "confidence_score")
    private Double confidenceScore = 0.95;

    @Column(name = "executed_at")
    private LocalDateTime executedAt;

    public AiAction() {}

    public AiAction(User user, String actionType, String details, Double confidenceScore) {
        this.user = user;
        this.actionType = actionType;
        this.details = details;
        this.confidenceScore = confidenceScore;
    }

    @PrePersist
    protected void onCreate() {
        this.executedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getActionType() { return actionType; }
    public void setActionType(String actionType) { this.actionType = actionType; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }

    public Double getConfidenceScore() { return confidenceScore; }
    public void setConfidenceScore(Double confidenceScore) { this.confidenceScore = confidenceScore; }

    public LocalDateTime getExecutedAt() { return executedAt; }
    public void setExecutedAt(LocalDateTime executedAt) { this.executedAt = executedAt; }
}
