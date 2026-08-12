package com.delightloop.app.service;

import com.delightloop.app.dto.DashboardStatsDto;
import org.springframework.stereotype.Service;

/**
 * Service providing business logic for dashboard metric analytics.
 */
@Service
public class DashboardService {

    public DashboardStatsDto getDashboardStats() {
        return new DashboardStatsDto(
                14280L,
                18,
                342,
                "24.8%",
                128,
                24,
                "98.5%"
        );
    }
}
