describe('PODCAST DETAIL VIEW', function () {
  beforeEach(function () {
    this.model = new Backbone.Model();
    this.view = new Podcatcher.PodcastDetailView({model: this.model});
  });

  describe('init view', function () {
    it('creates the base list element', function () {
      expect(this.view.el.tagName).toBe('ARTICLE');
    });

    it('the element has the right class name', function () {
      expect(this.view.el.className).toBe('podcast podcast-details');
    });

    it('sets the model to the one passed in', function () {
      expect(this.view.model).toBe(this.model);
    });
  });

  describe('render podcast details', function () {
    beforeEach(function () {
      this.podcastView = new Backbone.View();
      this.podcastView.render = function () {
        this.el = document.createElement('div');
        return this;
      };
      this.podcastViewRenderSpy = sinon.spy(this.podcastView, 'render');
      this.podcastViewStub = sinon.stub(Podcatcher, 'PodcastView').returns(this.podcastView);

      this.podcastOne = new Backbone.Model({id: 1});
      this.view.model = this.podcastOne;
      this.view.render();
    });

    afterEach(function () {
      this.podcastViewStub.restore();
    });

    it('injects the PodcastView into the page', function () {
      expect(this.podcastViewStub.calledOnce).toBe(true);
      expect(this.podcastViewStub.calledWith({model: this.podcastOne}));
      expect(this.podcastView.render.called).toBe(true);
    });
  });
});