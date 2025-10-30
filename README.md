# AlphaBrein
Authentication system with Spring Boot, MySQL, and bcrypt encryption.

###  **"Evaluación del rendimiento del algoritmo bcrypt en la derivación de contraseñas de usuario utilizando una base de datos MySQL durante el proceso de login para descubrir su comportamiento al aplicar distintos parámetros 'salt'."**






// ============================================
// 1. PRIMERO: REGISTRO E LOGIN
// ============================================

// REGISTRO
curl -X POST http://localhost:8080/api/auth/register \
-H "Content-Type: application/json" \
-d '{
"firstName": "Breiner",
"lastName": "López",
"idCard": 1234567890,
"identificationType": "CC",
"email": "breiner@example.com",
"password": "password123",
"phoneNumber": "3005551234",
"direction": "Calle 1 #2-3"
}'

// RESPUESTA:
{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
"message": "Usuario registrado exitosamente"
}


// LOGIN
curl -X POST http://localhost:8080/api/auth/login \
-H "Content-Type: application/json" \
-d '{
"email": "breiner@example.com",
"password": "password123"
}'

// RESPUESTA:
{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
"message": "Login exitoso"
}


// ============================================
// 2. OBTENER O CREAR SESIÓN DE CHAT
// ============================================

// GUARDAR EL TOKEN DEL LOGIN ANTERIOR
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

// CREAR SESIÓN
curl -X POST http://localhost:8080/api/chat/session \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $TOKEN"

// RESPUESTA:
{
"id": 1,
"sessionId": "38c2a0d1-c889-48e0-9c63-a41f04cbb787",
"user": {
"idCard": 1234567890,
"firstName": "Breiner",
"lastName": "López",
"email": "breiner@example.com"
},
"n8nSessionId": "38c2a0d1-c889-48e0-9c63-a41f04cbb787",
"createdAt": "2025-01-15T10:30:00",
"lastActivity": "2025-01-15T10:30:00",
"active": true
}


// ============================================
// 3. ENVIAR MENSAJE AL CHAT
// ============================================

// Toma el sessionId de la respuesta anterior: 38c2a0d1-c889-48e0-9c63-a41f04cbb787

curl -X POST http://localhost:8080/api/chat/message \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $TOKEN" \
-d '{
"chatInput": "muy bien gracias, como vas? soy breiner"
}'

// RESPUESTA:
{
"sessionId": "38c2a0d1-c889-48e0-9c63-a41f04cbb787",
"message": "muy bien gracias, como vas? soy breiner",
"response": "¡Hola Breiner! Me alegra saludarte. Todo va bien por aquí..."
}


// ============================================
// 4. ENVIAR MÚLTIPLES MENSAJES EN LA MISMA SESIÓN
// ============================================

// El controlador genera automáticamente la sesión si existe
// No necesitas hacer nada especial, solo sigue enviando mensajes

curl -X POST http://localhost:8080/api/chat/message \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $TOKEN" \
-d '{
"chatInput": "¿Cuál es tu nombre?"
}'

curl -X POST http://localhost:8080/api/chat/message \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $TOKEN" \
-d '{
"chatInput": "¿Qué puedes hacer?"
}'

curl -X POST http://localhost:8080/api/chat/message \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $TOKEN" \
-d '{
"chatInput": "Cuéntame un chiste"
}'


// ============================================
// 5. CERRAR SESIÓN
// ============================================

curl -X POST "http://localhost:8080/api/chat/session/38c2a0d1-c889-48e0-9c63-a41f04cbb787/close" \
-H "Authorization: Bearer $TOKEN"

// RESPUESTA: 200 OK


// ============================================
// EJEMPLO CON JavaScript/Fetch
// ============================================

// 1. Login
const loginResponse = await fetch('http://localhost:8080/api/auth/login', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
email: 'breiner@example.com',
password: 'password123'
})
});
const { token } = await loginResponse.json();

// 2. Crear sesión
const sessionResponse = await fetch('http://localhost:8080/api/chat/session', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'Authorization': `Bearer ${token}`
}
});
const { sessionId } = await sessionResponse.json();

// 3. Enviar mensaje
const messageResponse = await fetch('http://localhost:8080/api/chat/message', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'Authorization': `Bearer ${token}`
},
body: JSON.stringify({
chatInput: 'muy bien gracias, como vas? soy breiner'
})
});
const { response } = await messageResponse.json();
console.log(response);

// 4. Cerrar sesión
await fetch(`http://localhost:8080/api/chat/session/${sessionId}/close`, {
method: 'POST',
headers: { 'Authorization': `Bearer ${token}` }
});


// ============================================
// EJEMPLO CON Python/Requests
// ============================================

import requests
import json

BASE_URL = "http://localhost:8080"
headers = {"Content-Type": "application/json"}

# 1. Login
login_data = {
"email": "breiner@example.com",
"password": "password123"
}
login_response = requests.post(f"{BASE_URL}/api/auth/login",
json=login_data, headers=headers)
token = login_response.json()["token"]

# Agregar token a headers
headers["Authorization"] = f"Bearer {token}"

# 2. Crear sesión
session_response = requests.post(f"{BASE_URL}/api/chat/session",
headers=headers)
session_id = session_response.json()["sessionId"]

# 3. Enviar mensaje
message_data = {"chatInput": "muy bien gracias, como vas? soy breiner"}
message_response = requests.post(f"{BASE_URL}/api/chat/message",
json=message_data, headers=headers)
print(message_response.json()["response"])

# 4. Cerrar sesión
requests.post(f"{BASE_URL}/api/chat/session/{session_id}/close",
headers=headers)







## ---------------------------

# Obtener historial completo de una sesión
GET /api/chat/session/{sessionId}/history
Authorization: Bearer {token}

# Ejemplo:
curl http://localhost:8080/api/chat/session/38c2a0d1-c889-48e0-9c63-a41f04cbb787/history \
-H "Authorization: Bearer {token}"

# Respuesta:
{
"id": 1,
"sessionId": "38c2a0d1-c889-48e0-9c63-a41f04cbb787",
"titulo": null,
"fechaInicio": "2025-10-30T13:30:00",
"fechaUltimaInteraccion": "2025-10-30T13:43:00",
"activa": true,
"mensajes": [
{
"id": 1,
"sender": "USER",
"mensaje": "Hola, ¿cómo estás?",
"fechaEnvio": "2025-10-30T13:30:15"
},
{
"id": 2,
"sender": "AGENT",
"mensaje": "¡Hola! Me alegra saludarte...",
"fechaEnvio": "2025-10-30T13:30:20"
}
]
}

# Obtener todas las sesiones del usuario
GET /api/chat/sessions
Authorization: Bearer {token}

# Respuesta:
[
{
"id": 1,
"sessionId": "38c2a0d1-c889-48e0-9c63-a41f04cbb787",
"titulo": null,
"fechaInicio": "2025-10-30T13:30:00",
"fechaUltimaInteraccion": "2025-10-30T13:43:00",
"activa": true
}
]