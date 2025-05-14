# Webhook API

## Event types
- `payment_received`
- `payment_processed`
- `invoice_processing`
- `invoice_completed`

## Endpoints

### Register
`POST /webhooks/register`  
Body JSON:
```json
{ "url": "https://your.app/hook", "event": "payment_received" }