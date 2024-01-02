## Getting Started

Node Version 18.17.0

NEXT_PUBLIC_WEB_URL="localhost:3000"

## Run API:

- cd ./api/
- npm i
- create a .env file with the following variables:

PORT=
MONGO_URL= 'mongodb+srv://USER:CLUSTER@cluster0.hkb8byd.mongodb.net/?retryWrites=true&w=majority'
DB_NAME= 'DB_NAME'
CLIENT_SECRET='CLIENT SECRET'
AUTH_URL='https://accounts.google.com/o/oauth2/v2/auth'

- npm run serve

## Run Client:

- cd ./client/
- npm i
- create a .env.local file with the following variables:

NEXT_PUBLIC_CLIENT_ID=
NEXT_PUBLIC_PROJECT_ID=
NEXT_PUBLIC_AUTH_URI=
NEXT_PUBLIC_TOKEN_URI=https://oauth2.googleapis.com/token
NEXT_PUBLIC_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
NEXT_PUBLIC_CLIENT_SECRET=
NEXT_PUBLIC_API_URL=http://localhost:3001

- npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
