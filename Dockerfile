FROM node:lts
WORKDIR /rental-radar-web
COPY .next/standalone/. .
EXPOSE 443
CMD ["node", "server.js"]