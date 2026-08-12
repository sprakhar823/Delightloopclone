package com.delightloop.app.controller;

import com.delightloop.app.dto.CampaignDto;
import com.delightloop.app.dto.ContactDto;
import com.delightloop.app.dto.SearchResultDto;
import com.delightloop.app.dto.SurfaceDto;
import com.delightloop.app.repository.CampaignRepository;
import com.delightloop.app.repository.ContactRepository;
import com.delightloop.app.repository.SurfaceRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

/**
 * REST Controller for global application search across campaigns, contacts, and surfaces.
 */
@RestController
@RequestMapping("/api/search")
public class SearchController {

    private final CampaignRepository campaignRepository;
    private final ContactRepository contactRepository;
    private final SurfaceRepository surfaceRepository;

    public SearchController(CampaignRepository campaignRepository, ContactRepository contactRepository, SurfaceRepository surfaceRepository) {
        this.campaignRepository = campaignRepository;
        this.contactRepository = contactRepository;
        this.surfaceRepository = surfaceRepository;
    }

    @GetMapping
    public ResponseEntity<SearchResultDto> search(@RequestParam("q") String query) {
        String lowerQ = query != null ? query.toLowerCase() : "";

        List<CampaignDto> campaigns = campaignRepository.findAll().stream()
                .filter(c -> c.getName().toLowerCase().contains(lowerQ))
                .map(c -> new CampaignDto(
                        c.getId(),
                        c.getName(),
                        c.getStatus(),
                        c.getTotalProspects(),
                        c.getOpenRate(),
                        c.getReplyRate(),
                        c.getGiftsSent(),
                        c.getGiftsRedeemed(),
                        c.getCreatedDate().toString()
                )).collect(Collectors.toList());

        List<ContactDto> contacts = contactRepository.findAll().stream()
                .filter(cnt -> (cnt.getFirstName() + " " + cnt.getLastName()).toLowerCase().contains(lowerQ) ||
                        cnt.getEmail().toLowerCase().contains(lowerQ))
                .map(cnt -> new ContactDto(
                        cnt.getId(),
                        cnt.getFirstName() + " " + cnt.getLastName(),
                        cnt.getEmail(),
                        cnt.getPhone(),
                        cnt.getCompany() != null ? cnt.getCompany().getName() : "Independent",
                        cnt.getTitle(),
                        cnt.getIntentScore(),
                        cnt.getStatus()
                )).collect(Collectors.toList());

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        List<SurfaceDto> surfaces = surfaceRepository.findAll().stream()
                .filter(s -> s.getTitle().toLowerCase().contains(lowerQ) || s.getSlug().toLowerCase().contains(lowerQ))
                .map(s -> new SurfaceDto(
                        s.getId(),
                        s.getCampaign() != null ? s.getCampaign().getId() : null,
                        s.getTitle(),
                        s.getSlug(),
                        s.getTheme(),
                        s.getHeroHeadline(),
                        s.getCtaText(),
                        s.getViewCount(),
                        s.getCreatedAt() != null ? s.getCreatedAt().format(formatter) : ""
                )).collect(Collectors.toList());

        SearchResultDto result = new SearchResultDto(query, campaigns, contacts, surfaces);
        return ResponseEntity.ok(result);
    }
}
