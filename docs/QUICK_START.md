# Quick Start Guide

Get FizzBuzz Scalable up and running in under 5 minutes.

## Option A: Running with Docker (Recommended)

The fastest way to see the full power of FizzBuzz Scalable is using Docker Compose. This will launch all services, including the web dashboard, API server, and analytics engine.

```bash
docker-compose up --build
```

Once the containers are running, you can access the following:

- **Web Dashboard**: [http://localhost:5173](http://localhost:5173)
- **API Server**: [http://localhost:3000](http://localhost:3000)
- **Marketing Page**: [http://localhost:8080](http://localhost:8080)

## Option B: Local Development Mode

If you want to run individual services for development:

```bash
# Start the Web Server
pnpm --filter @fizzbuzz/web-server dev

# In another terminal, start the Dashboard
pnpm --filter @fizzbuzz/web-dashboard dev
```

## Your First API Call

You can test the API directly using `curl`:

```bash
curl http://localhost:3000/api/fizzbuzz?range=15
```

**Expected Response:**
```json
{
  "results": [1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8, "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz"],
  "stats": {
    "executionTimeMs": 0.45,
    "fidelity": "Verified"
  }
}
```

## Next Steps

- Explore the [API Reference](ENDPOINTS.md) to see all available parameters.
- Learn about our [Distributed Engine](DISTRIBUTED_ENGINE.md) for massive computations.
