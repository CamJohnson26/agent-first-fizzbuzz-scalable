# RFC 035: Analytics Service Implementation

## Summary
The goal is to implement a centralized logging and analytics service within the Docker Compose environment. This service will receive logs forwarded from the web-server and potentially other services in the future, providing a single point for performance tracking and system monitoring.

## Motivation
Currently, system logs are only accessible via individual container logs. As the system scales, it becomes difficult to correlate events across different services. A dedicated analytics service will allow us to:
- Centralize all system logs.
- Perform analysis on incoming data (e.g., request count, error rates).
- Provide a foundation for future dashboarding and alerting.

## Detailed Design
1. **Analytics Service (`apps/analytics-service`)**:
   - A Node.js Express application.
   - Endpoint: `POST /api/logs` to receive JSON-formatted logs.
   - For this initial version, it will log incoming data to standard output (captured by Docker) and maintain a simple in-memory counter for basic metrics.

2. **Web Server Integration (`apps/web-server`)**:
   - Integrate a logging middleware (e.g., `morgan` with a custom stream or a simple custom middleware).
   - Forward request and response metadata to the analytics service's `/api/logs` endpoint asynchronously.
   - Use environment variables (e.g., `ANALYTICS_SERVICE_URL`) for configuration.

3. **Docker Compose Update**:
   - Add the `analytics-service` to `docker-compose.yml`.
   - Ensure it is on the same network (`fizzbuzz-network`) as the web-server.
   - Define dependency: `web-server` depends on `analytics-service` (optional, as log forwarding should be non-blocking).

## Alternatives Considered
- **ELK Stack (Elasticsearch, Logstash, Kibana)**: Overkill for our current scale and requires significant resources.
- **Grafana Loki / Promtail**: Excellent modern solution, but implementing a custom service first allows us to define our own logic and keep the footprint small during early development. We can transition to Loki later if needed.
