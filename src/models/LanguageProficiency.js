import { minValue, maxValue, maxLength, required, helpers } from '@vuelidate/validators';

export default class LanguageProficiency {
    /** @type {string} */
    language = '';
    /** @type {number} */
    spoken;
    /** @type {number} */
    written;

    rules () {

        const alphaRegex = helpers.regex(/^[a-zA-ZÀ-ž-`' ]*$/gm);
       
        return {
            language: { 
                required: helpers.withMessage('This is a required field.', required),
                maxString: helpers.withMessage('Your input is too long. (Maximum display is 60 characters)', maxLength(60)),
                alpha: helpers.withMessage('Please enter alphabet characters (A-Z/a-z) and special characters (-`\') only', alphaRegex)
            },
            spoken: {
                required: helpers.withMessage('This is a required field.', required),
                minValue: helpers.withMessage('Minimum value is 1', minValue(1)),
                maxValue: helpers.withMessage('Maximum value is 5', maxValue(5))
            },
            written: {
                required: helpers.withMessage('This is a required field.', required),
                minValue: helpers.withMessage('Minimum value is 1', minValue(1)),
                maxValue: helpers.withMessage('Maximum value is 5', maxValue(5))
            }
        };
    }
}