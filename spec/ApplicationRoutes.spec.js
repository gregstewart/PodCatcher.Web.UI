describe('APPLICATION ROUTES', function () {
  beforeEach(function () {
    var vent = _.extend({}, Backbone.Events);
    this.router = new Podcatcher.ApplicationRouter({vent: vent});
    this.indexRouteStub = sinon.stub(this.router, 'index');
    this.browseRouteStub = sinon.stub(this.router, 'browse');
    this.addPodcastRouteStub = sinon.stub(this.router, 'addPodcast');
    this.resetViewsStub = sinon.stub(this.router, 'resetViews');

    Backbone.history.start({silent: true, pushState: true});
    this.router.navigate('elsewhere', {trigger: true});
  });

  afterEach(function () {
    Backbone.history.stop();
    this.indexRouteStub.restore();
    this.browseRouteStub.restore();
    this.addPodcastRouteStub.restore();
    this.resetViewsStub.restore();
    this.router.navigate('elsewhere', {trigger: true});
  });

  it('Has the right amount of routes', function() {
    expect(_.size(this.router.routes)).toEqual(3);
  });

  describe('index route', function () {

    it('/ -route exists and points to the right method', function () {
      expect(this.router.routes['']).toEqual('index');
    });

    it('calls the index route by navigating to /', function () {
      var self = this,
          pushStateStub = sinon.stub(window.history, 'pushState', function (data, title, url) {
            expect(url).toEqual('/');
            self.router.index();
          });

      this.router.navigate('/', {trigger: true});
      expect(pushStateStub.called).toBe(true);
      expect(this.indexRouteStub.called).toBe(true);

      pushStateStub.restore();
    });
  });

  describe('browse route', function () {

    it('/browse - route exists and points to the right method', function () {
      expect(this.router.routes.browse).toEqual('browse');
    });

    it('calls the browse route by navigating to /browse', function () {
      var self = this,
          pushStateStub = sinon.stub(window.history, 'pushState', function (data, title, url) {
            expect(url).toEqual('/browse');
            self.router.browse();
          });

      this.router.navigate('browse', {trigger: true});
      expect(pushStateStub.called).toBe(true);
      expect(this.browseRouteStub.called).toBe(true);

      pushStateStub.restore();
    });
  });

  describe('add podcast route', function () {

    it('/add-podcast - route exists and points to the right method', function () {
      expect(this.router.routes['add-podcast']).toEqual('addPodcast');
    });

    it('calls the addPodcast route by navigating to add-podcast', function () {
      var self = this,
          pushStateStub = sinon.stub(window.history, 'pushState', function (data, title, url) {
            expect(url).toEqual('/add-podcast');
            self.router.addPodcast();
          });

      this.router.navigate('add-podcast', {trigger: true});
      expect(pushStateStub.called).toBe(true);
      expect(this.addPodcastRouteStub.called).toBe(true);

      pushStateStub.restore();
    });
  });
});