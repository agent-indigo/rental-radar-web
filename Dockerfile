FROM node:lts
WORKDIR /rental-radar-web
COPY .next/standalone/. .
EXPOSE 3000
CMD ["node", "server.js"]