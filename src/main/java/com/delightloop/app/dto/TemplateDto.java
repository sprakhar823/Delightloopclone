package com.delightloop.app.dto;

public class TemplateDto {

    private Long id;
    private String title;
    private String category;
    private String subjectLine;
    private String bodyContent;

    public TemplateDto() {}

    public TemplateDto(Long id, String title, String category, String subjectLine, String bodyContent) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.subjectLine = subjectLine;
        this.bodyContent = bodyContent;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getSubjectLine() { return subjectLine; }
    public void setSubjectLine(String subjectLine) { this.subjectLine = subjectLine; }

    public String getBodyContent() { return bodyContent; }
    public void setBodyContent(String bodyContent) { this.bodyContent = bodyContent; }
}
