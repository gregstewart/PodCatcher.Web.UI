describe('EPISODE LIST VIEW', function () {
  beforeEach(function () {
    this.collection = new Backbone.Collection();
    this.view = new Podcatcher.EpisodeListView({collection: this.collection});
  });

  describe('init view', function () {
    it('creates the base list element', function () {
      expect(this.view.el.tagName).toBe('SECTION');
    });

    it('the element has the right class name', function () {
      expect(this.view.el.className).toBe('episodes list-episodes');
    });

  });

  describe('render template', function () {
    beforeEach(function () {
      this.episodeView = new Backbone.View();
      this.episodeView.render = function () {
        this.el = document.createElement('div');
        return this;
      };
      this.episodeViewRenderSpy = sinon.spy(this.episodeView, 'render');
      this.episodeViewStub = sinon.stub(Podcatcher, 'EpisodeView').returns(this.episodeView);

      this.episodeOne = new Backbone.Model({Id: 1});
      this.episodeTwo = new Backbone.Model({Id: 2});

    });

    afterEach(function () {
      this.episodeViewStub.restore();
    });

    describe('with data', function () {

      beforeEach(function () {
        this.view.collection = new Backbone.Collection([
          this.episodeOne,
          this.episodeTwo
        ]);

        this.view.render();
      });

      afterEach(function () {
        this.view.collection.reset();
      });

      it('inserts a ul element into the article element', function () {
        expect($(this.view.el).find('ul').length).toBe(1);
      });

      it('creates a epsiode view for each item in the collection', function () {
        expect(this.episodeViewStub.calledTwice).toBe(true);
        expect(this.episodeViewStub.calledWith({model: this.episodeOne}));
        expect(this.episodeViewStub.calledWith({model: this.episodeTwo}));
      });

      it('renders a episode view', function () {
        expect(this.episodeView.render.calledTwice).toBe(true);
      });

      it('appends the episode to the episode list', function () {
       expect($(this.view.el).find('ul.episodes').children().length).toEqual(2);
      });

      it('has a link to the episode detail view', function () {
        var hyperLink = $(this.view.el).find('ul > li > a');

        expect(hyperLink.length).toBe(2);
        expect($(hyperLink[0]).attr('href')).toBe('#episode/1');
      });
    });

    describe('without data', function () {
      beforeEach(function () {
        this.view.collection = new Backbone.Collection();

        this.view.render();
      });

      it('does not create a ul element', function () {
        expect($(this.view.el).find('ul').length).toBe(0);
      });

      it('instead create a notification element', function () {
        var notification = this.view.$el.find('.notification');

        expect(notification.length).toBe(1);
        expect(notification.html()).toBe('No episodes found');
      });
    });
  });

});