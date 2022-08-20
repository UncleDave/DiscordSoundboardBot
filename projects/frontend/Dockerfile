FROM alpine:3.15 as builder
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
RUN apk add yarn
WORKDIR app/
COPY package.json yarn.lock tsconfig.json ./
WORKDIR projects/frontend
COPY projects/frontend/package.json ./
COPY projects/frontend/src/ src/
COPY projects/frontend/public/ public/
WORKDIR ../frontend
RUN yarn --pure-lockfile

FROM alpine:3.15
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
EXPOSE 80
RUN apk add yarn
COPY --from=builder app/ app/
WORKDIR app/projects/frontend
ENTRYPOINT ["yarn", "run", "start"]
