
# Node LTS ACTIVE until Apr 2020
FROM node:8.15.0-alpine

WORKDIR /server
COPY . .

RUN npm install --production
RUN npm run build
CMD ["node", "dist/main.js"]
EXPOSE 3000

# Install development packages if NODE_ENV is set to "development"
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
RUN if [ "$NODE_ENV" == "development" ]; then npm install ; fi
