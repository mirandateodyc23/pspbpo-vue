import { helpers, maxLength, minLength, required, requiredIf } from '@vuelidate/validators';
export default class CareerHistory{
    /** @type {string} */
    company_name = '';
    /** @type {string} */
    position_held = '';
    /** @type {string} */
    salary_package = 0;
    /** @type {string} */
    from;
    /** @type {string} */
    to;
    /** @type {string} */
    reason_for_leaving = "";

    rules() {

        const alphaNumRegex = helpers.regex(/^[\wÀ-ž-.`' ]*$/gm);
        const alphaNumSpecCharRegex = helpers.regex(/^[\wÀ-ž-.,#`' ]*$/gm);
        const checkSalary = (salary) => {
            return salary > 0;
        }
       
        return {
            company_name: {
                required: helpers.withMessage('This is a required field.', required),
                maxString: helpers.withMessage('Your input is too long. (Maximum display is 60 characters)', maxLength(60)),
                alphaNumSpecChar: helpers.withMessage('Please input the following only: alphanumeric characters (A-Z/a-z, 0-9) and special characters (-.,#`\')', alphaNumSpecCharRegex)
            },
            position_held: { 
                required: helpers.withMessage('This is a required field.', required),
                maxString: helpers.withMessage('Your input is too long. (Maximum display is 60 characters)', maxLength(60)),
                alphaNum: helpers.withMessage('Please enter alphanumeric characters (A-Z/a-z, 0-9) and special characters (.-`\')', alphaNumRegex)
            },
            salary_package: { 
                required: helpers.withMessage('This is a required field.', required),
                checkSalary: helpers.withMessage('Make sure the salary is not set to zero', checkSalary)
            },
            from: { 
                required: helpers.withMessage('This is a required field.', required),
                minMaxValue: helpers.withMessage('The date range is invalid.', function minMaxValue(val, {to}) {
                    if(!to) return true; 
                    return new Date(val) < new Date(to);
                })
            },
            to: { 
                requiredIfRef: helpers.withMessage('This is a required field.', requiredIf(function (value, form) {
                    return (!form.checkBox);
                })),
                minMaxValue: helpers.withMessage('The date range is invalid.', function minMaxValue(val, {from}){
                    if(!val) return true;
                    return new Date(val) >= new Date(from);
                })
            },
            reason_for_leaving: { 
                maxString: helpers.withMessage('Your input is too long. (Maximum display is 150 characters)', maxLength(150)),
                minString: helpers.withMessage('Your input is too short. (Minimum display is 5 characters)', minLength(5))
            }
        };
    }
}