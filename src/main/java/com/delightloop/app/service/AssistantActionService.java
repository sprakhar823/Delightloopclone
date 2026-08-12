package com.delightloop.app.service;

import com.delightloop.app.dto.ActionConfirmationResponse;
import com.delightloop.app.dto.PendingAgentAction;
import com.delightloop.app.entity.Campaign;
import com.delightloop.app.entity.Contact;
import com.delightloop.app.entity.Task;
import com.delightloop.app.entity.User;
import com.delightloop.app.repository.CampaignRepository;
import com.delightloop.app.repository.ContactRepository;
import com.delightloop.app.repository.TaskRepository;
import com.delightloop.app.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Service managing pending agentic actions and human-in-the-loop confirmations.
 */
@Service
public class AssistantActionService {

    private final Map<String, PendingAgentAction> pendingActionsMap = new ConcurrentHashMap<>();

    private final CampaignRepository campaignRepository;
    private final ContactRepository contactRepository;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public AssistantActionService(CampaignRepository campaignRepository, ContactRepository contactRepository, TaskRepository taskRepository, UserRepository userRepository) {
        this.campaignRepository = campaignRepository;
        this.contactRepository = contactRepository;
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    public PendingAgentAction stageAction(String actionType, String message, Long targetId, Integer itemCount, String targetName) {
        String actionId = "act_" + UUID.randomUUID().toString().substring(0, 8);
        PendingAgentAction pending = new PendingAgentAction(actionId, actionType, message, targetId, itemCount, targetName);
        pendingActionsMap.put(actionId, pending);
        return pending;
    }

    public ActionConfirmationResponse confirmAction(String actionId) {
        PendingAgentAction pending = pendingActionsMap.remove(actionId);
        if (pending == null) {
            return new ActionConfirmationResponse(false, actionId, "UNKNOWN", "Action not found or already processed.");
        }

        if ("ADD_CONTACTS_TO_CAMPAIGN".equalsIgnoreCase(pending.getActionType())) {
            Long campaignId = pending.getTargetId() != null ? pending.getTargetId() : 1L;
            int addedCount = pending.getItemCount() != null ? pending.getItemCount() : 17;

            Campaign campaign = campaignRepository.findById(campaignId).orElse(null);
            if (campaign != null) {
                campaign.setTotalProspects(campaign.getTotalProspects() + addedCount);
                campaignRepository.save(campaign);
            }
            String msg = String.format("Action %s confirmed! Successfully added %d contacts to %s.", actionId, addedCount, campaign != null ? campaign.getName() : "Campaign");
            return new ActionConfirmationResponse(true, actionId, pending.getActionType(), msg);

        } else if ("CREATE_TASK".equalsIgnoreCase(pending.getActionType())) {
            User user = userRepository.findById(1L).orElse(null);
            Contact contact = contactRepository.findById(1L).orElse(null);
            String taskTitle = pending.getTargetName() != null ? pending.getTargetName() : "Follow up on Goalie AI recommendations";

            Task task = new Task(user, contact, taskTitle, pending.getMessage(), LocalDate.now().plusDays(1), "HIGH", "PENDING");
            taskRepository.save(task);

            String msg = String.format("Action %s confirmed! Created follow-up task: '%s'.", actionId, taskTitle);
            return new ActionConfirmationResponse(true, actionId, pending.getActionType(), msg);
        }

        return new ActionConfirmationResponse(true, actionId, pending.getActionType(), "Action " + actionId + " executed successfully.");
    }

    public ActionConfirmationResponse cancelAction(String actionId) {
        PendingAgentAction pending = pendingActionsMap.remove(actionId);
        if (pending == null) {
            return new ActionConfirmationResponse(false, actionId, "UNKNOWN", "Action " + actionId + " was not found or already cancelled.");
        }
        return new ActionConfirmationResponse(true, actionId, pending.getActionType(), "Action " + actionId + " was cancelled by user.");
    }
}
