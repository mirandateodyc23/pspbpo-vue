import { helpers, maxLength, required } from '@vuelidate/validators';
export default class AcademicQualifications {
    /** @type {string} */
    qualification_achieved = '';
    /** @type {string} */
    major = "";
    /** @type {string} */
    institution = '';
    /** @type {string} */
    country = '';
    /** @type {string} */
    from;
    /** @type {string} */
    to;

    rules() {

        const alphanumSpecCharRegex = helpers.regex(/^[\wÀ-ž-.,#' ]*$/gm);
        const alphaNumRegex = helpers.regex(/^[\wÀ-ž-.' ]*$/gm);

        return {
            qualification_achieved: { 
                required: helpers.withMessage('This is a required field.', required)
            },
            major: {
                maxString: helpers.withMessage('Your input is too long. (Maximum display is 60 characters)', maxLength(60)),
                alphaNum: helpers.withMessage('Please enter alphanumeric characters (A-Z/a-z, 0-9) and special characters (-.\')', alphaNumRegex)
            },
            institution: { 
                required: helpers.withMessage('This is a required field.', required),
                maxString: helpers.withMessage('Your input is too long. (Maximum display is 60 characters)', maxLength(60)),
                alphaNumSpecChar: helpers.withMessage('Please input the following only: alphanumeric characters (A-Z/a-z, 0-9) and special characters (-.,#\')', alphanumSpecCharRegex)
            },
            country : { 
                required: helpers.withMessage('This is a required field.', required)
            },
            from: {
                required: helpers.withMessage('This is a required field.', required),
                minMaxValue: helpers.withMessage('The date range is invalid.', function minMaxValue(val, {to}) {
                    return val <= to;
                }),
            },
            to: {
                required: helpers.withMessage('This is a required field.', required), 
                minMaxValue: helpers.withMessage('The date range is invalid.', function minMaxValue(val, {from}){
                    return val >= from;
                }),
            }
        };
    }
}