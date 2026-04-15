package com.deva.insurance.controller;

import com.deva.insurance.dto.PolicyDTO;
import com.deva.insurance.entity.Policy;
import com.deva.insurance.service.PolicyService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/policy")
public class PolicyController {

    @Autowired
    private PolicyService service;

    @PostMapping
    public Policy createPolicy(@Valid@RequestBody PolicyDTO dto) {

        Policy policy = new Policy();
        policy.setPolicyName(dto.getPolicyName());
        policy.setPolicyType(dto.getPolicyType());
        policy.setPremium(dto.getPremium());
        policy.setUserEmail(dto.getUserEmail());

        return service.savePolicy(policy);
    }

   /* @GetMapping
    public List<Policy> getPolicies() {
        return service.getAllPolicies();
    }*/

    @GetMapping("/{id}")
    public Policy getPolicyById(@PathVariable Long id) {
        return service.getPolicyById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Policy> updatePolicy(
            @PathVariable Long id,
            @RequestBody Policy policy) {

        Policy updated = service.updatePolicy(id, policy);

        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public String deletePolicy(@PathVariable Long id) {
        return service.deletePolicy(id);
    }
}