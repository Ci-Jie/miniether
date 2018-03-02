FROM ubuntu:16.04

MAINTAINER CiJie.Li(cjlee8110@gmail.com)

USER root

ARG PEER_IP
ARG NODES_IP

ENV PEER_IP="$PEER_IP"
ENV NODES_IP="$NODES_IP"

RUN apt-get update && \
	apt-get install -y git curl && \
	curl -sL https://deb.nodesource.com/setup_7.x | bash - && \
	apt-get install nodejs && \
	npm install && \
	git clone http://git.nutc-imac.com/cjlee8110/Eth-compose.git && \
	cd /Eth-compose/monitor && \
	npm install

WORKDIR /Eth-compose/monitor

ENTRYPOINT ["npm", "run", "start"]
