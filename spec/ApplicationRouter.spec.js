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
      var browsePodcastViewStub = sinon.stub(Podcatcher, "PodcastListView").returns(new Backbone.View());

      this.router.browse();

      expect(browsePodcastViewStub.calledOnce).toBe(true);
      expect(browsePodcastViewStub.calledWith({collection: this.router.collection})).toBe(true);
      expect(collectionStub.calledOnce).toBe(true);

      browsePodcastViewStub.restore();
    });
  });

  describe('podcast detail route', function () {
    beforeEach(function () {
      this.id = 1;
      this.model = new Backbone.Model({Id: this.id});
      this.model.fetch = function (id) {
        return new Backbone.Model({Id: id});
      };
      this.view = new Backbone.View();
      this.podcastStub = sinon.stub(Podcatcher, 'Podcast').returns(this.model);
      this.podcastDetailViewStub = sinon.stub(Podcatcher, 'PodcastDetailView').returns(this.view);
      this.view.render = sinon.spy();
      this.router.collection.add(this.model);
    });

    afterEach(function () {
      this.podcastDetailViewStub.restore();
      this.podcastStub.restore();
    });

    it('calls the hide all method before calling it\' s view render', function () {
      var resetViewsStub = sinon.stub(this.router, 'resetViews');

      this.router.podcastDetail(this.id);

      expect(resetViewsStub.calledOnce).toBe(true);
    });

    it('finds the model requested and sets up the view when triggered', function () {

      this.router.podcastDetail(this.id);

      expect(this.podcastDetailViewStub.calledOnce).toBe(true);
      expect(this.podcastDetailViewStub.calledWith({model: this.model})).toBe(true);
      expect(this.view.render.called).toBe(true);

    });

    it('should fetch the model if it\' not in the collection', function () {
      var modelFetchSpy = sinon.spy(this.model, 'fetch');
      this.router.collection.reset();

      this.router.podcastDetail(this.id);

      expect(this.model.fetch.called).toBe(true);
    });

    it('sets up the episode collection, fetches the episodes and creates the episode view', function () {
      this.router.episodeCollection = new Backbone.Collection();
      this.router.episodeCollection.fetch = function (id) {
        return this;
      };
      var episodeFetchSpy = sinon.spy(this.router.episodeCollection, 'fetch'),
          episodeCollectionStub = sinon.stub(Podcatcher, 'EpisodeCollection').returns(this.router.episodeCollection),
          episodesViewStub = sinon.stub(Podcatcher, "EpisodeListView").returns(new Backbone.View());

      this.router.podcastDetail(this.id);

      expect(episodeFetchSpy.called).toBe(true);
      expect(episodesViewStub.calledOnce).toBe(true);
      expect(episodesViewStub.calledWith({collection: this.router.episodeCollection})).toBe(true);


      episodeCollectionStub.restore();
      episodeFetchSpy.restore();
      episodesViewStub.restore();
    });
  });

  describe('episode detail route', function () {
    beforeEach(function () {
      this.id = 1;
      this.model = new Backbone.Model({Id: this.id});
      this.view = new Backbone.View();
      this.modelStub = sinon.stub(Podcatcher, 'Episode').returns(this.model);
      this.viewStub = sinon.stub(Podcatcher, 'EpisodeDetailView').returns(this.view);
      this.view.render = sinon.spy();
      this.router.episodeCollection.add(this.model);
    });

    afterEach(function () {
      this.modelStub.restore();
      this.viewStub.restore();
    });

    it('calls the hide all method before calling it\' s view render', function () {
      var resetViewsStub = sinon.stub(this.router, 'resetViews');

      this.router.episodeDetail(this.id);

      expect(resetViewsStub.calledOnce).toBe(true);
    });

    it('finds the model requested and sets up the view when triggered', function () {

      this.router.episodeDetail(this.id);

      expect(this.viewStub.calledOnce).toBe(true);
      expect(this.viewStub.calledWith({model: this.model})).toBe(true);
      expect(this.view.render.called).toBe(true);

    });
  });
});