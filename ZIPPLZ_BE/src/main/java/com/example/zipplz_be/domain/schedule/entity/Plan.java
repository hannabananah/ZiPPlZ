package com.example.zipplz_be.domain.schedule.entity;

import com.example.zipplz_be.domain.user.entity.Customer;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Plan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="plan_serial")
    int planSerial;

    @ManyToOne
    @JoinColumn(name="customer_serial")
    Customer customerSerial;
    @Column(name="address")
    String address;
    @Column(name="shared_contents")
    String sharedContents;

    @OneToMany(mappedBy = "planSerial", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Work> works = new ArrayList<>();


    @Builder
    public Plan(Customer customer, String address, String sharedContents) {
        this.customerSerial = customer;
        this.address = address;
        this.sharedContents = sharedContents;
    }
}
