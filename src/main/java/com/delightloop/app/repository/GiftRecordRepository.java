package com.delightloop.app.repository;

import com.delightloop.app.entity.GiftRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GiftRecordRepository extends JpaRepository<GiftRecord, Long> {
    Optional<GiftRecord> findByTrackingId(String trackingId);
}
