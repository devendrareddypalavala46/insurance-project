package com.deva.insurance.entity;


import jakarta.persistence.*;
import lombok.Data;
import jakarta.validation.constraints.*;


@Entity
@Data
public class Policy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String policyName;

    @NotBlank
    private String policyType;

    @NotNull
    private Double premium;

    @Email
    private String userEmail;
    @Column(name = "business_use")
    private boolean businessUse;

    private String status;

}