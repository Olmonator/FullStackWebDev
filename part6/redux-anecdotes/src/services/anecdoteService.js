import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const newObject = asObject(content)
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const update = async blog => {
  const url = baseUrl.concat('/', blog.id)
  const response = await axios.put(url, blog)
  return response.data
}

export default { getAll, createNew, update }