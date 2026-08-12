package com.delightloop.app.dto;

public class McpConnectorDto {

    private Long id;
    private String name;
    private String provider;
    private String authType;
    private String status;
    private String lastSyncedAt;

    public McpConnectorDto() {}

    public McpConnectorDto(Long id, String name, String provider, String authType, String status, String lastSyncedAt) {
        this.id = id;
        this.name = name;
        this.provider = provider;
        this.authType = authType;
        this.status = status;
        this.lastSyncedAt = lastSyncedAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getProvider() { return provider; }
    public void setProvider(String provider) { this.provider = provider; }

    public String getAuthType() { return authType; }
    public void setAuthType(String authType) { this.authType = authType; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getLastSyncedAt() { return lastSyncedAt; }
    public void setLastSyncedAt(String lastSyncedAt) { this.lastSyncedAt = lastSyncedAt; }
}
