'use strict';

jQuery('#activateDevice').on('click', function(e) {
    e.preventDefault();
    var deviceID_ = jQuery(this).attr('data-device-id');
    if (deviceID_){
        var data = {
            deviceID: deviceID_
        };
        tools.request('/device/activate', data, function(msg) {
            toastr.success('You activated the device', 'Activate success');
            console.log(msg);
            location.reload();
        }, function(err) {
            toastr.error(err, 'Unexpected error');
            console.log(err);
        });
    }
});

jQuery('#desactivateDevice').on('click', function(e) {
    e.preventDefault();
    var deviceID_ = jQuery(this).attr('data-device-id');
    if (deviceID_) {
        var data = {
            deviceID: deviceID_
        };
        tools.request('/device/desactivate', data, function(msg) {
            toastr.success('You deactivated the device', 'Desactivate success');
            console.log(msg);
            location.reload();
        }, function(err) {
            toastr.error(err, 'Unexpected error');
            console.log(err);
        });
    }
});

jQuery('#removeDevice').on('click', function(e) {
    e.preventDefault();
    var deviceUID_ = jQuery(this).attr('data-device-id');
    if (deviceUID_) {
        var data = {
            deviceUID: deviceUID_
        };
        tools.request('/device/remove', data, function(msg) {
            if(msg.msg==='ok'){
                toastr.success('You removed the device '+deviceUID_, 'Remove success');
                tools.redirect('/device/all');
            } else {
                toastr.error(msg.msg, 'Error');
            }
        }, function(err) {
            toastr.error(err, 'Unexpected error');
        });
    }
});

jQuery('.form-addDevice').submit(function(e) {
    e.preventDefault();
    var deviceUID_ = jQuery('#addDevice-UID').val();
    var deviceName_ = jQuery('#addDevice-name').val();
    if (deviceUID_ && deviceName_) {
        var data = {
            deviceUID: deviceUID_,
            deviceName: deviceName_
        };
        tools.request('/device/create', data, function(msg) {
            if (msg.msg === 'ok') {
                toastr.success('Device ' + deviceUID_ + ' added !', 'Creation success');
            } else {
                toastr.error(msg.msg, 'Error');
            }
            tools.redirect('/device/all');
        }, function(err) {
            toastr.error(err, 'Unexpected error');
        });
    } else {
        toastr.warning('Device name or UID empty', 'Please fill all fields');
    }
});

jQuery('.form-rename-device').submit(function(e) {
    e.preventDefault();
    var newDeviceName_ = jQuery('#deviceName-device').val();
    var deviceUID_ = jQuery('#deviceUID-device').val();
    var data = {
        deviceUID: deviceUID_,
        newDeviceName: newDeviceName_
    };

    tools.request('/device/rename', data, function(msg) {
        if (msg.msg === 'ok') {
            toastr.success('All changes saved', 'Success');
            location.reload();
        }else {toastr.success('fail');}
    }, function() {
    });
});