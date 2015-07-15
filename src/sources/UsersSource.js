import UsersActions from '../actions/UsersActions';
import http from 'axios';

const UsersSource = {
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

    success: UsersActions.updateUsers,
    error: UsersActions.usersFailed,
    loading: UsersActions.fetchUsers

  }
}

module.exports = UsersSource;
