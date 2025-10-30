package com.example.bcrypt2025.dto.agent;

public class ChatMessageRequest {
    private String chatInput;

    // El sessionId se obtiene del usuario autenticado

    public ChatMessageRequest() {
    }

    public ChatMessageRequest(String chatInput) {
        this.chatInput = chatInput;
    }

    public String getChatInput() {
        return chatInput;
    }

    public void setChatInput(String chatInput) {
        this.chatInput = chatInput;
    }
}