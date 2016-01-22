'use strict';

jQuery('.form-addGroup').submit(function(e) {
    e.preventDefault();
    var groupName_ = jQuery('#addGroup-name').val();
    if (groupName_) {
        var data = {
            groupName: groupName_
        };
        tools.request('/group/create', data, function(msg) {
            if (msg.msg === 'ok') {
                toastr.success('Group ' + groupName_ + ' created !', 'Creation success');
            } else {
                toastr.error(msg.msg, 'Error');
            }
            tools.redirect('/user/account');
        }, function(err) {
            toastr.error(err, 'Unexpected error');
        });
    } else {
        toastr.warning('Name empty', 'Please fill all fields');
    }
});

jQuery('.form-modify-group').submit(function(e) {
    e.preventDefault();
    var groupNameModify_ = jQuery('#groupNameModify-group').val();
    var groupName_ = jQuery('#groupName-group').val();
    var data = {
        groupName: groupName_,
        groupNameModify: groupNameModify_
    };

    tools.request('/group/change-info', data, function(msg) {
        if (msg.msg === 'ok') {
            toastr.success('All changes saved', 'Success');
            location.reload();
        }else {toastr.error('fail');}
    }, function() {
    });
});

jQuery('#removeGroup').on('click', function(e) {
    e.preventDefault();
    var groupID_ = jQuery(this).attr('data-group-id');
    if (groupID_) {
        var data = {
            groupID: groupID_
        };
        tools.request('/group/deleteGroup', data, function(msg) {
            if(msg.msg==='ok'){
                toastr.success('You removed the group !', 'Remove success');
                tools.redirect('/user/account');
            } else {
                toastr.error(msg.msg, 'Error');
            }
        }, function(err) {
            toastr.error(err, 'Unexpected error');
        });
    }
});

jQuery('.form-addDevicetoGroup').submit(function(e) {
    e.preventDefault();
    var deviceID_ = jQuery('#addDevicetoGroup-deviceId').val();
    var groupID_ = jQuery('#addDevicetoGroup-groupId').val();
    if (deviceID_ && groupID_) {
        var data = {
            groupID: groupID_,
            deviceID: deviceID_
        };
        tools.request('/group/add-device', data, function(msg) {
            console.log(msg);
            toastr.success('You add a new device to the group','Add success');
            tools.redirect('/group/view/'+groupID_);
        }, function(err) {
            console.log(err);
            toastr.error(err, 'Unexpected error');
        });
    }
});

jQuery('.removeDeviceFromGroup').on('click', function(e)  {
    e.preventDefault();
    var deviceID_ = jQuery(this).attr('data-device-id');
    var groupID_ = jQuery(this).attr('data-group-id');
    if (deviceID_ && groupID_) {
        var data = {
            groupID: groupID_,
            deviceID: deviceID_
        };
        tools.request('/group/remove-device', data, function(msg) {
            console.log(msg);
            toastr.success('You removed a device from the group','Remove success');
            tools.redirect('/group/view/'+groupID_);
        }, function(err) {
            console.log(err);
            toastr.error(err, 'Unexpected error');
        });
    } else {
        toastr.error('Unexpected error');
    }
});

jQuery('#activateGroup').on('click', function(e) {
    e.preventDefault();
    var groupID_ = jQuery(this).attr('data-group-id');
    if (groupID_){
        var data = {
            groupID: groupID_
        };
        tools.request('/group/activate', data, function(msg) {
            toastr.success('You activated the group', 'Activate success');
            console.log(msg);
            location.reload();
        }, function(err) {
            toastr.error(err, 'Unexpected error');
            console.log(err);
        });
    }
});

jQuery('#desactivateGroup').on('click', function(e) {
    e.preventDefault();
    var groupID_ = jQuery(this).attr('data-group-id');
    if (groupID_) {
        var data = {
            groupID: groupID_
        };
        tools.request('/group/desactivate', data, function(msg) {
            toastr.success('You deactivated the group', 'Desactivate success');
            console.log(msg);
            location.reload();
        }, function(err) {
            toastr.error(err, 'Unexpected error');
            console.log(err);
        });
    }
});