package com.deva.insurance.service.strategy;

import com.deva.insurance.entity.Policy;
import org.springframework.stereotype.Service;

@Service
public class CarPolicyStrategy implements PremiumStrategy {

    @Override
    public double calculatePremium(Policy policy) {
        return policy.getPremium() + 2000;
    }
}