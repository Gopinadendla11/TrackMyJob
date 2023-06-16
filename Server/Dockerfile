FROM node:20-alpine

COPY ./trackmyjob_api /trackmyjob/server/

WORKDIR /trackmyjob/server/

RUN npm install

CMD ["node","app.js"]