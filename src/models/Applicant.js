import { required, helpers, requiredIf, maxValue, minLength, maxLength, integer, requiredUnless } from '@vuelidate/validators';
import AcademicQualifications from './AcademicQualifications';
import CareerHistory from './CareerHistory';
// import FamilyBackground from './FamilyBackground';
import LanguageProficiency from './LanguageProficiency';
import CharacterReference from './CharacterReference';

const academicQualifcation = new AcademicQualifications();
const languageProficiency = new LanguageProficiency();
const careerHistory = new CareerHistory();
// const familyBackground = new FamilyBackground();
const characterReference = new CharacterReference();

export default class Applicant {

    /** @type {string}*/
    source;
    /** @type {string}*/
    refer;
    /** @type {string}*/
    other_job_source;
    /** @type {string}*/
    position;
    /** @type {string}*/
    position_id;
    /** @type {string}*/
    market;
    /** @type {int} */
    dept_no;
    // /** @type {string} */
    // application_datetime;
    /** @type {string} */
    notice_period;
    /** @type {float}*/
	salary;
    /** @type {string} */
    start_date;
    /** @type {string}*/
	f_name;
    /** @type {string}*/
	m_name;
    /** @type {string}*/
	l_name;
    /** @type {string}*/
    nick;
    /** @type {int}*/
    gender;
    /** @type {string}*/
	nationality;
    /** @type {string}*/
	// ID_type;
    // /** @type {string}*/
	// ID_number;
    // /** @type {string}*/
	// issue_date;
    // /** @type {string}*/
	birthdate;
    /** @type {string}*/
	age = 0;
    /** @type {string}*/
	// passport;
    // /** @type {string}*/
	// expiry_date;
    // /** @type {int}*/
	civil_status;
    /** @type {string}*/
	address;
    /** @type {int}*/
	zip_code;
    /** @type {string}*/
	current_addr;
    /** @type {string}*/
	current_zip;
    /** @type {string}*/
	skype;
    /** @type {string}*/
	email;
    /** @type {string}*/
	phone;
    /** @type {string}*/
	other_phone_type;
    /** @type {string}*/
	other_phone;
    /** @type {AcademicQualifications[]}*/
	qualification = [new AcademicQualifications()]
    // /** @type {string}*/
	// other_qualif
    /** @type {LanguageProficiency[]}*/
	language = [new LanguageProficiency()]
    /** @type {CareerHistory[]}*/
	career = [new CareerHistory()]
    // /** @type {FamilyBackground[]} */
    // family = [new FamilyBackground()]
    /** @type {CharacterReference[]} */
    character_ref = [new CharacterReference()]
    /** @type {any}*/
	cv_doc;
     /** @type {any}*/
	profile;

