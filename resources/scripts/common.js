'use strict';

toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: 'toast-bottom-right',
  preventDuplicates: false,
  onclick: null,
  showDuration: 300,
  hideDuration: 1000,
  timeOut: 5000,
  extendedTimeOut: 1000,
  showEasing: 'swing',
  hideEasing: 'swing',
  showMethod: 'slideDown',
  hideMethod: 'slideUp'
};

jQuery(document).on('ready', function() {
  var navpos = jQuery('#navbar-id').offset();
  jQuery(window).bind('scroll', function() {
    if (jQuery(window).scrollTop() > navpos.top) {
      jQuery('#navbar-id').addClass('navbar-fixed');
    } else {
      jQuery('#navbar-id').removeClass('navbar-fixed');
    }
  });
});

var tools = {
  request: function() {
    if (arguments.length === 4) {
      this.reqPost(arguments[0], arguments[1], arguments[2], arguments[3]);
    } else {
      this.reqGet(arguments[0], arguments[1], arguments[2]);
    }
  },
  reqPost: function(url, data, done, err) {
    jQuery.ajax({
      url: url,
      method: 'POST',
      dataType: 'json',
      data: data,
      success: done,
      error: err
    });
  },
  reqGet: function(url, done) {
    console.log(url + done);
  },
  redirect: function(url) {
    setTimeout(function() {
      window.location = url;
    }, 1000);
  }
};
