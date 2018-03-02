FROM ubuntu:16.04

MAINTAINER CiJie.Li(cjlee8110@gmail.com)

USER root

ARG WS_SECRET
ARG PEER_IP
ARG NODE_IP
ARG INSTANCE_NAME
ARG NETSTAT_IP

ENV WS_SECRET="$WS_SECRET"
ENV PEER_IP="$PEER_IP"
ENV NODE_IP="$NODE_IP"
ENV INSTANCE_NAME="$INSTANCE_NAME"
ENV NETSTAT_IP="$NETSTAT_IP"

RUN apt-get update && \
	apt-get install -y software-properties-common && \
	add-apt-repository -y ppa:ethereum/ethereum && \
	apt-get update && \
	apt-get install -y ethereum git curl && \
	curl -sL https://deb.nodesource.com/setup_7.x | bash - && \
	apt-get install nodejs && \
	npm install && \
	git clone https://github.com/cubedro/eth-net-intelligence-api && \
	cd eth-net-intelligence-api && \
	npm install && \
	npm install -g pm2 && \
	git clone http://git.nutc-imac.com/cjlee8110/Eth-compose.git && \
	cd Eth-compose/node && \
	npm install

WORKDIR /eth-net-intelligence-api/Eth-compose/node

EXPOSE 30303 8545

ENTRYPOINT ["npm", "run", "start"]
