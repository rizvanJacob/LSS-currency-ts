# INSTRUCTIONS FOR DEPLOYMENT

This application should deployed in 2 tiers, namely a static site (client) and a web service (server)

## CLIENT DEPLOYMENT INSTRUCTIONS

### Settings

Branch: main
Root directory: ./client
Build script: client/$ npm install && npm run build
Publish directory: client/dist

### Environment variables

1. VITE_SERVER_URL: url to access server

## SERVER DEPLOYMENT INSTRUCTIONS

### Settings

Branch: main
Root directory: ./server
Build script: server/$ npm install && npm run build && npx prisma db push
Run instructions: server/$npm run start

### Environment variables

1. CLIENT_ID: SgID client ID
2. CLIENT_SECRET: SgID client secret
3. CLIENT_URL: url to access client
4. DB_PROVIDER: Prisma Database Provider string
5. DATABASE_URL: Database URL
6. JWT_SECRET: JWT secret
7. PRIVATE_KEY: SgID client private key
8. PUBLIC_KEY: SgID client public key
9. SCOPE: SgID scope

### Database Creation SQL Commands
