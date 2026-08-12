package com.delightloop.app.dto;

import java.time.LocalDate;

public class CampaignDto {

    private Long id;
    private String name;
    private String status;
    private Integer totalProspects;
    private String openRate;
    private String replyRate;
    private Integer giftsSent;
    private Integer giftsRedeemed;
    private LocalDate createdDate;

    public CampaignDto() {}

    public CampaignDto(Long id, String name, String status, Integer totalProspects, String openRate, String replyRate, Integer giftsSent, Integer giftsRedeemed, LocalDate createdDate) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.totalProspects = totalProspects;
        this.openRate = openRate;
        this.replyRate = replyRate;
        this.giftsSent = giftsSent;
        this.giftsRedeemed = giftsRedeemed;
        this.createdDate = createdDate;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Integer getTotalProspects() { return totalProspects; }
    public void setTotalProspects(Integer totalProspects) { this.totalProspects = totalProspects; }

    public String getOpenRate() { return openRate; }
    public void setOpenRate(String openRate) { this.openRate = openRate; }

    public String getReplyRate() { return replyRate; }
    public void setReplyRate(String replyRate) { this.replyRate = replyRate; }

    public Integer getGiftsSent() { return giftsSent; }
    public void setGiftsSent(Integer giftsSent) { this.giftsSent = giftsSent; }

    public Integer getGiftsRedeemed() { return giftsRedeemed; }
    public void setGiftsRedeemed(Integer giftsRedeemed) { this.giftsRedeemed = giftsRedeemed; }

    public LocalDate getCreatedDate() { return createdDate; }
    public void setCreatedDate(LocalDate createdDate) { this.createdDate = createdDate; }
}
