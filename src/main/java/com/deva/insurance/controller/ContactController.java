package com.deva.insurance.controller;

import com.deva.insurance.entity.Contact;
import com.deva.insurance.exception.ErrorResponse;
import com.deva.insurance.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contact")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @PostMapping("/createContact")
    public ResponseEntity<?> createContact(@RequestBody Contact contact) {
        try {
            Contact contact1 = contactService.createContact(contact);
            return ResponseEntity.ok(contact1);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Contact is already exists with this email"));
        }
    }

    @PostMapping("/search")
    public ResponseEntity<?> searchContacts(@RequestBody Contact contact) {
        try {
            Long contactId = contact != null ? contact.getId() : null;
            String contactEmail = contact != null ? contact.getEmail() : null;
            String contactName = contact != null ? contact.getName() : null;

            List<Contact> result = contactService.searchContacts(contactId, contactName, contactEmail);

            return ResponseEntity.ok(result);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error while searching contacts: " + e.getMessage());
        }
    }

   /* @PostMapping("/{contactId}/policy/{policyId}")
    public ResponseEntity<?> setPolicyToContact(@RequestParam Long contactId,
                                 @RequestParam(required = false) Long policyId) {

        try {
            Contact contact = contactService.setPolicyToContact(contactId, policyId);;
            return ResponseEntity.ok(contact);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Contact or policy is not exist"));
        }
    }*/

    @GetMapping
    public List<Contact> getAllContacts() {
        return contactService.getAllContacts();
    }

    @GetMapping("/{id}")
    public Contact getContactById(@PathVariable Long id) {
        return contactService.getContactById(id);
    }

    @PutMapping("/{contactId}")
    public Contact updateContact(@PathVariable Long contactId,
                                 @RequestBody Contact contact) {

        return contactService.updateContact(contactId, contact);
    }

   /* @PutMapping("/{contactId}/policy/{policyId}")
    public Contact assignPolicy(@PathVariable Long contactId,
                                @PathVariable Long policyId) {

        return contactService.assignPolicyToContact(contactId, policyId);
    }*/
}