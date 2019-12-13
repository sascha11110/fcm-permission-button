import * as firebase from 'firebase/app';
import 'firebase/messaging';
import NoyceTokenServer from './token-server/noyce';

export default class FCMClient {
    init(firebaseConfig, tokenServerConfig) {
        // Initialize token server.
        if (!tokenServerConfig) throw 'Token server configuration (`tokenServer`) not set.'; 
        this.server = new NoyceTokenServer();
        this.server.init(tokenServerConfig);
        // Check if provided config is valid.
        this.checkFirebaseConfig(firebaseConfig)
        // Initialize firebase.
        firebase.initializeApp(firebaseConfig.config);
        // Initialize firebase messaging.
        this.messaging = firebase.messaging();
        // Add Voluntary Application Server Identification key.
        this.messaging.usePublicVapidKey(firebaseConfig.publicVapidKey);
        // Register token refresh callback.
        this.messaging.onTokenRefresh((ctx) => this.tokenRefresh(ctx));
    }

    /**
     * Checks is the provided firebase configuration is valid.
     * 
     * @param {Object} firebaseConfig 
     */
    checkFirebaseConfig(firebaseConfig) {
        if (!firebaseConfig.config) throw 'Firebase configuration (`firebase.config`) not set.';
        if (!firebaseConfig.config.apiKey) throw 'Firebase API key (`firebase.config.apiKey`) not set.';
        if (!firebaseConfig.config.projectId) throw 'Firebase Project ID (`firebase.config.projectId`) not set.';
        if (!firebaseConfig.config.messagingSenderId) throw 'Firebase Messaging Sender ID (`firebase.config.messagingSenderId`) not set.';
        if (!firebaseConfig.config.appId) throw 'Firebase App ID (`firebase.config.appId`) not set.';
        if (!firebaseConfig.publicVapidKey) throw 'Public Voluntary Application Server Identification (`firebase.publicVapidKey`) not set.';
    }

    /**
     * Requests the permission from the user and subsequently retrieves a token.
     * 
     * @return {String} One of the following result strings:
     *                  'success', 'denied', 'unknown-error'
     */
    async requestPermission() {
        // Request the permission from the user.
        return Notification.requestPermission().then((permission) => {
            // If permission was granted we will try to retrieve an instace ID token.
            if (permission === 'granted') {
                return this.messaging.getToken().then((currentToken) => {
                    // Send token to server.
                    if (currentToken) {
                        return this.server.sendTokenToServer(currentToken).then((res) => {
                            if (res) {
                                return 'success';
                            } else {
                                return 'unknown-error';
                            }
                        }).catch((err) => {
                            return 'unknown-error';
                        });
                    // Display error message if no token found.
                    } else {
                        return 'unknown-error';
                    }
                }).catch((err) => {
                    return 'unknown-error';
                });
            // Permission was denied by user.
            } else {
                return 'denied';
            }
        });
    }

    /**
     * Retrieve new token and send it to server when token gets refreshed.
     */
    tokenRefresh() {
        this.messaging.getToken().then((refreshedToken) => {
            sendTokenToServer(refreshedToken);
        });
    }
}