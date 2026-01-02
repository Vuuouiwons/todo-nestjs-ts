FROM node:lts-alpine3.22 AS build-app

WORKDIR /build

COPY . .

RUN npm ci

RUN npm run build

FROM node:lts-alpine3.22 AS build-dep

WORKDIR /build

COPY package.json .
COPY package-lock.json .

RUN npm ci --omit=dev

FROM node:lts-alpine3.22 AS prod

WORKDIR /app

RUN chown -R node:node /app

COPY --from=build-app --chown=node:node /build/dist /app/dist
COPY --from=build-dep --chown=node:node /build/node_modules /app/node_modules

USER node

ENTRYPOINT [ "docker-entrypoint.sh" ]

CMD [ "/app/dist/main.js" ]
