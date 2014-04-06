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
      var collectionStub = sinon.stub(this.router.collection, 'fetch').returns(null);
      var browsePodcastViewStub = sinon.stub(Podcatcher, "BrowsePodcastView").returns(new Backbone.View());

      this.router.browse();

      expect(browsePodcastViewStub.calledOnce).toBe(true);
      expect(browsePodcastViewStub.calledWith({collection: this.router.collection})).toBe(true);
      expect(collectionStub.calledOnce).toBe(true);

      browsePodcastViewStub.restore();
    });
  });

  describe('podcast detail route', function () {

    it('calls the hide all method before calling it\' s view render', function () {
      var resetViewsStub = sinon.stub(this.router, 'resetViews');

      this.router.podcastDetail();

      expect(resetViewsStub.calledOnce).toBe(true);
    });

    it('finds the model requested and sets up the view when triggered', function () {
      var id = 1;
      var model = new Backbone.Model({Id: id}),
          podcastStub = sinon.stub(Podcatcher, 'Podcast').returns(model),
          podcastDetailViewStub = sinon.stub(Podcatcher, 'PodcastDetailView').returns(new Backbone.View());
      this.router.collection.add(model);

      this.router.podcastDetail(id);

      expect(podcastDetailViewStub.calledOnce).toBe(true);
      expect(podcastDetailViewStub.calledWith({model: model, vent: this.vent})).toBe(true);

      podcastDetailViewStub.restore();
      podcastStub.restore();
    });
  });
});