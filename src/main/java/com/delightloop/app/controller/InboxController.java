package com.delightloop.app.controller;

import com.delightloop.app.dto.ConversationDto;
import com.delightloop.app.dto.MessageDto;
import com.delightloop.app.entity.Conversation;
import com.delightloop.app.entity.Message;
import com.delightloop.app.repository.ConversationRepository;
import com.delightloop.app.repository.MessageRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

/**
 * REST Controller for managing Inbox conversations and messages.
 */
@RestController
@RequestMapping("/api/inbox")
public class InboxController {

    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;

    public InboxController(ConversationRepository conversationRepository, MessageRepository messageRepository) {
        this.conversationRepository = conversationRepository;
        this.messageRepository = messageRepository;
    }

    @GetMapping("/conversations")
    public ResponseEntity<List<ConversationDto>> getAllConversations() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("hh:mm a");
        List<ConversationDto> list = conversationRepository.findAll().stream().map(c -> {
            List<MessageDto> msgs = messageRepository.findByConversationIdOrderBySentAtAsc(c.getId()).stream().map(m -> new MessageDto(
                    m.getId(),
                    m.getConversation().getId(),
                    m.getSenderType(),
                    m.getBody(),
                    m.getSentAt() != null ? m.getSentAt().format(formatter) : ""
            )).collect(Collectors.toList());

            String lastMsgText = msgs.isEmpty() ? "" : msgs.get(msgs.size() - 1).getBody();
            String timestamp = msgs.isEmpty() ? "" : msgs.get(msgs.size() - 1).getSentAt();

            return new ConversationDto(
                    c.getId(),
                    c.getContact().getId(),
                    c.getContact().getFirstName() + " " + c.getContact().getLastName(),
                    c.getContact().getCompany() != null ? c.getContact().getCompany().getName() : "Independent",
                    c.getContact().getTitle(),
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
                    c.getSubject(),
                    lastMsgText,
                    timestamp,
                    c.getUnread(),
                    c.getStatus(),
                    msgs
            );
        }).collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @PostMapping("/conversations/{id}/messages")
    public ResponseEntity<MessageDto> sendMessage(@PathVariable Long id, @RequestBody MessageDto dto) {
        return conversationRepository.findById(id).map(conv -> {
            Message msg = new Message(conv, dto.getSenderType() != null ? dto.getSenderType() : "USER", dto.getBody());
            Message saved = messageRepository.save(msg);
            conv.setUnread(false);
            conversationRepository.save(conv);

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("hh:mm a");
            MessageDto response = new MessageDto(
                    saved.getId(),
                    saved.getConversation().getId(),
                    saved.getSenderType(),
                    saved.getBody(),
                    saved.getSentAt().format(formatter)
            );
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }).orElse(ResponseEntity.notFound().build());
    }
}
