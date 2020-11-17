import axios from 'axios'

// eslint-disable-next-line
export default (hostname, port) =>
  axios.create({ baseURL: `http://${hostname}:${port}` })
