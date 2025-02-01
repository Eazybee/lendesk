# Lendesk Project

![NestJS](https://img.shields.io/badge/NestJS-7E1E9C?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

## Description

Lendesk is a server-side application built using the [NestJS](https://nestjs.com/) framework and TypeScript. This project is designed to be efficient, scalable, and maintainable, leveraging modern development practices.

## Project Structure

The project follows a standard NestJS structure:

- **src/**: Contains the main source code of the application.

- **Dockerfile**: Instructions to build the Docker image.
- **docker-compose.yml**: Configuration for Docker services.
- **.env.sample**: Sample environment variables file.
- **.gitignore**: Specifies files to be ignored by Git.
- **.prettierrc**: Configuration for Prettier code formatting.
- **eslint.config.mjs**: Configuration for ESLint.
- **nest-cli.json**: Configuration for Nest CLI.
- **package.json**: Contains project metadata and dependencies.
- **tsconfig.json**: TypeScript configuration file.
- **tsconfig.build.json**: TypeScript build configuration.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or later)
- [npm](https://www.npmjs.com/) (version 6 or later)
- [Docker](https://www.docker.com/) (using Docker)

### Installation

### Using Docker

To run the application using Docker:
1. **Create `.env` from `.env.example`

2. **Build the Docker image:**

   ```bash
   docker build -t lendesk-app .
   ```

3. **Run the Docker container:**  for development

   ```bash
   docker-compose --profile dev up --build
   ```

## Features
- Redis for Datastorage
- Endpoint
  - /api/v1   Api Swagger Documentation
  - /api/v1/auth/register To register new user
  - /api/v1/auth/login    To login a user
- Endpoint schema authentication
- Rate limiting and helmet 
- Password Salting and Hashing using bcrypt
- Jwt token generation
- Cors implemented
- Uniform structured API response
- Error Logging


## Future Implementation
 - connfigure cors to private client address
 - add csrf 
 - add jwt to cookie not readable by client
 - use the nest configuration technique


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

