# API Endpoints

The FizzBuzz Scalable API provides several endpoints for computing and monitoring your algorithmic operations.

## GET `/api/fizzbuzz`

Computes the FizzBuzz sequence for a given range.

### Parameters

- `range` (required): The upper bound of the sequence (e.g., `100`).
- `start` (optional): The lower bound (defaults to `1`).
- `engine` (optional): The computation engine to use (`node`, `rust`, or `lean`). Defaults to `node`.

### Example Request

```bash
curl "http://localhost:3000/api/fizzbuzz?range=15&engine=rust"
```

### Example Response

```json
{
  "results": [1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8, "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz"],
  "stats": {
    "executionTimeMs": 0.12,
    "fidelity": "Verified",
    "engine": "rust"
  }
}
```

## GET `/api/stats`

Returns real-time usage and performance statistics for your account.

### Example Response

```json
{
  "totalOperations": 1542032,
  "uptime": "99.999%",
  "activeNodes": 12
}
```

## POST `/api/v1/jobs`

Enqueues a large-scale background job for processing massive ranges.

### Parameters

- `range`: The upper bound (up to 10^12).
- `webhookUrl`: The URL to notify when the job is complete.
