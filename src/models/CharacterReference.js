import { helpers, maxLength, required } from '@vuelidate/validators';

export default class CharacterReference {
    /** @type {string} */
    full_name = '';
    /** @type {string} */
    company_name = '';
    /** @type {string} */
    position = '';
    /** @type {string} */
    relationship = '';
    /** @type {string} */
    contact_number;
    /** @type {string} */
    email = "";
    
    rules() {

        const alphaRegex = helpers.regex(/^[a-zA-ZÀ-ž-`'. ]*$/gm);
        const alphaNumSpecCharRegex = helpers.regex(/^[\wÀ-ž -.,#`'-]*$/gm);
        const emailRegex = helpers.regex(/^[\wÀ-ž._%+-]+@[\wÀ-ž.-]+\.[a-zA-ZÀ-ž]{2,}$/gm);
        const nameRegex = helpers.regex(/^[a-zA-ZÀ-ž `'-]*\s?[a-zA-ZÀ-ž .`'-]+$/gm);

        return {
            full_name: {
                required: helpers.withMessage('This is a required field.', required),
                maxString: helpers.withMessage('Your input is too long. (Maximum display is 60 characters)', maxLength(60)),
                alpha: helpers.withMessage('Please enter alphabet characters (A-Z/a-z) and special characters (.-`\')', nameRegex),
            },
            company_name: {
                required: helpers.withMessage('This is a required field.', required)  ,
                maxString: helpers.withMessage('Your input is too long. (Maximum display is 60 characters)', maxLength(60)),
                alphaNumSpecChar: helpers.withMessage('Please enter alphanumeric characters (A-Z/a-z, 0-9) and special characters (-.,#\')', alphaNumSpecCharRegex),
            },
            position: {
                required: helpers.withMessage('This is a required field.', required),
                maxString: helpers.withMessage('Your input is too long. (Maximum display is 60 characters)', maxLength(60)),
                alphaNumSpecChar: helpers.withMessage('Please enter alphanumeric characters (A-Z/a-z, 0-9) and special characters (-.,#\')', alphaNumSpecCharRegex),
            },
            relationship: {
                required: helpers.withMessage('This is a required field.', required),
                maxString: helpers.withMessage('Your input is too long. (Maximum display is 60 characters)', maxLength(60)),
                alpha: helpers.withMessage('Please enter alphabet characters (A-Z/a-z) and special characters (.-`\')', alphaRegex),
            },
            contact_number: {
                required: helpers.withMessage('This is a required field.', required)  
            },
            email: {
                email: helpers.withMessage('This is not a valid email.', emailRegex)
             }
        };
    }
}