import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const likeBlog = async blog => {

  const config = {
    headers: { Authorization: token }
  }
  const url = baseUrl.concat('/', blog.id)
  const response = await axios.put(url, blog, config)
  return response.data
}

const deleteBlog = async id => {
  const config = {
    headers: { Authorization: token }
  }
  const url = baseUrl.concat('/', id)

  const response = await axios.delete(url, config)
  return response.data
}

export default { getAll, create, setToken, likeBlog, deleteBlog }