'use strict';

jQuery('.form-delete-user').submit(function(e) {
  e.preventDefault();
  var userID_ = jQuery(this).attr('data-user-id');
  var data  = {id: userID_};
  tools.request('/user/delete-user', data, function(msg) {
    if (msg.msg === 'ok') {
      tools.redirect('/home');
      toastr.success('Account delete', 'Success');
    }
  }, function() {
  });
});
