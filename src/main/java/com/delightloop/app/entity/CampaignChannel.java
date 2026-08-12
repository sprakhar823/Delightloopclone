package com.delightloop.app.entity;

import jakarta.persistence.*;

/**
 * Entity representing an active communication channel configured for a Campaign.
 */
@Entity
@Table(name = "campaign_channels")
public class CampaignChannel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "campaign_id", nullable = false)
    private Campaign campaign;

    @Column(name = "channel_type", nullable = false, length = 50)
    private String channelType;

    @Column(name = "is_enabled")
    private Boolean isEnabled = true;

    @Column(name = "sequence_order")
    private Integer sequenceOrder = 1;

    public CampaignChannel() {}

    public CampaignChannel(Campaign campaign, String channelType, Boolean isEnabled, Integer sequenceOrder) {
        this.campaign = campaign;
        this.channelType = channelType;
        this.isEnabled = isEnabled;
        this.sequenceOrder = sequenceOrder;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Campaign getCampaign() { return campaign; }
    public void setCampaign(Campaign campaign) { this.campaign = campaign; }

    public String getChannelType() { return channelType; }
    public void setChannelType(String channelType) { this.channelType = channelType; }

    public Boolean getIsEnabled() { return isEnabled; }
    public void setIsEnabled(Boolean isEnabled) { this.isEnabled = isEnabled; }

    public Integer getSequenceOrder() { return sequenceOrder; }
    public void setSequenceOrder(Integer sequenceOrder) { this.sequenceOrder = sequenceOrder; }
}
