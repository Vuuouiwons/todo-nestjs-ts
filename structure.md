## Project Architecture Overview

This project follows a **Modular Architecture** designed for scalability and maintainability. It utilizes high-level separation between shared logic (`common`), standalone libraries (`libs`), and domain-specific business logic (`modules`).

---

## Directory Breakdown

### 1. Root Files (`/src`)

* **`main.ts`**: The entry point of the application. Handles the initialization of the NestJS factory and global configurations.
* **`app.module.ts`**: The root module that orchestrates the entire application by importing all other modules.
* **`app.controller.ts` & `app.service.ts**`: Basic boilerplate components (often used for health checks).

### 2. Core Directories

| Folder                   | Purpose                                                                                                                                          |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`common/`**            | Contains shared code used across the entire application, including database providers, global constants, and shared entities (Todo, User, etc.). |
| **`libs/`**              | House for internal libraries or wrappers for third-party services (e.g., JWT handling and Security/Hashing logic).                               |
| **`modules/`**           | Houses modular business services and background logic that support the application without exposing direct public endpoints.                     |
| **`modules/resources/`** | The public-facing entry points of the application, organized by domain resources to handle RESTful request/response cycles.                      |
### 3. Request Lifecycle & Utilities

These directories follow the standard NestJS request/response pipeline:

* **`middlewares/`**: Basic request logging and pre-processing.
* **`guards/`**: Authentication (`auth.guard`) and Authorization (`role.guard`) logic.
* **`interceptors/`**: Data transformation and identity context mapping.
* **`pipes/`**: Validation logic for incoming request payloads (DTOs).
* **`filters/`**: Global exception handling to ensure consistent API error responses.

---

## Module Internal Structure

Each resource within `modules/resources/` follows a strict sub-structure to maintain clean code:

```text
feature/
├── dto/            # Data Transfer Objects for request validation
├── interfaces/     # TypeScript types and interfaces
├── repository/     # Data Access Layer (Abstraction over the database)
├── *.controller.ts # Route handlers and request mapping
├── *.service.ts    # Business logic layer
└── *.module.ts     # Feature encapsulation

```

---

## Testing Strategy

The project adopts a **Co-located Testing** strategy. Every functional file (Service, Controller, Repository, Pipe) is accompanied by a `.spec.ts` file in the same directory. This ensures high test coverage and makes unit testing easier to manage as the project grows.

---

## Data Flow

1. **Incoming Request** -> `Middleware` -> `Guard` -> `Interceptor` -> `Validation Pipe`.
2. **Execution** -> `Controller` -> `Service` -> `Repository` -> `Database`.
3. **Outgoing Response** -> `Interceptor` (Transformation) -> `Exception Filter` (if error).

---

> **Note:** For shared utility functions, refer to `common/utils`. For specific database entities, refer to `common/database`.
