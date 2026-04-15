package com.deva.insurance.service.strategy;

import com.deva.insurance.entity.Policy;

public interface PremiumStrategy {
    double calculatePremium(Policy policy);
}