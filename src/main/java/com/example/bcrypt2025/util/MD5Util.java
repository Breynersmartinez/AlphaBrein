package com.example.bcrypt2025.util;

import java.math.BigInteger;
import java.security.MessageDigest;

public class MD5Util {
    public static String hash(String input) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] digest = md.digest(input.getBytes());
            BigInteger number = new BigInteger(1, digest);
            return String.format("%032x", number);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static String recursiveHash(String input, int cost) {
        for (int i = 0; i < cost; i++) {
            input = hash(input);
        }
        return input;
    }
}
