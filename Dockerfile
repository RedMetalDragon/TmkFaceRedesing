# Stage 1: Build the React application
FROM node:lts-alpine AS build-stage
WORKDIR /app
COPY package.json  yarn.lock ./
RUN yarn install --network-timeout 1000000 --verbose
ARG VITE_TMK_BACKEND_API_URL
ENV VITE_TMK_BACKEND_API_URL=$VITE_TMK_BACKEND_API_URL
COPY . .
RUN yarn build

# Install curl for health checks or minimal debugging
RUN apk add --no-cache curl

# Stage 2: Serve the application using Nginx
FROM nginx:stable-alpine AS production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy the custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
