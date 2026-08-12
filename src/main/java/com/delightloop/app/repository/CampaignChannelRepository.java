package com.delightloop.app.repository;

import com.delightloop.app.entity.CampaignChannel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CampaignChannelRepository extends JpaRepository<CampaignChannel, Long> {
    List<CampaignChannel> findByCampaignId(Long campaignId);
}
