const shell = require('shelljs')
const sleep = require('system-sleep')
const rp = require('request-promise')

const PEER_IP = process.env.PEER_IP
const NODES_IP = process.env.NODES_IP

const post = (url, method, params) => {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      url: `http://${url}:8545`,
      body: {
        'jsonrpc': '2.0',
        'method': method,
        'params': params,
        'id': 74
      },
      json: true
    }
    rp(options)
      .then((data) => { resolve(data) })
      .catch((err) => { resolve(err) })
  })
}

const get = (url) => {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      url: `http://${url}:8545`,
      timeout: 3000,
      json: true
    }
    rp(options)
      .then((data) => { resolve(true) })
      .catch((err) => { resolve(false) })
  })
}

const main = async (nodesIP, peerIP) => {
  const nodesArray = nodesIP.split(',')
  const password = '123456'
  while (true) {
    if (await get(peerIP)) {
      const peersCount = (await post(peerIP, 'admin_peers', [])).result.length
      if (peersCount !== nodesArray.length - 1) {
        for(let index = 0; index < nodesArray.length; index++) {
          const enode = `enode://${(await post(peerIP, 'admin_nodeInfo', [])).result.id}@${peerIP}:30303`
          await post(nodesArray[index], 'admin_addPeer', [enode])
          const account = (await post(nodesArray[index], 'personal_newAccount', [password])).result
          await post(nodesArray[index], 'personal_unlockAccount', [account, password])
          await post(nodesArray[index], 'setEtherbase', account)
          await post(nodesArray[index], 'miner_start', [])
        }
      }
    }
    sleep(10000)
  }
}

main(NODES_IP, PEER_IP)