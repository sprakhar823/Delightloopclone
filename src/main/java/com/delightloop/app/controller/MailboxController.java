package com.delightloop.app.controller;

import com.delightloop.app.dto.MailboxDto;
import com.delightloop.app.entity.Mailbox;
import com.delightloop.app.entity.User;
import com.delightloop.app.repository.MailboxRepository;
import com.delightloop.app.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * REST Controller for managing connected mailboxes and deliverability health.
 */
@RestController
@RequestMapping("/api/mailboxes")
public class MailboxController {

    private final MailboxRepository mailboxRepository;
    private final UserRepository userRepository;

    public MailboxController(MailboxRepository mailboxRepository, UserRepository userRepository) {
        this.mailboxRepository = mailboxRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<List<MailboxDto>> getAllMailboxes() {
        List<MailboxDto> list = mailboxRepository.findAll().stream().map(m -> new MailboxDto(
                m.getId(),
                m.getEmailAddress(),
                m.getProvider(),
                m.getDailySendLimit(),
                m.getSentToday(),
                m.getHealthScore(),
                m.getStatus()
        )).collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @PostMapping
    public ResponseEntity<MailboxDto> addMailbox(@RequestBody MailboxDto dto) {
        User user = userRepository.findById(1L).orElse(null);
        Mailbox m = new Mailbox(
                user,
                dto.getEmailAddress() != null ? dto.getEmailAddress() : "outreach@delightloop.io",
                dto.getProvider() != null ? dto.getProvider() : "GOOGLE_WORKSPACE",
                dto.getDailySendLimit() != null ? dto.getDailySendLimit() : 100,
                0,
                99.0,
                "HEALTHY"
        );
        Mailbox saved = mailboxRepository.save(m);
        MailboxDto response = new MailboxDto(
                saved.getId(),
                saved.getEmailAddress(),
                saved.getProvider(),
                saved.getDailySendLimit(),
                saved.getSentToday(),
                saved.getHealthScore(),
                saved.getStatus()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
