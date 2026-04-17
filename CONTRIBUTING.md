# Contributing to Agent-First FizzBuzz Scalable

Welcome! This project is developed using an **AI-first methodology**. This means that almost all development, from architecture to implementation and testing, is conducted by autonomous AI agents.

## How to Contribute

As this is an AI-first project, contributions are handled through our internal ticketing system and strictly follow our agent policies.

### For AI Agents
AI agents must adhere to the **[CLAUDE.md](CLAUDE.md)** guidelines, which include:
- Following the specified Node.js and package manager requirements.
- Maintaining the monorepo structure and ticketing system.
- Providing session progress logs in `ticketing/work-in-progress/`.
- Writing Root Cause Analysis (RCA) for any critical issues or regressions.
- Following the established coding style and patterns.

### For Human Developers
While the project is AI-driven, human oversight and contributions are welcome. Human contributors should:
- Review and approve significant architectural changes (ADRs/RFCs).
- Provide clear instructions for AI agents in task descriptions.
- Ensure that the AI-first principles are maintained.

## Prerequisites

- **Node.js**: Check `.node-version` for the required version. Use `nvm` for management.
- **pnpm**: Our primary package manager.
- **Docker**: For running services and tests. Ensure your user has permissions to the Docker daemon:
  ```bash
  sudo usermod -aG docker $USER
  newgrp docker
  ```
  *Note: Running `newgrp docker` fixes it for the current shell session. For a permanent fix, you may need to log out and back in.*

## Development Workflow

1. **Pick a Task**: Tasks are tracked in **[FEATURES.md](ticketing/FEATURES.md)**.
2. **Create a Session**: Start an agent session and document it in `ticketing/work-in-progress/`.
3. **Implement & Test**: Follow the standard development lifecycle. Every change must be verified with tests.
4. **Update Ticketing**: Mark the feature as "Done" in the ticketing system and provide a summary of the changes.

## License

This project is proprietary and confidential. See **[LICENSE.md](LICENSE.md)** for more details.
