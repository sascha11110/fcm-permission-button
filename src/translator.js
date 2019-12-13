export default class FCMTranslator {
    constructor() {
        // Available translations. 
        this.availableTranslations = [
            'de',
            'en',
        ];
    }

    /**
     * Initialize the translator. It is possible to use a predefined
     * translation or hand in a custom translation object.
     * 
     * @param {String|Object} translation
     * @param {Boolean} customTranslation 
     */
    init(translation, customTranslation = false) {
        if (!customTranslation) {
            // Check if translation is available.
            if (!this.availableTranslations.includes(translation)) {
                throw 'Translation is not available.';
            }
            // Load translation from file.
            this.translation = require('./i18n/' + translation + '.json');
        } else {
            // Load translation from provided object.
            this.translation = translation;
        }
        // Set translation strings.
        this.setTranslationStrings();
    }

    /**
     * Check if all required translation strings exist and copy them
     * into instance attributes.
     */
    setTranslationStrings() {
        if (!this.translation.buttonTitle) throw 'Translation string for `buttonTitle` missing.';
        this.buttonTitle = this.translation.buttonTitle;
        if (!this.translation.missingNotificationAPI) throw 'Translation string for `missingNotificationAPI` missing.';
        this.missingNotificationAPI = this.translation.missingNotificationAPI;
        if (!this.translation.permissionGranted) throw 'Translation string for `permissionGranted` missing.';
        this.permissionGranted = this.translation.permissionGranted;
        if (!this.translation.permissionAlreadyGranted) throw 'Translation string for `permissionAlreadyGranted` missing.';
        this.permissionAlreadyGranted = this.translation.permissionAlreadyGranted;
        if (!this.translation.permissionDenied) throw 'Translation string for `permissionDenied` missing.';
        this.permissionDenied = this.translation.permissionDenied;
        if (!this.translation.permissionPreviouslyDenied) throw 'Translation string for `permissionPreviouslyDenied` missing.';
        this.permissionPreviouslyDenied = this.translation.permissionPreviouslyDenied;
        if (!this.translation.somethingWentWrong) throw 'Translation string for `somethingWentWrong` missing.';
        this.somethingWentWrong = this.translation.somethingWentWrong;
    }
}