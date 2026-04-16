# Webhooks

Use webhooks to receive real-time notifications when your background jobs are complete or when specific system events occur.

## Setting up a Webhook

You can configure your webhook URLs in the **Web Dashboard** under **Settings > Webhooks**.

## Webhook Payload

When an event occurs, FizzBuzz Scalable will send a `POST` request to your configured URL with a JSON payload.

### Job Completed Event

```json
{
  "event": "job.completed",
  "data": {
    "jobId": "job_12345",
    "range": "1000000000",
    "resultsUrl": "https://storage.fizzbuzz.com/results/job_12345.json",
    "executionTimeMs": 15420
  }
}
```

## Security: Signature Verification

To ensure that webhooks are coming from FizzBuzz Scalable, we include a `X-FizzBuzz-Signature` header in every request. You should verify this signature using your Webhook Secret.

```javascript
const crypto = require('crypto');

function verifySignature(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(payload).digest('hex');
  return digest === signature;
}
```

## Retries

If your server returns a non-2xx status code, we will retry the webhook delivery up to 5 times with exponential backoff.
