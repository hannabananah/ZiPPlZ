package com.example.zipplz_be.domain.chatting.entity;

import com.example.zipplz_be.domain.schedule.entity.Work;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AfterService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="after_service_serial")
    int afterServiceSerial;

    @ManyToOne
    @JoinColumn(name="work_serial")
    Work workSerial;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="request_date")
    Timestamp requestDate;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="resolve_date")
    Timestamp resolveDate;

    @Column(name="request_content")
    String requestContent;

    @Column(name="as_score")
    String asScore;
}
