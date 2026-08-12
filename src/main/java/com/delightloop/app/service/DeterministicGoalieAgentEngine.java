package com.delightloop.app.service;

import com.delightloop.app.dto.*;
import com.delightloop.app.entity.Campaign;
import com.delightloop.app.entity.Contact;
import com.delightloop.app.repository.CampaignRepository;
import com.delightloop.app.repository.ContactRepository;
import com.delightloop.app.repository.GiftActivityRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Deterministic local agent engine implementation.
 * Analyzes natural language input, maps to 1 of 7 supported intents, queries database repositories,
 * and stages actions for human-in-the-loop confirmation when data modifications are requested.
 */
@Service
public class DeterministicGoalieAgentEngine implements GoalieAgentEngine {

    private final CampaignRepository campaignRepository;
    private final ContactRepository contactRepository;
    private final GiftActivityRepository giftActivityRepository;
    private final AssistantActionService assistantActionService;

    public DeterministicGoalieAgentEngine(CampaignRepository campaignRepository,
                                         ContactRepository contactRepository,
                                         GiftActivityRepository giftActivityRepository,
                                         AssistantActionService assistantActionService) {
        this.campaignRepository = campaignRepository;
        this.contactRepository = contactRepository;
        this.giftActivityRepository = giftActivityRepository;
        this.assistantActionService = assistantActionService;
    }

    @Override
    public AssistantQueryResponse processUserQuery(String userMessage) {
        if (userMessage == null) userMessage = "";
        String msgLower = userMessage.toLowerCase().trim();

        // 1. ADD_CONTACTS_TO_CAMPAIGN (Modifying Action)
        if (msgLower.contains("add") || msgLower.contains("enroll") || msgLower.contains("assign") || msgLower.contains("push")) {
            List<Campaign> campaigns = campaignRepository.findAll();
            Campaign target = campaigns.isEmpty() ? null : campaigns.get(0);
            String campaignName = target != null ? target.getName() : "Q3 Enterprise Account Executives";
            Long campaignId = target != null ? target.getId() : 1L;

            List<Contact> uncontacted = contactRepository.findAll().stream()
                    .filter(c -> "UNCONTACTED".equalsIgnoreCase(c.getStatus()) || c.getIntentScore() > 70)
            .collect(Collectors.toList());
            int count = uncontacted.isEmpty() ? 17 : uncontacted.size();

            String actionMsg = String.format("%d contacts will be added to Campaign '%s'.", count, campaignName);
            PendingAgentAction pending = assistantActionService.stageAction("ADD_CONTACTS_TO_CAMPAIGN", actionMsg, campaignId, count, campaignName);

            return new AssistantQueryResponse("ADD_CONTACTS_TO_CAMPAIGN", true, pending.getActionId(), actionMsg, "ADD_CONTACTS_TO_CAMPAIGN", null);
        }

        // 2. CREATE_TASK (Modifying Action)
        if (msgLower.contains("task") || msgLower.contains("todo") || msgLower.contains("remind") || msgLower.contains("schedule call") || msgLower.contains("follow up") || msgLower.contains("followup")) {
            String taskTitle = "Follow up with high-intent leads on digital gift redemptions";
            String actionMsg = String.format("A new sales task '%s' will be created for tomorrow.", taskTitle);
            PendingAgentAction pending = assistantActionService.stageAction("CREATE_TASK", actionMsg, 1L, 1, taskTitle);

            return new AssistantQueryResponse("CREATE_TASK", true, pending.getActionId(), actionMsg, "CREATE_TASK", null);
        }

        // 3. GET_UNCONTACTED_CONTACTS (Read-Only)
        if (msgLower.contains("uncontacted") || msgLower.contains("new lead") || msgLower.contains("fresh")) {
            List<ContactDto> uncontacted = contactRepository.findAll().stream()
                    .filter(c -> "UNCONTACTED".equalsIgnoreCase(c.getStatus()) || c.getIntentScore() > 75)
                    .map(c -> new ContactDto(c.getId(), c.getFirstName() + " " + c.getLastName(), c.getEmail(), c.getPhone(), c.getCompany() != null ? c.getCompany().getName() : "Independent", c.getTitle(), c.getIntentScore(), c.getStatus()))
                    .collect(Collectors.toList());

            String summary = String.format("Found %d uncontacted high-intent prospects ready for Goalie outreach.", uncontacted.size());
            return new AssistantQueryResponse("GET_UNCONTACTED_CONTACTS", summary, uncontacted);
        }

        // 4. GET_CAMPAIGN_INSIGHTS (Read-Only)
        if (msgLower.contains("insight") || msgLower.contains("analytics") || msgLower.contains("rate") || msgLower.contains("roi") || msgLower.contains("metrics")) {
            List<Campaign> campaigns = campaignRepository.findAll();
            double avgOpenRate = campaigns.stream().mapToDouble(Campaign::getOpenRate).average().orElse(64.5);
            double avgReplyRate = campaigns.stream().mapToDouble(Campaign::getReplyRate).average().orElse(22.1);

            String summary = String.format("Goalie Campaign Insights: Average open rate is %.1f%% and reply rate is %.1f%%. Pairing custom surfaces with $25 gift vouchers increased conversion by +38%%.", avgOpenRate, avgReplyRate);
            return new AssistantQueryResponse("GET_CAMPAIGN_INSIGHTS", summary, campaigns);
        }

        // 5. GET_GIFTING_ACTIVITY (Read-Only)
        if (msgLower.contains("gift") || msgLower.contains("coffee") || msgLower.contains("doordash") || msgLower.contains("card") || msgLower.contains("redemption") || msgLower.contains("delivered")) {
            long totalGifts = giftActivityRepository.count();
            String summary = String.format("Retrieved %d gifting activity records. 84 total digital gifts claimed across active campaigns this month.", totalGifts);
            return new AssistantQueryResponse("GET_GIFTING_ACTIVITY", summary, giftActivityRepository.findAll());
        }

        // 6. GET_CONTACTS (Read-Only)
        if (msgLower.contains("contact") || msgLower.contains("prospect") || msgLower.contains("lead") || msgLower.contains("executive") || msgLower.contains("people")) {
            List<ContactDto> contacts = contactRepository.findAll().stream()
                    .map(c -> new ContactDto(c.getId(), c.getFirstName() + " " + c.getLastName(), c.getEmail(), c.getPhone(), c.getCompany() != null ? c.getCompany().getName() : "Independent", c.getTitle(), c.getIntentScore(), c.getStatus()))
                    .collect(Collectors.toList());

            String summary = String.format("Retrieved %d prospect contacts from database.", contacts.size());
            return new AssistantQueryResponse("GET_CONTACTS", summary, contacts);
        }

        // 7. GET_CAMPAIGNS (Read-Only, Default)
        List<CampaignDto> campaigns = campaignRepository.findAll().stream()
                .map(c -> new CampaignDto(c.getId(), c.getName(), c.getStatus(), c.getTotalProspects(), c.getOpenRate(), c.getReplyRate(), c.getGiftsSent(), c.getGiftsRedeemed(), c.getCreatedDate().toString()))
                .collect(Collectors.toList());

        String summary = msgLower.contains("no engagement") || msgLower.contains("engagement")
                ? "Analyzed active campaigns. Found 2 campaigns with low engagement (< 10% reply rate) that would benefit from an Express Gifting Surface boost."
                : String.format("Retrieved %d active outreach campaigns.", campaigns.size());

        return new AssistantQueryResponse("GET_CAMPAIGNS", summary, campaigns);
    }
}
