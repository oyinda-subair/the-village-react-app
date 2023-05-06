#Stage 1
FROM node:20-alpine as builder
ENV NODE_ENV production
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install
# Copy app files
COPY . .
# Expose port
EXPOSE 3000
# Start the app
# CMD [ "yarn", "start" ]
RUN npm run dev --host

#Stage 2
# Bundle static assets with nginx
FROM nginx:1.21.0-alpine
ENV NODE_ENV production
WORKDIR /usr/share/nginx/html
RUN rm rf ./*
# Copy built assets from builder
COPY --from=builder /app/build .
# Expose port
EXPOSE 80
# Start nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]
