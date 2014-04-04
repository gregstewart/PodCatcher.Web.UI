describe('BROWSE PODCAST VIEW', function () {
  beforeEach(function () {
    this.collection = new Backbone.Collection();
    this.view = new Podcatcher.BrowsePodcastView({collection: this.collection});
  });

  describe('init view', function () {
    it('creates the base list element', function () {
      expect(this.view.el.tagName).toBe('ARTICLE');
    });

    it('the element has the right class name', function () {
      expect(this.view.el.className).toBe('podcast browse-podcasts');
    });

    describe('render template', function () {
      beforeEach(function () {
        this.podcastView = new Backbone.View();
        this.podcastView.render = function() {
          this.el = document.createElement('li');
          return this;
        };
        this.podcastViewRenderSpy = sinon.spy(this.podcastView, 'render');
        this.podcastViewStub = sinon.stub(Podcatcher, 'PodcastView').returns(this.podcastView);

        this.podcastOne = new Backbone.Model({id: 1});
        this.podcastTwo = new Backbone.Model({id: 2});
        this.podcastThree = new Backbone.Model({id: 3});

        this.view.collection = new Backbone.Collection([
          this.podcastOne,
          this.podcastTwo,
          this.podcastThree
        ]);

        this.view.render();
      });

      afterEach(function () {
        this.podcastViewStub.restore();
      });

      it('inserts a ul element into the article element', function () {
        expect($(this.view.el).find('ul').length).toBe(1);
      });

      it('creates a podcast view for each item in the collection', function () {
        expect(this.podcastViewStub.calledThrice).toBe(true);
        expect(this.podcastViewStub.calledWith({model:this.podcastOne}));
        expect(this.podcastViewStub.calledWith({model:this.podcastTwo}));
        expect(this.podcastViewStub.calledWith({model:this.podcastThree}));
      });

      it('renders a podcast view', function () {
        expect(this.podcastView.render.calledThrice).toBe(true);
      });

      it('appends the podcast to the podcast list', function() {
        expect($(this.view.el).find('ul.podcasts').children().length).toEqual(3);
      });
    });
  });
});