/**
 * Sort of abstract class to provide an interface for conrecte token server implementations.
 */
export class TokenServer {
    constructor() {
        // Make sure this class is not instantiated.
        if (this === TokenServer) {
            throw new TypeError('Can not construct abstract class `TokenServer`.');
        }
        // Make sure that all instance methods are implemented.
        if (this.init === TokenServer.prototype.init) {
            throw new TypeError('Please implement abstract method `init`.');
        }
        if (this.sendTokenToServer === TokenServer.prototype.sendTokenToServer) {
            throw new TypeError('Please implement abstract method `sendTokenToServer`.');
        }
    }

    /**
     * Intitalize the server with a suitable configuration.
     * 
     * @param {Object} config 
     */
    init(config) {
        throw new TypeError('Do not call abstract method `init` from child.');
    }

    /**
     * Sends the specified token to the server and handles the response.
     * 
     * @param {String} token
     * @return {Boolean} whether sending was successful or not
     */
    sendTokenToServer(token) {
        throw new TypeError('Do not call abstract method `sendTokenToServer` from child.');
    }
}