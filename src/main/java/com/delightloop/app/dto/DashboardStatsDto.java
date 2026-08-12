package com.delightloop.app.dto;

/**
 * Data Transfer Object for Dashboard Metrics and Stats.
 */
public class DashboardStatsDto {

    private long totalOutreach;
    private int activeCampaigns;
    private int giftsRedeemed;
    private String responseRate;
    private int highIntentLeads;
    private int activeSurfaces;
    private String mailboxHealth;

    public DashboardStatsDto() {}

    public DashboardStatsDto(long totalOutreach, int activeCampaigns, int giftsRedeemed, String responseRate, int highIntentLeads, int activeSurfaces, String mailboxHealth) {
        this.totalOutreach = totalOutreach;
        this.activeCampaigns = activeCampaigns;
        this.giftsRedeemed = giftsRedeemed;
        this.responseRate = responseRate;
        this.highIntentLeads = highIntentLeads;
        this.activeSurfaces = activeSurfaces;
        this.mailboxHealth = mailboxHealth;
    }

    public long getTotalOutreach() { return totalOutreach; }
    public void setTotalOutreach(long totalOutreach) { this.totalOutreach = totalOutreach; }

    public int getActiveCampaigns() { return activeCampaigns; }
    public void setActiveCampaigns(int activeCampaigns) { this.activeCampaigns = activeCampaigns; }

    public int getGiftsRedeemed() { return giftsRedeemed; }
    public void setGiftsRedeemed(int giftsRedeemed) { this.giftsRedeemed = giftsRedeemed; }

    public String getResponseRate() { return responseRate; }
    public void setResponseRate(String responseRate) { this.responseRate = responseRate; }

    public int getHighIntentLeads() { return highIntentLeads; }
    public void setHighIntentLeads(int highIntentLeads) { this.highIntentLeads = highIntentLeads; }

    public int getActiveSurfaces() { return activeSurfaces; }
    public void setActiveSurfaces(int activeSurfaces) { this.activeSurfaces = activeSurfaces; }

    public String getMailboxHealth() { return mailboxHealth; }
    public void setMailboxHealth(String mailboxHealth) { this.mailboxHealth = mailboxHealth; }
}
