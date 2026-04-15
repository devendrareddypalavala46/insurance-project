package com.deva.insurance.service.strategy;

import com.deva.insurance.entity.Policy;
import org.springframework.stereotype.Service;

@Service
public class HomePolicyStrategy implements PremiumStrategy {

    @Override
    public double calculatePremium(Policy policy) {
        return policy.getPremium() + 1500;
    }
}