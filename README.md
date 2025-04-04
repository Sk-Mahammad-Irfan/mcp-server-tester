# Project Setup Guide

This guide will walk you through the process of setting up both the backend and frontend for the project.

## Step 1: Setting up the Backend

1. Navigate to the `backend` directory.

    ```bash
    cd backend
    ```

2. Install the required dependencies by running the following command:

    ```bash
    npm install
    ```

3. Create a `.env` file in the `backend` folder and add the following environment variables:

    ```env
    PORT=5000
    FRONTEND_URL=http://localhost:5173
    ```

4. To run the server, use the following command:

    ```bash
    npm run dev
    ```

    The server will now be running at `http://localhost:5000`.

---

## Step 2: Setting up the Frontend

1. Navigate to the `frontend` directory.

    ```bash
    cd frontend
    ```

2. Install the required dependencies by running:

    ```bash
    npm install
    ```

3. Create a `.env` file in the `frontend` folder and add the following environment variable:

    ```env
    VITE_BACKEND_URL=http://localhost:5000
    ```

4. To run the client, use the following command:

    ```bash
    npm run dev
    ```

    The client will now be running at `http://localhost:5173`.

---

## Additional Information

- Ensure that both the backend and frontend are running simultaneously.
- You can test the full application by visiting `http://localhost:5173` in your browser after both the backend and frontend servers are up and running.

---

# MCP Server Check API

This is a simple Node.js Express endpoint that checks the availability of an MCP server by querying the `https://registry.smithery.ai/servers/{installationCode}` endpoint using the `installationCode` provided in the request body. The server responds with either a success message and server data or an error message if the connection fails.

## Endpoint

**POST** `/test-server`

### Request Body

```json
{
  "installationCode": "your-installation-code"
}
```

### Response

```json
{
  "success": true,
  "message": "MCP Server is reachable",
  "data": {
    "qualifiedName": "server-qualified-name",
    "displayName": "Server Display Name",
    "deploymentUrl": "https://deployment-url.com",
    "connections": [
      {
        "type": "http",
        "url": "https://connection-url.com",
        "configSchema": {}
      }
    ]
  }
}
```
# For more information
For more detailed information, visit the [Smithery Registry Documentation](https://smithery.ai/docs/registry#get-server).

---