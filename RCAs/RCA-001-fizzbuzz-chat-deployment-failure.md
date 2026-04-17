# RCA-001: FizzBuzz Chat Deployment Failure

## Incident Summary
The "Chat with FizzBuzz" feature failed on the deployed Vercel environment with a 500 Internal Server Error.

## Timeline
- **2026-04-17 16:30**: Feature F095 implemented, including a `/chat` endpoint in `web-server`.
- **2026-04-17 16:45**: Deployment to Vercel completed.
- **2026-04-17 16:50**: Users reported 500 errors when using the chat assistant.
- **2026-04-17 17:05**: Investigation revealed that the `chatHandler` was attempting to execute a Python script via `child_process.exec`, which is not supported in the Vercel Node.js runtime environment as it lacks Python and PyTorch.

## Root Cause
The implementation of the AI inference endpoint relied on a local Python installation and the `torch` library. While this worked in the local development environment, it was incompatible with the serverless Node.js environment on Vercel, which does not provide a Python runtime or the necessary ML libraries.

## Resolution
The model was exported to ONNX format, and the inference logic was ported to TypeScript using `onnxruntime-node`. This allows the model to run natively within the Node.js environment on Vercel without external dependencies on Python.

## Action Items
1. [x] Export FizzBuzz Transformer model to ONNX.
2. [x] Implement `AIInferenceService` in TypeScript using `onnxruntime-node`.
3. [x] Update `web-server` to use the new service.
4. [x] Update `vercel.json` to include `.onnx` and `.json` files in the deployment bundle.
5. [ ] Establish a policy for AI model deployments to ensure they use compatible runtimes (e.g., ONNX for Node.js).