    rules() {
        
        const alphaRegex = helpers.regex(/^[a-zA-ZÀ-ž-`'. ]*$/gm);
        const alphaNumSpecCharRegex = helpers.regex(/^[\wÀ-ž-.,#`' ]*$/gm);
        const nameRegex = helpers.regex(/^[a-zA-ZÀ-ž-`' ]+(?:[-`' ][a-zA-ZÀ-ž]+)*$/gm); 
        const emailRegex = helpers.regex(/^[\wÀ-ž._%+-]+@[\wÀ-ž.-]+\.[a-zA-ZÀ-ž]{2,}$/gm);
        
        const phone_type = ['whatsapp', 'telegram', 'viber', 'line'];
        
        const customMinLength = (text) => (text.replaceAll(' ', '').length >= 3)
        const isMinorAge = (date) => (new Date(date)) < new Date(new Date(new Date().getTime() + 8 * 3600 *1000).setFullYear(new Date(new Date().getTime() + 8 * 3600 * 1000).getFullYear() - 18))
        const isGreaterThanToday = (date) => new Date(date).setHours(0,0,0,0) >= new Date().setHours(0,0,0,0);
        const is2MB = (file) => (file.size / 1024 / 1024) < 2;
        const is5MB = (file) => (file.size / 1024 / 1024) < 5;
        const fileNameSize = (file) => file.name.split('.')[0].length <= 60;
        const isPDF = (file) => file.type == "application/pdf" || file.type == "pdf";
        const checkSalary = (salary) =>  salary > 0;

       return {
            refer: {
                requiredIfRef: helpers.withMessage('This is a required field.',requiredIf(function (value, form) {
                    return (form.source && form.source.toLowerCase().trim()  == 'referral');
                })),
                maxString: helpers.withMessage('Your input is too long. (Maximum display is 60 characters)', maxLength(60)),
                alphaRegex: helpers.withMessage('Please enter alphabet characters (A-Z/a-z) and special characters (-`\') only', alphaRegex)
            },
            other_job_source: {
                requiredIfRef: helpers.withMessage('This is a required field.',requiredIf(function (value, form) {
                    return (form.source && (form.source.toLowerCase().trim()  == 'other' || form.source.toLowerCase().trim()  == 'social media' ));
                })),
                maxString: helpers.withMessage('Your input is too long. (Maximum display is 60 characters)', maxLength(60)),
                alphaRegex: helpers.withMessage('Please enter alphabet characters (A-Z/a-z) and special characters (-`\') only', alphaRegex)
            },
            email: {
                required: helpers.withMessage('This is a required field.', required),
                email: helpers.withMessage('This is not a valid email', emailRegex)
            },
            skype: {
                requiredUnless: helpers.withMessage('This is a required field.', requiredUnless(function (value, form) {
                let count = 0;
                if (form.phone) count++;
                if (form.other_phone_type && form.other_phone_type != 'None') count++;
                return count >= 1;
                })),
                maxString: helpers.withMessage('Your input is too long. (Maximum display is 60 characters)', maxLength(60)),
            },
            phone: {
                requiredUnless: helpers.withMessage('This is a required field.', requiredUnless(function (value, form) {
                let count = 0;
                if (form.skype) count++;
                if (form.other_phone_type && form.other_phone_type != 'None') count++;
                return count >= 1;
                }))
            },
            other_phone_type: {
                requiredUnless: helpers.withMessage('This is a required field.', requiredUnless(function (value, form) {
                let count = 0;
                if (form.skype) count++;
                if (form.phone) count++;
                return count >= 1;
                }))
            },
            other_phone: {
                requiredIfRef: helpers.withMessage('This is a required field.',requiredIf(function (value, form) {
                    return (form.other_phone_type && phone_type.includes(form.other_phone_type.toLowerCase().trim()));
                }))
            },
            position_id: {
                required: helpers.withMessage('This is a required field.', required)  
            },
            market: {
                required: helpers.withMessage('This is a required field.', required)  
            },
            salary: {
                required: helpers.withMessage('This is a required field.', required),
                checkSalary: helpers.withMessage('Make sure the salary is not set to zero', checkSalary)
            },
            start_date : {
                required: helpers.withMessage('This is a required field.', required),
                isGreaterThanToday: helpers.withMessage('Please input correct date', isGreaterThanToday)
            },
            source: {
                required: helpers.withMessage('This is a required field.', required)  
            },
            notice_period: {
                required: helpers.withMessage('This is a required field.', required),
                alphaNumSpecChar: helpers.withMessage('Please input the following only: alphanumeric characters (A-Z/a-z, 0-9) and special characters only', alphaNumSpecCharRegex),
                maxString: helpers.withMessage('Your input is too long. (Maximum display is 60 characters)', maxLength(60))
            },
            f_name: {
                required: helpers.withMessage('This is a required field.', required),
                nameRegex: helpers.withMessage('Please enter alphabet characters (A-Z/a-z) and special characters (-`\') only', nameRegex), 
                maxString: helpers.withMessage('Your input is too long. (Maximum display is 60 characters)', maxLength(60))
            },
            m_name: { 
                nameRegex: helpers.withMessage('Please enter alphabet characters (A-Z/a-z) and special characters (-`\') only', nameRegex),
                minString: helpers.withMessage('Your input is too short. (Minimum display is 2 characters)', minLength(2)),
                maxString: helpers.withMessage('Your input is too long. (Maximum display is 60 characters)', maxLength(60))
            },
            l_name: {
                required: helpers.withMessage('This is a required field.', required),
                maxString: helpers.withMessage('Your input is too long. (Maximum display is 60 characters)', maxLength(60)),
                nameRegex: helpers.withMessage('Please enter alphabet characters (A-Z/a-z) and special characters (-`\') only', nameRegex)
            },
            nick: { 
                required: helpers.withMessage('This is a required field.', required),
                maxString: helpers.withMessage('Your input is too long. (Maximum display is 60 characters)', maxLength(60)),
                nameRegex: helpers.withMessage('Please enter alphabet characters (A-Z/a-z) and special characters (-`\') only', nameRegex)
            },
            gender: { 
                required: helpers.withMessage('This is a required field.', required) 
            },
            nationality: {
                required: helpers.withMessage('This is a required field.', required),
                alphaRegex: helpers.withMessage('Please enter alphabet characters (A-Z/a-z) and special characters (-`\') only', alphaRegex),
                minLength: helpers.withMessage('Minimum characters is 3', customMinLength),
                maxString: helpers.withMessage('Your input is too long. (Maximum display is 60 characters)', maxLength(60)),
            },
            birthdate: {
                required: helpers.withMessage('You have not given a correct date', required),
                isMinorAge: helpers.withMessage('You should be 18 years old and above', isMinorAge)
            },
            civil_status: {
                required: helpers.withMessage('This is a required field.', required)
            },
            age: {
                required: helpers.withMessage('This is a required field.', required) 
            },
            address: {
                required: helpers.withMessage('This is a required field.', required),
                maxString: helpers.withMessage('Your input is too long. (Maximum display is 150 characters)', maxLength(150)),
                alphaNumSpecChar: helpers.withMessage('Please input the following only: alphanumeric characters (A-Z/a-z, 0-9) and special characters (-.,#`\') only', alphaNumSpecCharRegex)
            },
            zip_code: {
                integer: helpers.withMessage('This field can only contain numeric values', integer),
                maxInteger: helpers.withMessage('Please input a valid value', maxValue(9999999999))
            },
            current_addr: {
                requiredIfRef: helpers.withMessage('This is a required field.',requiredIf(function (value, form) {
                    return (!form.is_same_as_perm_address);
                })),
                maxString: helpers.withMessage('Your input is too long. (Maximum display is 150 characters)', maxLength(150)),
                alphaNumSpecChar: helpers.withMessage('Please input the following only: alphanumeric characters (A-Z/a-z, 0-9) and special characters (-.,#`\') only', alphaNumSpecCharRegex)
            },
            current_zip: {
                integer: helpers.withMessage('This field can only contain numeric values', integer),
            },
            // ID_type : {
            //     required: helpers.withMessage('This is a required field.', required),
            //     maxString: helpers.withMessage('Your input is too long. (Maximum display is 60 characters)', maxLength(60)),
            //     idOnly: helpers.withMessage('Please enter alphanumeric characters (A-Z, 0-9) only', idOnly)
            // },
            // ID_number : {
            //     required: helpers.withMessage('This is a required field.', required),
            //     maxString: helpers.withMessage('Your input is too long. (Maximum display is 20 alphanumeric)', maxLength(20)),
            //     idOnly: helpers.withMessage('Please enter alphanumeric characters (A-Z, 0-9) only', idOnly)
            // },
            // issue_date: {
            //     required: helpers.withMessage('This is a required field.', required),
            // },
            // passport: {
            //     requiredIfRef: requiredIf(function (value, form) {
            //         return (form.expiry_date !== undefined && form.expiry_date !== '' && form.expiry_date !== null)
            //     }),
            //     maxString: helpers.withMessage('Your input is too long. (Maximum display is 20 alphanumeric)', maxLength(20)),
            //     idOnly: helpers.withMessage('Please enter alphanumeric characters (A-Z, 0-9) only', idOnly)
            // },
            // expiry_date : {
            //     requiredIfRef: requiredIf(function (value, form) {
            //         return (form.passport !== undefined && form.passport !== '' && form.passport !== null)
            //     })
            // },
            qualification: {
                $each: helpers.forEach(
                    academicQualifcation.rules()
                )
            },
            // other_qualif : {
            //     maxString: helpers.withMessage('Your input is too long. (Maximum display is 150 characters)', maxLength(150)),
            //     alphaNumSpecChar: helpers.withMessage('Please input the following only: alphanumeric characters (A-Z, 0-9) and special characters (-.,#)', alphaNumSpecCharRegex),
            // },
            language: {
                $each: helpers.forEach(
                    languageProficiency.rules()
                )
            },
            career: {
                $each: helpers.forEach(
                    careerHistory.rules()
                )
            },
            // family: {
            //     $each: helpers.forEach(
            //         familyBackground.rules()
            //     )
            // },
            character_ref: {
                $each: helpers.forEach(
                    characterReference.rules()
                )
            },
            cv_doc: {
                required: helpers.withMessage('This is a required field.', required) ,
                is5MB: helpers.withMessage('The resume should not be greater than 5MB', is5MB),
                fileNameSize: helpers.withMessage('File name should be 60 characters only', fileNameSize),
                isPDF: helpers.withMessage('File type should be PDF only', isPDF)
            },
            profile: {
                required: helpers.withMessage('This is a required field.', required),
                is2MB: helpers.withMessage('Max file size should be up to 2MB only', is2MB),
                fileNameSize: helpers.withMessage('File name should be 60 characters only', fileNameSize)
            }
        };
    }
}
