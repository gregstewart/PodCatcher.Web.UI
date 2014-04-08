describe('EPISODE DETAIL VIEW', function () {
  beforeEach(function () {
    this.model = new Backbone.Model();
    this.view = new Podcatcher.EpisodeDetailView({model: this.model});
  });

  describe('init view', function () {
    it('creates the base list element', function () {
      expect(this.view.el.tagName).toBe('ARTICLE');
    });

    it('the element has the right class name', function () {
      expect(this.view.el.className).toBe('episode episode-details');
    });

    it('sets the model to the one passed in', function () {
      expect(this.view.model).toBe(this.model);
    });
  });

  describe('render episode details', function () {
    it('injects the episode view into the page', function () {
      var view = new Backbone.View();
      view.render = function () {
        this.el = document.createElement('div');
        return this;
      };
      var episodeViewStub = sinon.stub(Podcatcher, 'EpisodeView').returns(view);
      var episodeViewRenderSpy = sinon.spy(view, 'render');
      this.episode = new Backbone.Model({id: 1});
      this.view.model = this.episode;

      this.view.render();

      expect(episodeViewStub.called).toBe(true);
      expect(episodeViewStub.calledWith({model: this.episode})).toBe(true);
      expect(view.render.called).toBe(true);

      episodeViewStub.restore();
    });
  });

});