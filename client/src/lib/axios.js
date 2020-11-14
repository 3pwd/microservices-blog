import axios from 'axios'

// eslint-disable-next-line
export default port => axios.create({ baseURL: `http://localhost:${port}/` })
