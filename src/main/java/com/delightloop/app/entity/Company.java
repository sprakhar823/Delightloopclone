package com.delightloop.app.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Entity representing a target Company account in B2B outreach loops.
 */
@Entity
@Table(name = "companies")
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(unique = true, length = 100)
    private String domain;

    private String industry;

    @Column(name = "employee_count")
    private Integer employeeCount;

    @Column(name = "annual_revenue", length = 50)
    private String annualRevenue;

    @Column(length = 20)
    private String tier;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public Company() {}

    public Company(String name, String domain, String industry, Integer employeeCount, String annualRevenue, String tier) {
        this.name = name;
        this.domain = domain;
        this.industry = industry;
        this.employeeCount = employeeCount;
        this.annualRevenue = annualRevenue;
        this.tier = tier;
        this.createdAt = LocalDateTime.now();
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDomain() { return domain; }
    public void setDomain(String domain) { this.domain = domain; }

    public String getIndustry() { return industry; }
    public void setIndustry(String industry) { this.industry = industry; }

    public Integer getEmployeeCount() { return employeeCount; }
    public void setEmployeeCount(Integer employeeCount) { this.employeeCount = employeeCount; }

    public String getAnnualRevenue() { return annualRevenue; }
    public void setAnnualRevenue(String annualRevenue) { this.annualRevenue = annualRevenue; }

    public String getTier() { return tier; }
    public void setTier(String tier) { this.tier = tier; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
