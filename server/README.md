# SERVER RUN

-   Runs on port 5000
-   Use `npm run dev` to start project

## SERVER SETUP

-   cd into `server` folder if you haven't
-   Run `npm install`
-   Create `.env` file in the `server` folder
-   Add the following environment variables:

    -   NODE_ENV=development
    -   PORT=5000
    -   STRIPE_SECRET_KEY=`<secret test key from stripe>`
    -   BASE_URL=http://localhost:5000/api
    -   ACCESS_TOKEN_SECRET=`<random alphanumeric string>`
    -   ACCESS_TOKEN_LIFE=1800
    -   ACCESS_TOKEN_NAME=accessToken
    -   REFRESH_TOKEN_SECRET=`<random alphanumeric string>`
    -   REFRESH_TOKEN_LIFE=86400 # seconds
    -   REFRESH_TOKEN_NAME=refreshToken
    -   MAILTRAP_USER=`<mailtrap username>`
    -   MAILTRAP_PASS=`<mailtrap password>`

-   If debug is needed:
    -   Toggle Auto Launch: Only With Flag in VSCode settings (Ctrl + Shift + P)
    -   Use `npm run debug` to start debug project
