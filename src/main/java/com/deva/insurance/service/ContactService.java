package com.deva.insurance.service;

import com.deva.insurance.entity.Contact;
import com.deva.insurance.entity.Policy;
import com.deva.insurance.exception.ContcatNotFoundException;
import com.deva.insurance.exception.PolicyNotFoundException;
import com.deva.insurance.repository.ContactRepository;
import com.deva.insurance.repository.PolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private PolicyRepository policyRepository;

    public Contact createContact(Contact contact) {
        Optional<Contact> existing = contactRepository.findByEmail(contact.getEmail());

        if (existing.isPresent()) {
            throw new RuntimeException("Email already exists ❌");
        }

        return contactRepository.save(contact);

    }

    public List<Contact> searchContacts(Long id, String name, String email) {

        if (id != null) {
            return contactRepository.findById(id)
                    .map(List::of)
                    .orElse(Collections.emptyList());
        }

        if (name != null && !name.isEmpty()) {
            return contactRepository.findByNameContainingIgnoreCase(name);
        }

        if (email != null && !email.isEmpty()) {
            return contactRepository.findByEmailContainingIgnoreCase(email);
        }

        throw new RuntimeException("Please provide one search field");
    }


  /*  public Contact setPolicyToContact(Long contactId, Long policyId) {
        Contact contact = contactId != null
                ? contactRepository.findById(contactId)
                .orElseThrow(() -> new RuntimeException("Contact not found"))
                : null;
        if (policyId != null && contact!=null) {
            Policy policy = policyRepository.findById(policyId)
                    .orElseThrow(() -> new RuntimeException("Policy not found"));

            //contact.setPolicy(policy);
        }

        return contact!=null ? contactRepository.save(contact) : null;
    }*/

    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

    public Contact getContactById(Long id) {
        return contactRepository.findById(id)
                .orElseThrow(() -> new ContcatNotFoundException("Contact not found with id: " + id));
    }

    public Contact updateContact(Long contactId, Contact updatedContact) {

        Contact existing = contactRepository.findById(contactId)
                .orElseThrow(() -> new RuntimeException("Contact not found"));

        // 🔥 Update fields
        existing.setName(updatedContact.getName());
        existing.setEmail(updatedContact.getEmail());
        existing.setPhone(updatedContact.getPhone());
        existing.setAddress(updatedContact.getAddress());

        return contactRepository.save(existing);
    }

   /* public Contact assignPolicyToContact(Long contactId, Long policyId) {

        Contact contact = contactRepository.findById(contactId)
                .orElseThrow(() -> new RuntimeException("Contact not found"));

        Policy policy = policyRepository.findById(policyId)
                .orElseThrow(() -> new RuntimeException("Policy not found"));

        // 🔥 Link them
        //contact.setPolicy(policy);

        return contactRepository.save(contact);
    }*/
}