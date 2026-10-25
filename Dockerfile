FROM node:lts
WORKDIR /rental-radar-web
COPY .next/standalone/. .
COPY .next/static/. ./.next/static/
RUN npx auth migrate
EXPOSE 3000
CMD ["node", "server.js"]