package com.delightloop.app.repository;

import com.delightloop.app.entity.CampaignRecipient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CampaignRecipientRepository extends JpaRepository<CampaignRecipient, Long> {
    List<CampaignRecipient> findByCampaignId(Long campaignId);
    List<CampaignRecipient> findByContactId(Long contactId);
}
