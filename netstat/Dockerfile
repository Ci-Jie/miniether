FROM alpine:3.5

USER root

ARG WS_SECRET

ENV WS_SECRET="$WS_SECRET"

RUN apk update && \
    apk add --update git nodejs && \
    git clone https://github.com/cubedro/eth-netstats

WORKDIR eth-netstats

RUN npm install && \
    npm install -g grunt-cli && \
    grunt

EXPOSE 3000

ENTRYPOINT ["npm", "start"]