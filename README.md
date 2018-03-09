# miniEther

> Use docker compose to build only one node of Ethereum

`miniEther`是一個使用 [go-ethereum](ethereum/go-ethereum) 開發單一節點的測試環境。藉由 docker-compose 使其達到快速安裝，提供初學者或開發人員快速建立測試環境。

## 快速開始

進入 `miniEther` 目錄輸入 `docker-compose up` 即可。

## 配置

預設建立兩個挖礦節點(minier node) - node-1 與 node-2，並且建立監控介面(netstat)，使用者可以根據需求任意更改環境規模。

```
version: '3'
services:
  netstat:
    build:
      context: ./netstat
      args:
        WS_SECRET: 77777
    ports:
      - "3000:3000"
    networks:
      eth_net:
        ipv4_address: 172.16.0.10
  node-1:
    build:
      context: ./node
      args:
        WS_SECRET: 77777
        PEER_IP: 172.16.0.11
        NODE_IP: 172.16.0.11
        INSTANCE_NAME: node-1
        NETSTAT_IP: 172.16.0.10
    depends_on:
      - netstat
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 500M
        reservations:
          cpus: '0.5'
          memory: 500M
    ports:
      - "30303:30303"
      - "8545:8545"
    networks:
      eth_net:
        ipv4_address: 172.16.0.11
  node-2:
    build:
      context: ./node
      args:
        WS_SECRET: 77777
        PEER_IP: 172.16.0.11
        NODE_IP: 172.16.0.12
        INSTANCE_NAME: node-2
        NETSTAT_IP: 172.16.0.10
    depends_on:
      - netstat
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 500M
        reservations:
          cpus: '0.5'
          memory: 500M
    ports:
      - "30304:30303"
      - "8546:8545"
    networks:
      eth_net:
        ipv4_address: 172.16.0.12
  monitor:
    build:
      context: ./monitor
      args:
        PEER_IP: 172.16.0.11
        NODES_IP: '172.16.0.11,172.16.0.12'
    depends_on:
      - netstat
      - node-1
    networks:
      eth_net:
        ipv4_address: 172.16.0.13
networks:
  eth_net:
    driver: bridge
    ipam:
      driver: default
      config:
      -
        subnet: 172.16.0.0/24
```


