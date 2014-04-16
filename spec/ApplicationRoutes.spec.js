describe('APPLICATION ROUTES', function () {
  beforeEach(function () {
    var vent = _.extend({}, Backbone.Events);
    this.router = new Podcatcher.ApplicationRouter({vent: vent});
    this.indexRouteStub = sinon.stub(this.router, 'index');
    this.browseRouteStub = sinon.stub(this.router, 'browse');
    this.addPodcastRouteStub = sinon.stub(this.router, 'addPodcast');
    this.podcastDetailRouteStub = sinon.stub(this.router, 'podcastDetail');
    this.episodeDetailRouteStub = sinon.stub(this.router, 'episodeDetail');
    this.resetViewsStub = sinon.stub(this.router, 'resetViews');

    Backbone.history.start({silent: true, pushState: true});
    this.router.navigate('elsewhere', {trigger: true});
  });

  afterEach(function () {
    Backbone.history.stop();
    this.indexRouteStub.restore();
    this.browseRouteStub.restore();
    this.addPodcastRouteStub.restore();
    this.podcastDetailRouteStub.restore();
    this.episodeDetailRouteStub.restore();
    this.resetViewsStub.restore();
    this.router.navigate('elsewhere', {trigger: true});
  });

  it('Has the right amount of routes', function() {
    expect(_.size(this.router.routes)).toEqual(5);
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

  describe('add-podcast route', function () {

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

  describe('podcast/detail/:id route', function () {

    it('/podcast/detail/:id - route exists and points to the right method', function () {
      expect(this.router.routes['podcast/detail/:id']).toEqual('podcastDetail');
    });

    it('calls the podcastDetail route by navigating to podcast/detail/:id ', function () {
      var self = this,
          pushStateStub = sinon.stub(window.history, 'pushState', function (data, title, url) {
            expect(url).toEqual('/podcast/detail/'+id);
            self.router.podcastDetail(id);
          }),
          viewStub = sinon.stub(Podcatcher,'PodcastDetailView').returns(new Backbone.View());
          id = 1;


      this.router.navigate('podcast/detail/'+id, {trigger: true});

      expect(pushStateStub.called).toBe(true);
      expect(this.podcastDetailRouteStub.called).toBe(true);
      expect(this.podcastDetailRouteStub.calledWith(id)).toBe(true);

      pushStateStub.restore();
      viewStub.restore();
    });
  });

  describe('episode/:id', function () {
    it('episode/:id - route exists and points to the right method', function () {
      expect(this.router.routes['episode/:id']).toEqual('episodeDetail');
    });

    it('calls the episodeDetail route by navigating to episode/:id', function () {
      var self = this,
          pushStateStub = sinon.stub(window.history, 'pushState', function (data, title, url) {
            expect(url).toEqual('/episode/'+id);
            self.router.episodeDetail(id);
          }),
          viewStub = sinon.stub(Podcatcher,'EpisodeView').returns(new Backbone.View());
      id = 1;


      this.router.navigate('episode/'+id, {trigger: true});

      expect(pushStateStub.called).toBe(true);
      expect(this.episodeDetailRouteStub.called).toBe(true);
      expect(this.episodeDetailRouteStub.calledWith(id)).toBe(true);

      pushStateStub.restore();
      viewStub.restore();
    });
  });

});