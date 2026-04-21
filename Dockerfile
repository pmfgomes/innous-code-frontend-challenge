FROM oven/bun:1-alpine

WORKDIR /app

# Copy package files
COPY package.json bun.lock* ./

# Install dependencies
RUN bun install

# Copy all local project files
COPY . .

# Accept PORT as a build argument and set it as an environment variable
ARG PORT=5173
ENV PORT=$PORT

# Expose the configured port
EXPOSE $PORT

# Allow host binding and use the provided port
CMD sh -c "bun run dev --host --port $PORT"
