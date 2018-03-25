import axios from 'axios';

export const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

export default () => {
  return axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000'
  })
}
