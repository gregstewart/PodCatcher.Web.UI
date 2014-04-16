$(document).ready(function() {
  $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
    if (!options.crossDomain) {
      options.crossDomain = true;
    }

//    if (!options.xhrFields) {
//      options.xhrFields = {withCredentials:true};
//    }
  });

  var vent = _.extend({}, Backbone.Events);
  new Podcatcher.ApplicationRouter({vent: vent});
  Backbone.history.start();
});
