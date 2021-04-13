FROM mhart/alpine-node:15.12

ENV NODE_ENV=production
ENV PORT=3003

COPY package*.json ./
RUN npm ci --prefer-offline --no-audit --progress=false
COPY . .
EXPOSE 3003

RUN npm run build

CMD ["npm", "start"]
