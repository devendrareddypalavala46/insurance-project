package com.deva.insurance.service;

import com.deva.insurance.entity.Policy;
import com.deva.insurance.exception.PolicyNotFoundException;
import com.deva.insurance.repository.PolicyRepository;
import com.deva.insurance.service.strategy.CarPolicyStrategy;
import com.deva.insurance.service.strategy.HomePolicyStrategy;
import com.deva.insurance.service.strategy.LifePolicyStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PolicyService {

    @Autowired
    private PolicyRepository repository;

    public Policy savePolicy(Policy policy) {

        double premium = 0;

        switch (policy.getPolicyType().toLowerCase()) {

            case "car":
                premium = carStrategy.calculatePremium(policy);
                break;

            case "home":
                premium = homeStrategy.calculatePremium(policy);
                break;

            case "life":
                premium = lifeStrategy.calculatePremium(policy);
                break;

            default:
                throw new RuntimeException("Invalid policy type");
        }

        policy.setPremium(premium);

        return repository.save(policy);
    }

    /*public List<Policy> getAllPolicies() {
        return repository.findAll();
    }*/

    public Policy getPolicyById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new PolicyNotFoundException("Policy not found with id: " + id));
    }

    public Policy updatePolicy(Long id, Policy updatedPolicy) {

        Policy existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Policy not found"));

        boolean oldBusinessUse = existing.isBusinessUse();
        boolean newBusinessUse = updatedPolicy.isBusinessUse();

        existing.setStatus(updatedPolicy.getStatus());
        existing.setBusinessUse(newBusinessUse);

        if (!oldBusinessUse && newBusinessUse) {
            existing.setPremium(existing.getPremium() + 500);

        } else if (oldBusinessUse && !newBusinessUse) {
            existing.setPremium(existing.getPremium() - 500);
        }

        return repository.save(existing);
    }

    public String deletePolicy(Long id) {
        repository.deleteById(id);
        return "Policy deleted successfully";
    }

    @Autowired
    private CarPolicyStrategy carStrategy;

    @Autowired
    private HomePolicyStrategy homeStrategy;

    @Autowired
    private LifePolicyStrategy lifeStrategy;
}