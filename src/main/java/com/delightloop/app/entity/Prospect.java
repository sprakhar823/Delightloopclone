package com.delightloop.app.entity;

import jakarta.persistence.*;

/**
 * Entity representing a target prospect contact.
 */
@Entity
@Table(name = "prospects")
public class Prospect {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    private String company;
    private String title;
    private Integer intentScore;
    private String status;

    public Prospect() {}

    public Prospect(String name, String email, String company, String title, Integer intentScore, String status) {
        this.name = name;
        this.email = email;
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

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public Integer getIntentScore() { return intentScore; }
    public void setIntentScore(Integer intentScore) { this.intentScore = intentScore; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
