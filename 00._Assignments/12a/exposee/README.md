# Webhook Service README

## Overview

This is a simple **Webhook Service Exposee** that allows integrators to register, unregister, and receive webhook callbacks for payment and invoice-related events. The service provides endpoints to manage subscriptions, dispatch events, and test connectivity.

## Prerequisites

- **Node.js** (v14+ recommended)
- **npm** (comes with Node.js)
- **ngrok** (optional, for exposing your local server)

## Setup

1. Clone or download this repository.
2. Install dependencies:
   ```bash
   npm install express sqlite3 sqlite node-fetch
   ```
3. Start the service:
   ```bash
   node webhook_service.js
   ```
   By default, the service listens on port **3000**.
4. (Optional) Expose your local service via ngrok:
   ```bash
   ngrok http 3000
   ```
   Note the generated public URL, e.g. `https://e5b9-212-237-132-199.ngrok-free.app`.

## Available Event Types

- `PAYMENT_RECEIVED`
- `PAYMENT_PROCESSED`
- `INVOICE_PROCESSING`
- `INVOICE_COMPLETED`

## API Endpoints

### 1. Register Webhook

- **Endpoint**: `/webhooks/register`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "url": "https://e1a8-62-198-135-132.ngrok-free.app/",
    "eventTypes": ["PAYMENT_RECEIVED"]
  }
  ```
- **Example**:
  ```bash
  curl -X POST https://e5b9-212-237-132-199.ngrok-free.app/webhooks/register \
    -H "Content-Type: application/json" \
    -d '{
          "url": "https://e1a8-62-198-135-132.ngrok-free.app/",
          "eventTypes": ["PAYMENT_RECEIVED"]
        }'
  ```

### 2. Dispatch Event

- **Endpoint**: `/events/:eventType` (replace `:eventType` with one of the event types)
- **Method**: `POST`
- **Request Body**: Any JSON payload to include under `data`.
- **Example**:
  ```bash
  curl -X POST https://e5b9-212-237-132-199.ngrok-free.app/events/PAYMENT_RECEIVED \
    -H "Content-Type: application/json" \
    -d '{
          "orderId": 9001,
          "amount": 49.95,
          "customer": "Alice"
        }'
  ```

### 3. Ping All Webhooks

- **Endpoint**: `/ping`
- **Method**: `POST`
- **Description**: Sends a test `PING` event to **all** registered webhook URLs.
- **Example**:
  ```bash
  curl -X POST https://e5b9-212-237-132-199.ngrok-free.app/ping
  ```

### 4. Unregister Webhook

- **Endpoint**: `/webhooks/unregister`
- **Method**: `POST`
- **Request Body**:
  - To remove a specific event subscription:
    ```json
    {
      "url": "https://e1a8-62-198-135-132.ngrok-free.app/",
      "eventTypes": ["PAYMENT_RECEIVED"]
    }
    ```
  - To remove **all** subscriptions for a URL:
    ```json
    { "url": "https://e1a8-62-198-135-132.ngrok-free.app/" }
    ```
- **Example**:
  ```bash
  curl -X POST https://e5b9-212-237-132-199.ngrok-free.app/webhooks/unregister \
    -H "Content-Type: application/json" \
    -d '{
          "url": "https://e1a8-62-198-135-132.ngrok-free.app/",
          "eventTypes": ["PAYMENT_RECEIVED"]
        }'
  ```

## Usage Notes

- Replace the ngrok URLs with your actual public endpoints when moving to production.
- The service stores subscriptions in a SQLite database file `webhooks.db` in the project root.
