import UserActions from '../actions/UserActions';
import http from 'axios';

const UserSource = {
  fetchUsers: {
    remote() {
        return http.get('http://localhost:5000/api/users')
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

    success: UserActions.updateUsers,
    error: UserActions.usersFailed,
    loading: UserActions.fetchUsers

  }
}

module.exports = UserSource;
