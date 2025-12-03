# 📦 Desafio NFs

Sistema para gerenciamento de Notas Fiscais.

## 🚀 Como Executar

### Frontend (Angular)
```bash
cd front
npm install
npm start
```
→ http://localhost:4200

### Backend (Spring Boot)
```bash
cd back
docker build -t backend .
docker run -d -p 8080:8080 backend
```
→ http://localhost:8080/

## 📁 Estrutura
- `front/` → Angular (executar manualmente)
- `back/` → Spring Boot (executar com Docker)

## 🛠 Stack
- **Front:** Angular 14
- **Back:** Spring Boot 3.5.8 + Java 21
- **DB:** H2 Database
- **Container:** Docker