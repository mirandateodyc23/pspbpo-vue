import {  helpers, maxLength, integer, required, minValue, maxValue } from '@vuelidate/validators';

export default class FamilyBackground {
    /** @type {string} */
    full_name;
    /** @type {string} */
    relationship;
    /** @type {int} */
    age;
    /** @type {string} */
    occupation;

    rules() {

        const alphaNumRegex = helpers.regex(/^[\wÀ-ž-`' ]*$/gm);
        //allow alphabet characters, hyphens, apostrophes, diacrtical marks and spaces
        const nameRegex = helpers.regex(/^[a-zA-ZÀ-ž`'- ]*\s?[a-zA-ZÀ-ž`'- ]+$/gm);

        return {
            full_name : { 
                required: helpers.withMessage('This is a required field.', required),
                maxString: helpers.withMessage('Your input is too long. (Maximum display is 60 characters)', maxLength(60)),
                alpha: helpers.withMessage('Please enter alphabet characters (A-Z/a-z) and special characters (-`\') only', nameRegex)
            },
            relationship: { 
                required: helpers.withMessage('This is a required field.', required),
                maxString: helpers.withMessage('Your input is too long. (Maximum display is 60 characters)', maxLength(60)),
                alphaNum: helpers.withMessage('Please enter alphanumeric characters (A-Z/a-z, 0-9) and special characters (.-`\') only', alphaNumRegex)
            },
            age: { 
                required: helpers.withMessage('This is a required field.', required),
                minValue: helpers.withMessage('Minimum value is 0.', minValue(0)),
                maxValue: helpers.withMessage('Maximum value is 120.', maxValue(120)),
                integer: helpers.withMessage('This field can only contain numeric values', integer),
            },
            occupation: {
                required: helpers.withMessage('This is a required field.', required),
                maxString: helpers.withMessage('Your input is too long. (Maximum display is 60 characters)', maxLength(60)),
                alphaNum: helpers.withMessage('Please enter alphanumeric characters (A-Z/a-z, 0-9) and special characters (-`\') only', alphaNumRegex)
            }
        };
    }
}