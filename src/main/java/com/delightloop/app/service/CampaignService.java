package com.delightloop.app.service;

import com.delightloop.app.dto.CampaignDto;
import com.delightloop.app.entity.Campaign;
import com.delightloop.app.exception.ResourceNotFoundException;
import com.delightloop.app.repository.CampaignRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service managing campaign business operations and data persistence mapping.
 */
@Service
public class CampaignService {

    private final CampaignRepository campaignRepository;

    public CampaignService(CampaignRepository campaignRepository) {
        this.campaignRepository = campaignRepository;
    }

    public List<CampaignDto> getAllCampaigns() {
        List<Campaign> campaigns = campaignRepository.findAll();
        if (campaigns.isEmpty()) {
            return getDefaultCampaigns();
        }
        return campaigns.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public CampaignDto getCampaignById(Long id) {
        Campaign campaign = campaignRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Campaign not found with ID: " + id));
        return convertToDto(campaign);
    }

    private CampaignDto convertToDto(Campaign campaign) {
        return new CampaignDto(
                campaign.getId(),
                campaign.getName(),
                campaign.getStatus(),
                campaign.getTotalProspects(),
                campaign.getOpenRate(),
                campaign.getReplyRate(),
                campaign.getGiftsSent(),
                campaign.getGiftsRedeemed(),
                campaign.getCreatedDate()
        );
    }

    private List<CampaignDto> getDefaultCampaigns() {
        return Arrays.asList(
                new CampaignDto(1L, "Q3 Enterprise Account Executives - Custom Surface", "Active", 450, "68%", "24%", 85, 34, LocalDate.of(2025, 8, 1)),
                new CampaignDto(2L, "Tier 1 CTO & VP Engineering Gifting Loop", "Active", 280, "74%", "31%", 60, 28, LocalDate.of(2025, 8, 4)),
                new CampaignDto(3L, "Fintech CMO Hyper-Personalized Express Send", "Active", 120, "82%", "39%", 40, 22, LocalDate.of(2025, 8, 8)),
                new CampaignDto(4L, "SaaS Founder Re-engagement Campaign", "Paused", 310, "51%", "14%", 20, 5, LocalDate.of(2025, 7, 20)),
                new CampaignDto(5L, "Healthcare IT Directors Cold Surface Intro", "Draft", 0, "0%", "0%", 0, 0, LocalDate.of(2025, 8, 10))
        );
    }
}
