import { TokenServer } from './_token-server';

export default class NoyceTokenServer extends TokenServer {
    /**
     * Intitalize the server with a suitable configuration.
     * 
     * @param {Object} config 
     */
    init(config) {
        
    }

    /**
     * Sends the specified token to the server and handles the response.
     * 
     * @param {String} token
     * @return {Boolean} whether sending was successful or not
     */
    sendTokenToServer(token) {
        console.log('This token will be send to server...: ', token);
    }
}