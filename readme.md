# INSTRUCTIONS FOR DEPLOYMENT

### Root Folder:

    .

### Build script:

    cd ./client && npm install && npm run build && cd ../server && npm install && npx prisma db push && npm run build

### Start script:

    npm run start
