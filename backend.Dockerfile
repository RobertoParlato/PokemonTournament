FROM node:13-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY ./backend ./
RUN npm install --silent
RUN npm install --save-dev babel-plugin-transform-runtime
RUN npm run clean && npm run build

CMD npm run serve

EXPOSE 3001