describe('Podcast Save View', function () {
  beforeEach(function () {
    this.vent = _.extend({}, Backbone.Events);
    this.model = new Backbone.Model();
    this.view = new Podcatcher.PodcastSaveView({model: this.model, vent: this.vent});
    sinon.stub(this.view, 'podcastAdded');
    sinon.stub(this.view, 'savePodcast');
    sinon.stub(this.model, 'save');
    sinon.stub(this.model, 'set');
  });

  afterEach(function () {
    this.view.savePodcast.restore();
    this.view.podcastAdded.restore();
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


      it('inserts a notification element', function () {
        var notification = this.view.$el.find('.notification');
        expect(notification.hasClass('hidden')).toBe(true);
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
          var notification = this.view.$el.find('.notification');

          this.model.validationError = validationError;
          this.view.$el.find('input').val('');
          this.view.$el.find('button').trigger('click');

          expect(notification.hasClass('hidden')).toBe(false);
          expect(notification.hasClass('error')).toBe(true);
          expect(notification.html()).toBe(validationError);

          this.model.isValid.restore();
          this.model.validationError = undefined;
        });
      });

      describe('podcast:added event', function () {
        it('triggers event when success handler is called', function () {
          sinon.stub(this.vent, 'trigger');
          var response = { attributes : 'attributes' };

          this.view.successHandler(response);

          expect(this.vent.trigger.called).toBe(true);
          expect(this.vent.trigger.calledWith('podcast:added', response.attributes)).toBe(true);

          this.vent.trigger.restore();
        });

        it('shows a message with a link', function () {
          var result = { "Id":"7ebdb1a0-c419-43c6-9129-4d1f8c7951ee",
                "Title":"Convert to Raid: The podcast for raiders in World of Warcraft",
                "Uri":"http://converttoraid.libsyn.com/rss",
                "Summary":"Convert to Raid examines everything about the end game in World of Warcraft.",
                "Image":"http://assets.libsyn.com/content/5472375.jpg"
              },
              notification = this.view.$el.find('.notification');

          this.vent.trigger('podcast:added', result);

          expect(notification.hasClass('hidden')).toBe(false);
          expect(notification.hasClass('success')).toBe(true);
          expect(notification.html()).toBe('Podcast '+result.Title+' added, <a href="#podcast/details/'+result.Id+'">you can view it here</a>');

        });
      });

      describe('podcast:added:fail event', function () {
        it('triggers event when error handler is called', function () {
          sinon.stub(this.vent, 'trigger');

          this.view.errorHandler();

          expect(this.vent.trigger.called).toBe(true);
          expect(this.vent.trigger.calledWith('podcast:added:fail')).toBe(true);

          this.vent.trigger.restore();
        });

        it('shows an error message', function () {
          var notification = this.view.$el.find('.notification');

          this.vent.trigger('podcast:added:fail');
          expect(notification.hasClass('hidden')).toBe(false);
          expect(notification.hasClass('error')).toBe(true);
          expect(notification.html()).toBe('Podcast not added');

        });
      });
    });

  });


});