import UserActions from '../actions/UserActions';
import http from 'axios';

let users = [
  { id: 1, name: 'Andy Kay' },
  { id: 2, name: 'Jerry Seinfeld' },
  { id: 3, name: 'George Costanza' },
  { id: 4, name: 'Elaine Benes' },
  { id: 5, name: 'Cosmo Kramer' },
];

const UserSource = {

  fetchUsers() {

    return {
      remote() {

          return http.get('http://localhost:5000/api/users')
            .then((res) => {
              return res.data;
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
}

module.exports = UserSource;
