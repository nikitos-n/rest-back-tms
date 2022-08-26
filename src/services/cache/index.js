const { createClient } = require('redis')
const { REDIS_HOST, REDIS_PORT } = process.env

const client = createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
})

client.on('error', (err) => console.log('Redis Client Error', err))

module.exports = async () => {
  if (!client.isReady) {
    await client.connect()
  }
  return client
}
