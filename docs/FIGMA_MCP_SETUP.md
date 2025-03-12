# Figma MCP Server Setup

This repository includes a Figma Model Context Protocol (MCP) server that allows AI coding tools like Cursor to access your Figma files.

## Getting a Figma API Key

1. Log in to your Figma account
2. Go to your Account Settings (click on your profile picture in the top right corner)
3. Scroll down to the "Personal access tokens" section
4. Click "Create a new personal access token"
5. Give your token a name (e.g., "MCP Server")
6. Copy the generated token (you won't be able to see it again)

## Running the Figma MCP Server

### Option 1: Using the installed server

1. Update the `.env` file in the `Figma-Context-MCP` directory with your Figma API key:
   ```
   FIGMA_API_KEY=your_figma_api_key_here
   PORT=3333
   ```

2. Start the server:
   ```bash
   cd Figma-Context-MCP
   pnpm run dev
   ```

### Option 2: Using npx (easier)

You can also run the server directly using npx:

```bash
npx figma-developer-mcp --figma-api-key=your_figma_api_key_here
```

## Connecting Cursor to the MCP Server

1. Open Cursor
2. Go to Settings (⚙️) > Features
3. Scroll down to "Model Context Protocol"
4. Add a new MCP server with the URL: `http://localhost:3333`
5. Save the settings

## Using Figma with Cursor

1. Open Cursor's composer in agent mode
2. Paste a link to a Figma file, frame, or group
   - To get a link to a specific element in Figma, select it and press `CMD + L` or right-click and select "Copy link"
3. Ask Cursor to implement the design
4. Cursor will fetch the relevant metadata from Figma and use it to write your code

## Troubleshooting

- Make sure your Figma API key has the correct permissions
- Ensure the server is running on port 3333
- Check that Cursor is properly connected to the MCP server
- Try restarting the server and Cursor if you encounter issues 