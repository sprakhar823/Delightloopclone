package com.delightloop.app.dto;

public class ContactDto {

    private Long id;
    private String name;
    private String email;
    private String phone;
    private String company;
    private String title;
    private Integer intentScore;
    private String status;

    public ContactDto() {}

    public ContactDto(Long id, String name, String email, String phone, String company, String title, Integer intentScore, String status) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.company = company;
        this.title = title;
        this.intentScore = intentScore;
        this.status = status;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public Integer getIntentScore() { return intentScore; }
    public void setIntentScore(Integer intentScore) { this.intentScore = intentScore; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
