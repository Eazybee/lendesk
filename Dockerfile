#Base
FROM node:21 AS base
WORKDIR /app
COPY package*.json ./

#Build for production
FROM base AS build
RUN npm install
COPY . .
RUN npm run build

#Development
FROM base AS development
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start:dev"]

#Production
FROM base AS production
RUN npm install --only=production
COPY . .
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main.js"]