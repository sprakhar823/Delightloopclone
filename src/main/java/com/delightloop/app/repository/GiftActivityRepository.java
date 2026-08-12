package com.delightloop.app.repository;

import com.delightloop.app.entity.GiftActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GiftActivityRepository extends JpaRepository<GiftActivity, Long> {
    Optional<GiftActivity> findByTrackingId(String trackingId);
    List<GiftActivity> findByContactId(Long contactId);
    List<GiftActivity> findByStatus(String status);
}
