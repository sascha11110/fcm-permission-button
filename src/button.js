import FCMClient from './fcm-client';
import FCMTranslator from './translator';

export default class FCMButton {
    constructor() {
        // Create elements.
        this.button = document.createElement('button');
        this.messageElement = document.createElement('div');
        // Create raw FCM client.
        this.fcmClient = new FCMClient();
    }

    /**
     * Initialize the button.
     * 
     * @param {Object} params 
     */
    init(params) {
        // Pass firebase config to FCM client.
        if (!params.firebase) throw 'Firebase configuration (`firebase`) not set.';
        this.fcmClient.init(params.firebase, params.tokenServer);
        // Set translation.
        let translation = 'en';
        if (params.translation) {
            translation = params.translation;
        }
        // Initialize translator.
        this.translator = new FCMTranslator();
        this.translator.init(translation)
        // Set container.
        if (!params.container) throw "Container ID (`container`) not set.";
        this.container = document.getElementById(params.container);
        // Inject button.
        this.button.innerText = this.translator.buttonTitle;
        this.container.appendChild(this.button);
        // Inject message element.
        this.messageElement.setAttribute('class', 'fcmb-message');
        this.container.appendChild(this.messageElement);
        // Handle button action.
        this.button.addEventListener('click', evt => this.requestPermission(evt));
        // Disable button if notification permission was already granted.
        if (Notification.permission === 'granted') {
            this.granted(true);
        }
        // Disable button if notification permission was previously denied.
        if (Notification.permission === 'denied') {
            this.denied(true);
        }
    }

    /**
     * Event listener for button click event.
     */
    requestPermission() {
        // Check if browser supports notifications API.
        if (!("Notification" in window)) {
            this.setMessage(this.translator.missingNotificationAPI, "error");
        // Check if notification permission is already granted.
        } else if (Notification.permission === 'granted') {
            this.granted(true);
        // Notification permission was previously denied.
        } else if (Notification.permission === 'denied') {
            this.denied(true);
        // Request notification permission.
        } else {
            this.fcmClient.requestPermission().then((result) => {
                // Notifications were successfully activated.
                if (result === 'success') {
                    this.granted();
                // Notifications were denied or popup was closed.
                } else if (result === 'denied') {
                    this.denied();
                // Unknown error.
                } else {
                    this.setMessage(this.translator.somethingWentWrong, 'error');
                }
            });
        }
    }

    /**
     * Set the message and the corresponding class. 
     * 
     * @param {String} text message
     * @param {String} type class of message element
     */
    setMessage(text, type) {
        this.messageElement.classList.add(type);
        this.messageElement.textContent = text;
    }

    /**
     * 
     * 
     * @param {Boolen} previously 
     */
    granted(previously = false) {
        this.button.setAttribute('disabled', true);
        if (previously) {
            this.setMessage(this.translator.permissionAlreadyGranted, "warning");
        } else {
            this.setMessage(this.translator.permissionGranted, "success");
        }
    }

    /**
     * 
     * 
     * @param {Boolean} previously 
     */
    denied(previously = false) {
        this.button.setAttribute('disabled', true);
        if (previously) {
            this.setMessage(this.translator.permissionPreviouslyDenied, "warning");
        } else {
            this.setMessage(this.translator.permissionDenied, "info");
        }
    }
}