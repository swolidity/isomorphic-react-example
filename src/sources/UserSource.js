import UserActions from '../actions/UserActions';
import http from 'axios';

const UserSource = {
  fetchUser: {
    remote(state, username) {
      return http.get('/api/users/' + username)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return Promise.reject(err.data);
        });
    },

    local() {
      return null;
    },

    success: UserActions.updateUser,
    loading: UserActions.fetchUser,
    error: UserActions.userFailed
  }
}

module.exports = UserSource;
