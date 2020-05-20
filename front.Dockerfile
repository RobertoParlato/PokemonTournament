FROM node:13-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY ./frontend ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g 
RUN npm install serve -g
RUN npm run build --production.

CMD serve -l 3000 -s build

EXPOSE 3000