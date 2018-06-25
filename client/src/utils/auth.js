import axios from 'axios';
export default {
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      axios.post('/auth', {email, password,})
      .then(response => {
        resolve(response.data.result)
      })
      .catch(err => {
        reject(err)
      })
    })
  },
}
