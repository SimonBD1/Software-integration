# Doggo Auth Demo

A minimal Single-Page Application demonstrating Auth0 authentication in plain JavaScript—when you’re not signed in it prompts you to log in, and once you are it greets you with a friendly dog picture.

---

## Table of Contents

1. **Prerequisites**  
2. **Auth0 Setup**  
3. **Project Structure**  
4. **Installation & Configuration**  
5. **Running Locally**  
6. **How It Works**  
7. **Troubleshooting**  
8. **FAQ & Resources**  
9. **License**

---

## Prerequisites

- **Node.js** v16 or later (for the local server)  
- **npm** (bundled with Node.js)  
- A free **Auth0** account  
  1. Sign up at https://auth0.com/signup  
  2. Verify your email and log in  

---

## Auth0 Setup

1. **Create a new Application**  
   - In the Auth0 Dashboard, go to **Applications → Applications**, then **Create Application**.  
   - Name it `DoggoAuthDemo`.  
   - Choose **Single Page Web Applications**, Select **Javascript** and click **Create**.

2. **Configure Application Settings**  
   - Under **Settings**, set:  
     - **Allowed Callback URLs**:  
       ```
       http://localhost:3000
       ```  
     - **Allowed Logout URLs**:  
       ```
       http://localhost:3000
       ```  
   - Scroll down and **Save Changes**.  
   - Copy your **Domain** (e.g. `your-tenant.eu.auth0.com`) and **Client ID** for the next step.
   - You could also here download the samplecode for an easier start.



4. **Prepare the client config file**  
   - In the project’s `public/` folder you’ll find `auth_config.json.example`.  
   - Copy it to `auth_config.json`:  

   - Edit `public/auth_config.json` and fill in your values:
     ```json
     {
       "domain": "YOUR_AUTH0_DOMAIN",
       "client_id": "YOUR_CLIENT_ID"
     }
     ```

---

## Project Structure

```
├── public/
│   ├── auth_config.json.example
│   ├── auth_config.json       ← you’ll create this
│   ├── index.html
│   └── js/
│       └── app.js
├── server.js                  ← simple Express static server
├── package.json
└── README.md                  ← you are reading this
```

---

## Installation & Configuration

1. **Clone the repo**  
   ```bash
   git clone https://github.com/SimonBD1/Software-integration/tree/main/00._Assignments/11a
   cd doggo-auth-demo
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Create your Auth0 config**  
   As above, copy `public/auth_config.json.example` → `public/auth_config.json` and add your `domain` + `client_id`.

---

## Running Locally

Start the development server (serves `public/` at port 3000):

```bash
npm run dev
```

> **Tip:** If you don’t have `npm run dev` defined, you can also run:
>
> ```bash
> node server.js
> ```

Then open your browser at:

```
http://localhost:3000
```

---

## How It Works

- **index.html**  
  - Loads Auth0’s SPA SDK UMD build from the CDN.  
  - Provides a “Log In to See a Dog!” button, a “Log Out” button, a `<div>` for messages, and a placeholder `<img>`.

- **app.js**  
  1. **configureClient()**  
     - Fetches `domain` & `client_id` from `/auth_config.json`.  
     - Calls `createAuth0Client({ domain, client_id, cacheLocation: 'localstorage' })`.  
  2. **window.onload**  
     - Initializes Auth0 client.  
     - Detects redirect (`?code=`), calls `handleRedirectCallback()`, and cleans up the URL.  
     - Hooks up **Log In** / **Log Out** button handlers.  
     - Calls **updateUI()** to render the correct message/button/image.  
  3. **updateUI()**  
     - Checks `auth0Client.isAuthenticated()`.  
     - If _not_ authenticated: shows “Hey—you are not logged in. Log in for more features!” + Log In button.  
     - If authenticated: shows “Welcome back! Here’s a dog for you:” + dog image + Log Out button.

---

## Troubleshooting

- **`createAuth0Client is not defined`**  
  - Ensure you’re loading the **UMD** build (e.g. `auth0-spa-js.production.js`) **before** your `app.js` script.  
  - Verify the `<script>` tag URL is correct (version 1.x, not a non-existent 2.0 path).

- **400 Bad Request on `/authorize?clientId=…`**  
  - Double-check your `public/auth_config.json` uses `"client_id"` (snake_case), not `"clientId"`.

- **Auth0 Error Page (“Oops! something went wrong”)**  
  - Confirm **Allowed Callback URLs** in your Auth0 app exactly match `http://localhost:3000`.  
  - Clear browser cache or try in an incognito window.

---