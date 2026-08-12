package com.delightloop.app.dto;

import java.util.List;

public class SearchResultDto {

    private String query;
    private List<CampaignDto> campaigns;
    private List<ContactDto> contacts;
    private List<SurfaceDto> surfaces;

    public SearchResultDto() {}

    public SearchResultDto(String query, List<CampaignDto> campaigns, List<ContactDto> contacts, List<SurfaceDto> surfaces) {
        this.query = query;
        this.campaigns = campaigns;
        this.contacts = contacts;
        this.surfaces = surfaces;
    }

    public String getQuery() { return query; }
    public void setQuery(String query) { this.query = query; }

    public List<CampaignDto> getCampaigns() { return campaigns; }
    public void setCampaigns(List<CampaignDto> campaigns) { this.campaigns = campaigns; }

    public List<ContactDto> getContacts() { return contacts; }
    public void setContacts(List<ContactDto> contacts) { this.contacts = contacts; }

    public List<SurfaceDto> getSurfaces() { return surfaces; }
    public void setSurfaces(List<SurfaceDto> surfaces) { this.surfaces = surfaces; }
}
