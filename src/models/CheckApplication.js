import { required, helpers } from '@vuelidate/validators';

export default class CheckApplication {
       /** @type {string}*/
       email;
       /** @type {string}*/
       reference_code;

       rules () {

        const emailRegex = helpers.regex(/[\wÀ-ž._%+-]+@[\wÀ-ž.-]+\.[A-Za-z]{2,}/gm);
        
        return {
            email : {
                required: helpers.withMessage('This is a required field.', required),
                email: helpers.withMessage('This is not a valid email.', emailRegex)
            },
            reference_code: {
                required: helpers.withMessage('This is a required field.', required)
            }
        };
       }
}