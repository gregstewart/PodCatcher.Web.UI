describe('APPLICATION ROUTER', function () {
  beforeEach(function () {
    this.vent = { bind: function () {}};
    this.router = new Podcatcher.ApplicationRouter({vent: this.vent});
  });


  describe('add podcast route', function () {

    it('calls the hide all method before calling it\' s view render', function () {
      var resetViewsStub = sinon.stub(this.router, 'resetViews');

      this.router.addPodcast();

      expect(resetViewsStub.calledOnce).toBe(true);
    });

    it('sets up a model and a view when triggered', function () {
      var model = new Backbone.Model(),
          podcastStub = sinon.stub(Podcatcher, 'Podcast').returns(model),
          podcastSaveViewStub = sinon.stub(Podcatcher, "PodcastSaveView").returns(new Backbone.View());

      this.router.addPodcast();

      expect(podcastSaveViewStub.calledOnce).toBe(true);
      expect(podcastSaveViewStub.calledWithMatch({model: model, vent: this.vent})).toBe(true);

      podcastSaveViewStub.restore();
      podcastStub.restore();
    });
  });

  describe('browse podcast routes', function () {
    it('calls the hide all method before calling it\' s view render', function () {
      var resetViewsStub = sinon.stub(this.router, 'resetViews');

      this.router.browse();

      expect(resetViewsStub.calledOnce).toBe(true);
    });

    it('sets up the browse view', function () {
      var collection = new Backbone.Collection();
      var collectionStub = sinon.stub(collection, 'fetch').returns(null);
      var PodcastCollectionStub = sinon.stub(Podcatcher, "PodcastCollection").returns(collection);
      var browsePodcastViewStub = sinon.stub(Podcatcher, "BrowsePodcastView").returns(new Backbone.View());

      this.router.browse();

      expect(PodcastCollectionStub.calledOnce).toBe(true);
      expect(browsePodcastViewStub.calledOnce).toBe(true);
      expect(browsePodcastViewStub.calledWith({collection: collection})).toBe(true);
      expect(collectionStub.calledOnce).toBe(true);

      PodcastCollectionStub.restore();
      browsePodcastViewStub.restore();
    });
  });
});