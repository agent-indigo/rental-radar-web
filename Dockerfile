FROM node:latest
WORKDIR /RentalRadar
COPY . .
RUN npm i
RUN npm cache clean -f
RUN sudo npm cache clean -f
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]