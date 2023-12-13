FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY --chown=node:node . .
RUN npm run build
EXPOSE 3000

ENV HOST=0.0.0.0 PORT=3000

CMD ["node", "dist/app.js"]