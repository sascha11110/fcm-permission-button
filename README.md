# FCM Permission Button
Simple button implementation for requesting a Firebase Cloud Messaging (FCM) token and send it to a server that is capable of handling these tokens.

## Usage
Add [this file](https://github.com/sascha11110/fcm-permission-button/blob/master/dist/fcm-button.min.js) to your website. The file includes the necessary libraries of the Firebase SDK.

When initializing `FCMButton`, you have to pass a configuration object:

```js
FCMButton.init({
  container: '<CONTAINER CLASS>',
  firebase: {
    config: {
      apiKey: '<KEY>',
      projectId: '<ID>',
      messagingSenderId: '<ID>',
      appId: '<ID>'
    },
    publicVapidKey: '<KEY>'
  },
  tokenServer: { <CUSTOM TOKEN SERVER CONFIGURATION> }
});
```

### Options
| Option  | Type | Default | Description |
|---|---|---|---|
| container | `String` | - | ID of the container in which the button is to be placed. |
| firebase.config | `Object` | - | Firebase configuration. Must at least contain `apiKey`, `projectId`, `messagingSenderId` and `appId`. |
| firebase.publicVapidKey | `String` | - | Public Voluntary Application Server Identification Key. |
| tokenServer | `Object` | - | Token server configuration. |

### Styling
To style the button itself simply use the container ID and point the a child `button` element. The message container comes with four different message type classes (`success`, `info`, `warning`, `error`).

## Developement
* Install dependencies: `npm install`
* Set the configuration in `util/template.ejs`
* Start a development server at [http://localhost:3000](http://localhost:3000): `npm run dev`
* Produce a production version: `npm run build`

Adding another default translation or custom token server implementation to this repository is highly appreciated!

### Add a default translation
Besides adding a custom translation via the `translation` option, it is possible to use default translations. You can add a default translation by placing a translation file in `src/i18n/` and adding the corresponding filename to the `availableTranslations` array in `src/translator.js`.

### Add a custom token server
Currently only the [Noyce Token Server](https://github.com/sascha11110/) is supported. To add a custom token server implement the abstract class in `src/token-server/_token-server.js` and replace the default server in `src/fcm-client.js`. Simply change the instantiation in this line: `this.server = new NoyceTokenServer();`.

## TODOs
- Test `tokenRefresh()` in `src/fcm-client.js` (delete browser cache)
- Add functionality for receiving notifications
- Expose loaded firebase library

## Issues / Feedback
Did you find any issues, bugs or improvements you would like to see implemented? Feel free to [open an issue on GitHub](https://github.com/sascha11110/fcm-permission-button/issues/new). Any feedback is appreciated.