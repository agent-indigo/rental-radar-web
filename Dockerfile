FROM node:latest
WORKDIR /rental-radar-web
COPY .next/standalone/. .
EXPOSE 3000
CMD ["node", "server.js"]