package com.delightloop.app.dto;

public class SurfaceDto {

    private Long id;
    private Long campaignId;
    private String title;
    private String slug;
    private String theme;
    private String heroHeadline;
    private String ctaText;
    private Integer viewCount;
    private String createdAt;

    public SurfaceDto() {}

    public SurfaceDto(Long id, Long campaignId, String title, String slug, String theme, String heroHeadline, String ctaText, Integer viewCount, String createdAt) {
        this.id = id;
        this.campaignId = campaignId;
        this.title = title;
        this.slug = slug;
        this.theme = theme;
        this.heroHeadline = heroHeadline;
        this.ctaText = ctaText;
        this.viewCount = viewCount;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getCampaignId() { return campaignId; }
    public void setCampaignId(Long campaignId) { this.campaignId = campaignId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getTheme() { return theme; }
    public void setTheme(String theme) { this.theme = theme; }

    public String getHeroHeadline() { return heroHeadline; }
    public void setHeroHeadline(String heroHeadline) { this.heroHeadline = heroHeadline; }

    public String getCtaText() { return ctaText; }
    public void setCtaText(String ctaText) { this.ctaText = ctaText; }

    public Integer getViewCount() { return viewCount; }
    public void setViewCount(Integer viewCount) { this.viewCount = viewCount; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
}
