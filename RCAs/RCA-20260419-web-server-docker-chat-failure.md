# RCA: Web-server Chat Endpoint Failure in Docker

## Status
Completed

## Incident Summary
When running the `web-server` via its dedicated Dockerfile, the `/chat` endpoint failed with a 500 error.

## Timeline
- **Discovery**: User reported that building and running the web-server Dockerfile fails when hitting the chat endpoint.
- **Investigation**: 
    - Inspected `apps/web-server/Dockerfile` and found it only installs Node.js dependencies.
    - Verified that the `/chat` endpoint in `apps/web-server/src/handlers.ts` attempts to execute a Python script (`fizzbuzz_transformer.infer`).
    - Discovered that Python is not installed in the Docker image.
    - Discovered that the `fizzbuzz-transformer` directory and the `fizzbuzz_model.pt` model file are not included in the Docker image.
    - Noted that `fizzbuzz_model.pt` is gitignored, making it missing in clean environments.
- **Resolution**: 
    - Updated `apps/web-server/Dockerfile` to install Python, `pip`, and `venv`.
    - Included `@fizzbuzz/transformer` in the `turbo prune` command.
    - Added steps to install PyTorch in a virtual environment within the Docker image.
    - Added a `COPY` command to include the gitignored `fizzbuzz_model.pt` in the image.
    - Set environment variables `PYTHON_PATH` and `TRANSFORMER_PATH` to ensure the web-server can find the Python environment and the transformer app.

## Root Cause
The `web-server` Dockerfile was not kept in sync with the application's evolving dependencies. Specifically, the addition of the transformer-based chat feature introduced a runtime dependency on Python and a specific model file, which were not added to the service-specific Dockerfile (though they were present in the monolith Dockerfile).

## Action Items
- [x] Fix `apps/web-server/Dockerfile` to include Python and the transformer model.
- [ ] Add a CI check to verify that all service-specific Dockerfiles can build and handle basic health checks.
- [ ] Document that `fizzbuzz_model.pt` must be present in the build context when building the web-server image.
