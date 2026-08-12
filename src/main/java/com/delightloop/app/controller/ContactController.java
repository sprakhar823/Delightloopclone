package com.delightloop.app.controller;

import com.delightloop.app.dto.ContactDto;
import com.delightloop.app.entity.Company;
import com.delightloop.app.entity.Contact;
import com.delightloop.app.repository.CompanyRepository;
import com.delightloop.app.repository.ContactRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * REST Controller for managing target prospect contacts.
 */
@RestController
@RequestMapping("/api/contacts")
public class ContactController {

    private final ContactRepository contactRepository;
    private final CompanyRepository companyRepository;

    public ContactController(ContactRepository contactRepository, CompanyRepository companyRepository) {
        this.contactRepository = contactRepository;
        this.companyRepository = companyRepository;
    }

    @GetMapping
    public ResponseEntity<List<ContactDto>> getAllContacts() {
        List<ContactDto> list = contactRepository.findAll().stream().map(c -> new ContactDto(
                c.getId(),
                c.getFirstName() + " " + c.getLastName(),
                c.getEmail(),
                c.getPhone(),
                c.getCompany() != null ? c.getCompany().getName() : "Independent",
                c.getTitle(),
                c.getIntentScore(),
                c.getStatus()
        )).collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContactDto> getContactById(@PathVariable Long id) {
        return contactRepository.findById(id).map(c -> new ContactDto(
                c.getId(),
                c.getFirstName() + " " + c.getLastName(),
                c.getEmail(),
                c.getPhone(),
                c.getCompany() != null ? c.getCompany().getName() : "Independent",
                c.getTitle(),
                c.getIntentScore(),
                c.getStatus()
        )).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ContactDto> createContact(@RequestBody ContactDto dto) {
        String[] parts = dto.getName() != null ? dto.getName().split(" ", 2) : new String[]{"New", "Contact"};
        String firstName = parts[0];
        String lastName = parts.length > 1 ? parts[1] : "";

        Company company = companyRepository.findById(1L).orElse(null);

        Contact contact = new Contact(
                company,
                firstName,
                lastName,
                dto.getEmail() != null ? dto.getEmail() : "contact" + System.currentTimeMillis() + "@example.com",
                dto.getPhone(),
                dto.getTitle() != null ? dto.getTitle() : "Executive",
                null,
                dto.getIntentScore() != null ? dto.getIntentScore() : 50,
                dto.getStatus() != null ? dto.getStatus() : "ENGAGED"
        );
        Contact saved = contactRepository.save(contact);

        ContactDto response = new ContactDto(
                saved.getId(),
                saved.getFirstName() + " " + saved.getLastName(),
                saved.getEmail(),
                saved.getPhone(),
                saved.getCompany() != null ? saved.getCompany().getName() : "Independent",
                saved.getTitle(),
                saved.getIntentScore(),
                saved.getStatus()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContactDto> updateContact(@PathVariable Long id, @RequestBody ContactDto dto) {
        return contactRepository.findById(id).map(contact -> {
            if (dto.getName() != null) {
                String[] parts = dto.getName().split(" ", 2);
                contact.setFirstName(parts[0]);
                if (parts.length > 1) contact.setLastName(parts[1]);
            }
            if (dto.getEmail() != null) contact.setEmail(dto.getEmail());
            if (dto.getPhone() != null) contact.setPhone(dto.getPhone());
            if (dto.getTitle() != null) contact.setTitle(dto.getTitle());
            if (dto.getIntentScore() != null) contact.setIntentScore(dto.getIntentScore());
            if (dto.getStatus() != null) contact.setStatus(dto.getStatus());

            Contact saved = contactRepository.save(contact);
            ContactDto response = new ContactDto(
                    saved.getId(),
                    saved.getFirstName() + " " + saved.getLastName(),
                    saved.getEmail(),
                    saved.getPhone(),
                    saved.getCompany() != null ? saved.getCompany().getName() : "Independent",
                    saved.getTitle(),
                    saved.getIntentScore(),
                    saved.getStatus()
            );
            return ResponseEntity.ok(response);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable Long id) {
        if (contactRepository.existsById(id)) {
            contactRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
