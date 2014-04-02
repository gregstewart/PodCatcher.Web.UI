describe('APPLICATION ROUTER', function () {
  beforeEach(function () {
    var vent = _.extend({}, Backbone.Events);
    this.router = new Podcatcher.ApplicationRouter({vent: vent});
    this.model = new Podcatcher.Podcast();
    this.podcastSaveViewStub = sinon.stub(Podcatcher, "PodcastSaveView").returns(new Backbone.View({model: this.model,
      vent: vent}));
  });

  afterEach(function () {
    this.podcastSaveViewStub.restore();
  });

  describe('add podcast route', function () {

    it('calls the hide all method before calling it\' s view render', function () {
      var resetViewsStub = sinon.stub(this.router, 'resetViews');

      this.router.addPodcast();

      expect(resetViewsStub.calledOnce).toBe(true);
    });

    it('sets up a model and a view when triggered', function () {
      this.router.addPodcast();
      expect(this.podcastSaveViewStub.calledOnce).toBe(true);
    });
  });

  describe('browse podcast routes', function () {
    it('calls the hide all method before calling it\' s view render', function () {
      var resetViewsStub = sinon.stub(this.router, 'resetViews');

      this.router.browse();

      expect(resetViewsStub.calledOnce).toBe(true);
    });


  });
});