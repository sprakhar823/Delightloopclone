package com.delightloop.app.controller;

import com.delightloop.app.dto.GiftActivityDto;
import com.delightloop.app.repository.GiftActivityRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

/**
 * REST Controller for managing digital e-gift card activity and redemptions.
 */
@RestController
@RequestMapping("/api/gifts")
public class GiftingActivityController {

    private final GiftActivityRepository giftActivityRepository;

    public GiftingActivityController(GiftActivityRepository giftActivityRepository) {
        this.giftActivityRepository = giftActivityRepository;
    }

    @GetMapping("/activity")
    public ResponseEntity<List<GiftActivityDto>> getActivity() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM dd, yyyy");
        List<GiftActivityDto> list = giftActivityRepository.findAll().stream().map(ga -> new GiftActivityDto(
                ga.getId(),
                ga.getTrackingId(),
                ga.getGift() != null ? ga.getGift().getName() : "eGift Card",
                ga.getGift() != null ? ga.getGift().getDefaultValue() : 25.0,
                ga.getContact() != null ? ga.getContact().getFirstName() + " " + ga.getContact().getLastName() : "Prospect",
                ga.getContact() != null ? ga.getContact().getEmail() : "email@example.com",
                ga.getCampaign() != null ? ga.getCampaign().getName() : "Direct Send",
                ga.getStatus(),
                ga.getCreatedAt() != null ? ga.getCreatedAt().format(formatter) : ""
        )).collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }
}
