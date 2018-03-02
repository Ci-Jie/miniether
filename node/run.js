const shell = require('shelljs')
const rp = require('request-promise')

const WS_SECRET = process.env.WS_SECRET
const NODE_IP = process.env.NODE_IP
const INSTANCE_NAME = process.env.INSTANCE_NAME
const NETSTAT_IP = process.env.NETSTAT_IP

const init = async () => {
  await shell.exec(`geth --datadir /eth-net-intelligence-api/Eth-compose/node/data init genesis.json`)
}

const setNodeConf = async (nodeIP, instanceName, netstatIP, WSSecret) => {
  await shell.sed('-i', 'localhost', nodeIP, '/eth-net-intelligence-api/app.json')
  await shell.sed('-i', `"INSTANCE_NAME"   : ""`, `"INSTANCE_NAME"   : "${instanceName}"`, '/eth-net-intelligence-api/app.json')
  await shell.sed('-i', 'wss://rpc.ethstats.net', `http://${netstatIP}:3000`, '/eth-net-intelligence-api/app.json')
  await shell.sed('-i', 'see http://forum.ethereum.org/discussion/2112/how-to-add-yourself-to-the-stats-dashboard-its-not-automatic', WSSecret, '/eth-net-intelligence-api/app.json')
  await shell.cd('/eth-net-intelligence-api')
  await shell.exec('pm2 start app.json')
}

const startNode = async (WSSecret) => {
  await shell.exec(`geth --datadir /eth-net-intelligence-api/Eth-compose/node/data --nodiscover --networkid ${WSSecret} --port 30303 --rpc --rpcapi "admin,db,eth,net,web3,personal,miner" --rpcaddr 0.0.0.0 --ws --wsaddr=0.0.0.0`)
}

const main = async () => {
  await init()
  await setNodeConf(NODE_IP, INSTANCE_NAME, NETSTAT_IP, WS_SECRET)
  await startNode(WS_SECRET)
}

main()