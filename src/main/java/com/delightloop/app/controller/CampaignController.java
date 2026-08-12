package com.delightloop.app.controller;

import com.delightloop.app.dto.CampaignDto;
import com.delightloop.app.entity.Campaign;
import com.delightloop.app.entity.User;
import com.delightloop.app.repository.CampaignRepository;
import com.delightloop.app.repository.UserRepository;
import com.delightloop.app.service.CampaignService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for managing outreach campaigns.
 */
@RestController
@RequestMapping("/api/campaigns")
public class CampaignController {

    private final CampaignService campaignService;
    private final CampaignRepository campaignRepository;
    private final UserRepository userRepository;

    public CampaignController(CampaignService campaignService, CampaignRepository campaignRepository, UserRepository userRepository) {
        this.campaignService = campaignService;
        this.campaignRepository = campaignRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<List<CampaignDto>> getAllCampaigns() {
        List<CampaignDto> campaigns = campaignService.getAllCampaigns();
        return ResponseEntity.ok(campaigns);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CampaignDto> getCampaignById(@PathVariable Long id) {
        CampaignDto campaign = campaignService.getCampaignById(id);
        if (campaign == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(campaign);
    }

    @PostMapping
    public ResponseEntity<CampaignDto> createCampaign(@RequestBody CampaignDto dto) {
        User user = userRepository.findById(1L).orElse(null);
        Campaign campaign = new Campaign(
                user,
                dto.getName() != null ? dto.getName() : "New Campaign",
                dto.getStatus() != null ? dto.getStatus() : "ACTIVE",
                dto.getProspects() != null ? dto.getProspects() : 0,
                0.0,
                0.0,
                0,
                0
        );
        Campaign saved = campaignRepository.save(campaign);
        CampaignDto response = new CampaignDto(
                saved.getId(),
                saved.getName(),
                saved.getStatus(),
                saved.getTotalProspects(),
                saved.getOpenRate(),
                saved.getReplyRate(),
                saved.getGiftsSent(),
                saved.getGiftsRedeemed(),
                saved.getCreatedDate().toString()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CampaignDto> updateCampaign(@PathVariable Long id, @RequestBody CampaignDto dto) {
        return campaignRepository.findById(id).map(campaign -> {
            if (dto.getName() != null) campaign.setName(dto.getName());
            if (dto.getStatus() != null) campaign.setStatus(dto.getStatus());
            if (dto.getProspects() != null) campaign.setTotalProspects(dto.getProspects());
            Campaign saved = campaignRepository.save(campaign);
            CampaignDto response = new CampaignDto(
                    saved.getId(),
                    saved.getName(),
                    saved.getStatus(),
                    saved.getTotalProspects(),
                    saved.getOpenRate(),
                    saved.getReplyRate(),
                    saved.getGiftsSent(),
                    saved.getGiftsRedeemed(),
                    saved.getCreatedDate().toString()
            );
            return ResponseEntity.ok(response);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCampaign(@PathVariable Long id) {
        if (campaignRepository.existsById(id)) {
            campaignRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
