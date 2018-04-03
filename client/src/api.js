import axios from 'axios';

export const apiURL = process.env.REACT_APP_API_URL || 'api'

export default () => {
  return axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'api'
  })
}
