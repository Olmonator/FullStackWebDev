import axios from 'axios'
const baseUrl = '/api/users'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getUser = (id) => {
  const Url = baseUrl + id
  const request = axios.get(Url)
  return request.then(response => response.data)
}

export default { getAll, getUser }