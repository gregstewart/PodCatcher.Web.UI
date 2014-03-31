describe('Podcast Save View', function () {
  beforeEach(function () {
    this.model = new Backbone.Model();
    this.view = new Podcatcher.PodcastSaveView({model: this.model});
    sinon.stub(this.view, 'savePodcast');
    sinon.stub(this.model, 'save');
    sinon.stub(this.model, 'set');

  });

  afterEach(function () {
    this.view.savePodcast.restore();
    this.model.save.restore();
    this.model.set.restore();
  });

  describe('init view', function () {
    it('creates an article element element', function () {
     expect(this.view.el.tagName).toBe('ARTICLE');
    });

    it('the form element has the right class name', function () {
      expect(this.view.el.className).toBe('podcast add-podcast');
    });

    describe('render template', function () {
      beforeEach(function () {
        this.view.render();
      });

      it('inserts a form into the article element', function () {
         expect($(this.view.el).find('form').length).toBe(1);
      });

      it('inserts an input field into the form element', function () {
         expect(this.view.$el.find('input').length).toBe(1);
      });


      it('inserts an input field into the form element', function () {
        var error = this.view.$el.find('.error');
        expect(error.hasClass('hidden')).toBe(true);
      });

      describe('click event', function () {

        it('sets and saves the podcast', function () {
          var uri = 'http://localhost/';
          this.view.$el.find('input').val(uri);
          this.view.$el.find('button').trigger('click');
          expect(this.model.set.calledOnce).toBe(true);
          expect(this.model.set.calledWith({Uri: uri})).toBe(true);
          expect(this.model.save.calledOnce).toBe(true);
        });

        it('shows an error message if validation fails', function () {
          sinon.stub(this.model, 'isValid').returns(false);
          var validationError = 'something';
          var error = this.view.$el.find('.error');

          this.model.validationError = validationError;
          this.view.$el.find('input').val('');
          this.view.$el.find('button').trigger('click');

          expect(error.hasClass('hidden')).toBe(false);
          expect(error.html()).toBe(validationError);

          this.model.isValid.restore();
          this.model.validationError = undefined;
        });
      });
    });
  });
});