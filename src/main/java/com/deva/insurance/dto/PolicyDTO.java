package com.deva.insurance.dto;

import lombok.Data;

@Data
public class PolicyDTO {

    private String policyName;
    private String policyType;
    private Double premium;
    private String userEmail;
}