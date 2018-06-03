import axios from 'axios';

export const apiURL = process.env.REACT_APP_API_URL || ''

export default () => {
    return axios.create({
        baseURL: process.env.REACT_APP_API_URL || ''
    })
}
