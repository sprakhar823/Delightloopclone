package com.delightloop.app.controller;

import com.delightloop.app.dto.ExpressSendRequest;
import com.delightloop.app.dto.ExpressSendResponse;
import com.delightloop.app.util.TrackingNumberGenerator;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST Controller for instant Express Gift send operations.
 */
@RestController
@RequestMapping("/api/express-send")
public class ExpressSendController {

    @PostMapping
    public ResponseEntity<ExpressSendResponse> sendExpressGift(@Valid @RequestBody ExpressSendRequest request) {
        String trackingId = TrackingNumberGenerator.generateTrackingId();

        ExpressSendResponse response = new ExpressSendResponse(
                true,
                trackingId,
                request.getRecipient(),
                request.getGiftType()
        );

        return ResponseEntity.ok(response);
    }
}
