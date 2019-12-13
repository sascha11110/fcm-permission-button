import FCMButton from './button'

(function(window){
    let _init = (params)=> {
        const fcmButton = new FCMButton();
        fcmButton.init(params);
    }
    window.FCMButton = {
        init:_init
    }
})(window)