package com.delightloop.app.util;

import java.util.Random;

public class TrackingNumberGenerator {

    private static final Random RANDOM = new Random();

    public static String generateTrackingId() {
        int number = 100000 + RANDOM.nextInt(900000);
        return "DL-GIFT-" + number;
    }
}
