import alt from '../alt';
import RouterActions from '../actions/RouterActions';

class RouterStore {
  constructor() {
    this.route = null;
    this.nextPath = null;

    this.bindListeners({
      handleChangeRoute: RouterActions.CHANGE_ROUTE,
      handleUpdateNextPath: RouterActions.UPDATE_NEXT_PATH
    });
  }

  handleChangeRoute(state) {
    this.route = state;
  }

  handleUpdateNextPath(nextPath) {
    console.log(nextPath);
    this.nextPath = nextPath;
  }

  static getRouteState() {
    const state = this.getState();
    return state.route;
  }

  static getNextPath() {
    const state = this.getState();
    return state.nextPath;
  }
}

module.exports = alt.createStore(RouterStore, 'RouterStore');
