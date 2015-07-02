let router;

module.exports = {
  create(Router, options) {
    router = Router.create(options);
  },

  run(render) {
    router.run((Handler, state) => {
      render(Handler, state);
    });
  },

  getCurrentPath() {
    return router.getCurrentPath();
  },

  makePath(to, params, query) {
    return router.makePath(to, params, query);
  },

  makeHref(to, params, query) {
    return router.makeHref(to, params, query);
  },

  transitionTo(to, params, query) {
    router.transitionTo(to, params, query);
  },

  replaceWith(to, params, query) {
    router.replaceWith(to, params, query);
  },

  goBack() {
    router.goBack();
  }
};
