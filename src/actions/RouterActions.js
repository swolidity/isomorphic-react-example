import alt from '../alt';

class RouterActions {

  changeRoute(state) {
    this.dispatch(state);
  }

  updateNextPath(nextPath) {
    this.dispatch(nextPath);
  }
}

module.exports = alt.createActions(RouterActions);
