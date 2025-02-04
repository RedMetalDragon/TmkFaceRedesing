# Stage 1: Build the React application
FROM node:lts-alpine AS build-stage
WORKDIR /app
COPY package.json  yarn.lock ./
RUN yarn install --network-timeout 1000000

# Copy the environment variables


ARG VITE_APP_HOMEPAGE
ENV VITE_APP_HOMEPAGE=$VITE_APP_HOMEPAGE

ARG VITE_APP_VERSION
ENV VITE_APP_VERSION=$VITE_APP_VERSION

ARG VITE_TMK_GATEWAY_URL
ENV VITE_TMK_GATEWAY_URL=$VITE_TMK_GATEWAY_URL

ARG VITE_APP_STRIPE_PUBLISHABLE_KEY
ENV VITE_APP_STRIPE_PUBLISHABLE_KEY=$VITE_APP_STRIPE_PUBLISHABLE_KEY

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
