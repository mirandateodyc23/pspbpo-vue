<script setup>
import { reactive, ref, watch, onMounted } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { useI18n } from "vue-i18n";
import { VueTelInput } from 'vue-tel-input';
import { useRouter, useRoute } from 'vue-router';
import Applicant from '@/models/Applicant.js';
import JobApplication from '@/services/JobApplication.js';
import vueRecaptcha from 'vue3-recaptcha2';
import AcademicQualification from '../models/AcademicQualifications';
import CareerHistory from '../models/CareerHistory';
import LanguageProficiency from '../models/LanguageProficiency';
import CharacterReference from '../models/CharacterReference';
import countries from '../assets/json/countries.json';
import socials from '../assets/json/socials.json';
import CalendarComponent from '../components/CalendarComponent.vue';
import CurrencyComponent from '../components/CurrencyComponent.vue';
import PreviewComponent from '@/components/PreviewComponent.vue';
import FloatLabel from 'primevue/floatlabel';
import 'vue-tel-input/vue-tel-input.css';
import selectForms from '../assets/json/select-forms.json';
// import FamilyBackground from '../models/FamilyBackground';
const queryRoutes = useRoute().query;
const router = useRouter();
const { tm } = useI18n();
import Swal from 'sweetalert2';

//check preview
const isShowPreview = ref(false);

//countriess
const countriesData = ref(countries.map(country => country.title));

//social media
const socialsData = ref(socials);

// for date min/max settings
const todaysDate = new Date();
// const formattedTodaysDate = todaysDate.getFullYear() + '-' + ("0" + (todaysDate.getMonth() + 1)).slice(-2) + '-' + ("0" + todaysDate.getDate()).slice(-2);
const dateAgeMin = new Date(todaysDate.setFullYear(todaysDate.getFullYear() - 18));
const formattedDateAgeMin = dateAgeMin.getFullYear() + '-' + ("0" + (dateAgeMin.getMonth() + 1)).slice(-2) + '-' + ("0" + dateAgeMin.getDate()).slice(-2);

//Router
const desiredJob = ref(queryRoutes && Object.keys(queryRoutes).length != 0 ? queryRoutes : localStorage.getItem("desiredJob")); 

//Payload
const applicationPayload = new Applicant();
const isSelectJobDisabled = ref(false);
const isJobSourceDisabled = ref(false);
const isSocMedDisabled = ref(false);
const formValues = reactive(applicationPayload);
const noExperience = ref(false);
const is_same_as_perm_address = ref(false);
const careerHistoryCheckBox = ref([false]);

const checkEmployed = (e, index) => {
    if(e.target.value) {
        formValues.career[index].to = '';
        formValues.career[index].checkBox = careerHistoryCheckBox.value[index];
    }
}

//Vuelidate
const rules = applicationPayload.rules();
const v$ = useVuelidate(rules, formValues);

const isValidStep = ref({
	1: true,
	2: true,
	3: true,
	4: true,
	5: true
});

//Captcha
const showRecaptcha = ref(true);
const captcha = ref(null);
const isValidCaptcha = ref(false);
const isSubmitting = ref(false);

//Job Positions
const jobs = ref([]);
const tempJobValue = ref();

//Phone Format
const isPhoneFormatted = ref({
    phone_number: false,
    other_phone: false,
    character_ref: [false]
}); 

const currentYear = new Date().getFullYear();
const educationYears = ref([currentYear]);
const yearRange = '2000:${currentYear}';

for(let i = 1; i< 60; i++) {
    educationYears.value.push(currentYear - i);
}

tm('jobs.contents').forEach((item) => {
    jobs.value.push({
        title: item['category'],
        props: {
            disabled: true
        }
    });
    item['job_lists'].forEach((job) => {
        jobs.value.push({
            title: job['title'],
            slug: job['slug'],
            value: job['id'],
            dept_no: job['dept_no'],
            market: job['market'],
            temp_id: `${job['id']}-${job['market'].toLowerCase()}-${job['slug'].toLowerCase()}`
        });
    });
});

// getting and setting the value of uploaded resume/images
function uploadedResume(event) {
	const file = event.target.files[0];
	formValues.cv_doc = file;
}

function uploadedImage(event){
	const file = event.target.files[0];
	formValues.profile = file;
}
// set value of uploaded file/images to null when clear
function clearFile(file) {
    if(file == 'image') {
        formValues.profile = null;
    }
    if(file == 'resume') {
        formValues.cv_doc = null;
    }
}

async function previewApplication() {
    const isValid = process.env.VUE_APP_VALIDATION_ENABLE == 0 ? true : await validateForm(5);
    const isCaptchaValid = process.env.VUE_APP_CAPTCHA_ENABLE == 0  ? true : isValidCaptcha.value;
    if (!isValid || !isCaptchaValid) {
        captcha.value.reset();
        return;
    } 
    isShowPreview.value = true;
    let temp_job = jobs.value.find((job) => job.temp_id == tempJobValue.value);
    formValues.position_id = temp_job.value;
    formValues.position = temp_job.title;
    formValues.dept_no = temp_job.dept_no;
    // formValues.application_datetime = new Date(new Date().getTime() + 8 * 3600 * 1000).toISOString();
}

async function submitForm() {
    isShowPreview.value = false;
    const response = await JobApplication.sendApplication(formValues);
        if(response.data != undefined) {
            let message = response.data.message;
            if(!response.data.success && response.data.error) {
                if(typeof response.data.error == 'object') {
                    message = (Object.keys(response.data.error).length > 0 ? response.data.error[Object.keys(response.data.error)[0]][0] : message);
                } else {
                    message = (response.data.error) ? response.data.error.toString() : response.data.message.toString();
                }
            }
            Swal.fire({
                title: response.data.success ? 'Success' : "Error",
                text: message,
                icon: response.data.success ? 'success' : 'error',
                confirmButtonText: response.data.success ? 'Confirm': "Close",
                confirmButtonColor: response.data.success ? '#41b882' : '#ff7674',
                allowOutsideClick: response.data.success ? false: true,
                allowEscapeKey : response.data.success ? false : true
            }).then((result) => {
                if(response.data.success) {
                    localStorage.removeItem("formValues");
                }
                if(result.isConfirmed && response.data.success) {
                    router.push('/careers');
                }
            });
        }
        else {
            let message = '';
            if(response.response != undefined) {
                if(typeof response.response.data.error == 'object') {
                    message = (Object.keys(response.response.data.error).length > 0 ? response.response.data.error[Object.keys(response.response.data.error)[0]][0] : response.response.data.message);
                } else {
                    message = (response.response.data.error) ? response.response.data.error.toString() : response.response.data.message.toString();
                }
            } else {
                message = response.message;
            }
            // const textError = response.response != undefined ? response.response.data.message : response.message;
            Swal.fire({
                title: "Error",
                text: message, 
                icon: "error",
                allowOutsideClick: true,
                allowEscapeKey: true,
                confirmButtonText: "Close"
            });
        }
        isSubmitting.value = false;
}

function addItem(item) {
    const itemObjects = {
        'qualification' : new AcademicQualification(),
        'language': new LanguageProficiency(),
        'career': new CareerHistory(),
        'character_ref': new CharacterReference() 
        // 'family': new FamilyBackground()
    }
    formValues[item].push(itemObjects[item]);
    if(item == 'career') {
        careerHistoryCheckBox.value.push(false);
    }
    if(item == 'character_ref') {
        isPhoneFormatted.value['character_ref'].push(false)
    }
}
function removeItem(item, index) {
    formValues[item].splice(index, 1);
    if(item == 'career') {
        careerHistoryCheckBox.value.splice(index, 1);
    }
    if(item == 'character_ref') {
        isPhoneFormatted.value['character_ref'].splice(index, 1);
    }
}

// check if there is a particular job desired selected
function checkDesiredJobValue() {
    if (desiredJob.value == null) return isSelectJobDisabled.value = false;
    desiredJob.value = typeof desiredJob.value === 'object' ? desiredJob.value : JSON.parse(desiredJob.value);
    if(desiredJob.value.title == undefined || desiredJob.value.title == null) return isSelectJobDisabled.value = false;
    const jobIndex = jobs.value.findIndex((value) => value.slug != undefined && value.slug.toLowerCase() == desiredJob.value.title.toLowerCase())
    if (jobIndex === -1) {
        isSelectJobDisabled.value = false;
        tempJobValue.value = null;
        formValues.source = '';
        return;
    }
    isSelectJobDisabled.value = true;
    tempJobValue.value = jobs.value[jobIndex]['temp_id'];
}

// Check Job source in url parameters
function checkJobSource() {
    const sourceParam = useRoute().query.source;
    if (!sourceParam) { 
        return isJobSourceDisabled.value = false; 
    }
    if (socialsData.value.some(social => social.toLowerCase() === sourceParam.toLowerCase())) {
        formValues.source = 'Social Media';
        formValues.social_media = sourceParam.charAt(0).toUpperCase() + sourceParam.slice(1);
        isSocMedDisabled.value = true;
        return isJobSourceDisabled.value = true;
    } 
    else if (['Social Media', 'JobStreet', 'Indeed', 'LinkedIn', 'Referral', 'Advertisement', 'Other'].some(social => social.toLowerCase() === sourceParam.toLowerCase())) {
        formValues.source = sourceParam.charAt(0).toUpperCase() + sourceParam.slice(1);
        return isJobSourceDisabled.value = true;
    }
}

const isDisabledNationality = ref(false);
function checkNationality() {
    const nationalityParam = queryRoutes.nationality;
    if(!nationalityParam) {
        return;
    }
    const nationalityArr = nationalityParam.split("-");
    nationalityArr.forEach(function (data) {
        const marketArrayCheck = selectMarket.value.filter(item => item.toLowerCase().trim() == data.toLowerCase().trim());
        if(marketArrayCheck.length > 0) {
            if(!Array.isArray(formValues.market)) {
                formValues.market = [];
            }
            formValues.market.push(marketArrayCheck[0]);
        }
    });
    isDisabledNationality.value = (formValues.market.length > 0) ? true : false;
    
}
// Check formValues 
function checkFormValues() {
    let formValueData = (localStorage.getItem("formValues") != null) ? JSON.parse(localStorage.getItem("formValues")) : null;
    let formExpiry = (localStorage.getItem("formExpiry") != null) ? localStorage.getItem("formExpiry") : null;
    let currentDate = Math.floor(new Date().getTime() / 1000);
    // check if localstorage has value also if the local storage position_id is same as current job choice.
    if(formValueData != null && formExpiry != null && currentDate < formExpiry && formValueData['position_id'] == tempJobValue.value  &&  tempJobValue.value && formValueData['position_id']) {
        // sweet alert fired
        Swal.fire({
            text: 'An unsaved application was found. Would you like to load it?',
            showCancelButton: true,
            icon: 'info',
            cancelButtonText: 'No',
            confirmButtonText: 'Yes',
            confirmButtonColor: '#41b882',
            allowOutsideClick: false,
            allowEscapeKey: false
        }).then((result) => {
            // if click no formValues and formExpiry will remove in local storage
            if(result.isDismissed) {
                localStorage.removeItem("formValues");
                localStorage.removeItem("formExpiry");
                return;
            }
            // looping all the local storage formValues
            for(var key in formValueData) {
               
                if(key == 'is_same_as_perm_address' && formValueData[key]) {
                    is_same_as_perm_address.value = true;
                }
                if(key == 'start_date' || key == 'birthdate') {
                    formValues[key] = new Date(formValueData[key]);
                }
                else {
                    formValues[key] = formValueData[key];
                    if(key == 'qualification' || key == 'career') {
                        formValueData[key].forEach((item, index) => {
                            formValues[key][index]['from'] = new Date(item['from']) != 'Invalid Date' ? new Date(item['from']) : new Date();
                            formValues[key][index]['to'] = new Date(item['to']) != 'Invalid Date' ? new Date(item['to']) : new Date();
                        }); 
                    }
                }
            }    
        });
    } else {
        // if no formValues and formExpiry will remove in local storage
        localStorage.removeItem("formValues");
        localStorage.removeItem("formExpiry");
    }
}

onMounted(() => {
	checkDesiredJobValue();
    checkJobSource();
    checkFormValues();
    const telInput = document.querySelectorAll('[type=tel], input.p-inputtext');
    telInput.forEach(item => {
       item.autocomplete = 'off';
    });
    const primeVueforms = document.querySelectorAll('[class*="input-form-"]');
    primeVueforms.forEach(item => {
        item.querySelector('input').id = 'input-form-' + item.id
    })
    const actionButtons = document.querySelectorAll('.action-buttons');
    actionButtons.forEach(button => {
        button.addEventListener("click", function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        });
    })
});

// captcha events emitted from vue captcha
function recaptchaVerified() {
  isValidCaptcha.value = true
}
function recaptchaExpired() {
	isValidCaptcha.value = false;
    captcha.value.reset();
}
function recaptchaFailed() {
	isValidCaptcha.value = false;
}
function recaptchaError() {
  isValidCaptcha.value = false
}

// watch birthdate value for age computation
watch(() => formValues.birthdate, (newValue) => {
    if(newValue == null) {
        formValues.age = 0;
        return;
    }
    let today = new Date();
    let birthDate = new Date(newValue);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    formValues.age = age;
});
formValues.birthdate = new Date(dateAgeMin);

// watch value to check if applicant is inexperience or not
watch(() => noExperience.value, (newValue) => {
	if(newValue == true) {
		formValues.career = [];
		return;
	} 
	addItem('career');
});
// for address/zip code with same value to update together
watch(() => is_same_as_perm_address.value, (newValue) => {
    formValues.is_same_as_perm_address = (newValue) ? true : false;
    formValues.current_addr = (newValue) ? '' : formValues.current_addr;
    formValues.current_zip = (newValue) ? '' : formValues.current_zip;
});

// watch value of child number to remove decimal values
watch(() => formValues.child_num, (newValue) => {
    formValues.child_num = Math.round(newValue);
});

const stepperList = ref(['Job Source & Position Desired', 'Personal Information', 'Academic & Language', 'Career & Character', 'Resume & Image']);
const activeStepper = ref(1);

//form validations
async function validateForm(step) {
    if(process.env.VUE_APP_VALIDATION_ENABLE == 0) {
        return true;
    }
    let invalidCount = 0;
    let validationGroup = {
        step1: ['refer', 'other_job_source', 'position_id', 'market', 'source', 'notice_period', 'start_date', 'salary'],
        step2: ['f_name', 'm_name', 'l_name', 'nick', 'gender', 'nationality', 'birthdate', 'age', 'civil_status', 'address', 'zip_code', 'current_addr', 'current_zip', 'skype', 'email', 'phone', 'other_phone_type', 'other_phone'],
        step3: ['qualification', 'language'],
        step4: ['career', 'character_ref'],
        step5: ['profile', 'cv_doc']
    }

	for (const field of validationGroup[`step${step}`]) {
        const validData = await v$.value[field].$validate();
		if(!validData) {
			invalidCount++;
		}
        else {
            if(['phone', 'other_phone'].includes(field)) {
                invalidCount = formValues[field] != undefined && formValues[field] != null && formValues[field].trim()  !='' && isPhoneFormatted.value[field] == false ? invalidCount + 1 : invalidCount; 
            } else if (field == 'character_ref') {
                if(isPhoneFormatted.value[field].includes(false)) {
                    invalidCount ++ ;
                }
            }
        }
	}
    const isValid = invalidCount == 0;
    isValidStep.value[step] = isValid;
    return isValid;
}

// stepper
function prevStepper() {
	if(activeStepper.value == 1) return;
	activeStepper.value --;
}

async function nextStepper() {
	if(activeStepper.value == stepperList.value.length) return;
	const isValid = await validateForm(activeStepper.value);
	if(!isValid) return;  
    let formValuesData = formValues;
    localStorage.setItem('formValues', JSON.stringify(formValuesData));
    let currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 8);
    localStorage.setItem('formExpiry', Math.floor(currentDate.getTime() / 1000));
	activeStepper.value ++;
}

// watching value for job source to update value for referral, social media and other job source
watch(() => formValues.source, (newValue) => {
    if(newValue == null) {
        formValues.refer = '';
        formValues.other_job_source = '';
    } else if(newValue.trim().toLowerCase() == 'referral') {
        formValues.other_job_source = '';
    } else {
        formValues.refer = '';
    }
});

watch(() => formValues.language, () => {
    formValues.language.forEach(item => {
        item.spoken = (item.spoken > 5 && item.spoken != undefined) ? '' : (item.spoken < 1 && item.spoken != undefined) ? '' : item.spoken;
        item.written = (item.written > 5 && item.written != undefined) ? '' : (item.written < 1 && item.written != undefined) ? '': item.written;
    });
},{ deep: true});

// Vue Tel Phone Props
const vueTelProps = {
    mode: "international",
    defaultCountry: "PH",
    disabledFetchingCountry: false,
    disabled: false,
    placeholder: "",
    disabledFormatting: false,
    required: true,
    enabledCountryCode: true,
    enabledFlags: true,
    validCharactersOnly: true,
    autocomplete: 'off',
    dynamicPlaceholder: true,
    wrapperClasses: 'required-input'
}
const phoneType = ['whatsapp', 'telegram', 'viber', 'line'];
const formattedPhoneNumber = (data, key) => {
    if(data.valid == false || data.valid == undefined) {
      if(key.includes('character_ref')) {
        let arry_key = key.split('-');
        isPhoneFormatted.value['character_ref'][arry_key[Number(1)]] = false;
      } else {
        isPhoneFormatted.value[key] = false;
      }
    } else {
        if(key.includes('character_ref')) {
            let arry_key = key.split('-');
            isPhoneFormatted.value['character_ref'][arry_key[Number(1)]] = true;
        } else {
            isPhoneFormatted.value[key] = true;
        }
    }
}
const selectedMarket = ref();
const selectMarket = ref([]);
// watch tempJobValue for updating Select Market
watch(() => tempJobValue.value, (newValue) => {
    formValues.position_id = newValue;
    selectMarket.value = [];
    formValues.market = [];
    if (newValue != null && newValue != '') {
        let new_job = jobs.value.find(item => item.temp_id == newValue);
        selectedMarket.value = new_job.market; 
        if (new_job != undefined) {
            selectMarket.value = new_job.market.split(',');
            formValues.market = [];
            if(selectMarket.value.length == 1 && !isSelectJobDisabled.value) {
                formValues.market.push(selectMarket.value[0]);
       }
        }
    }
    checkNationality();
}, {immediate: true});

// watching values for other phone type to update phone
watch(() => formValues.other_phone_type, (newValue) => { 
    if(newValue == 'None' || newValue == '' || newValue == null) {
        formValues.other_phone = '';
    }
});

function multipleFieldErrorCheck(object_class, field, index ) {
    if(v$.value[object_class].$errors.length > 0 && v$.value[object_class].$each.$response.$errors != undefined && v$.value[object_class].$each.$response.$errors[index] != undefined && v$.value[object_class].$each.$response.$errors[index][field] != undefined) { 
        return v$.value[object_class].$each.$response.$errors[index][field].map(e => e.$message);
    }
    return [];
}

function toggleCheckboxOnEnter(event, key, index) {
    if(event.keyCode == 13) {
        if(key == 'is_same_as_perm_address') {
            is_same_as_perm_address.value = !is_same_as_perm_address.value;
        } 
        else if(key == 'noExperience') {
            noExperience.value = !noExperience.value;
        } 
        else if(key == 'careerHistoryCheckBox') {
            careerHistoryCheckBox.value[index] = !careerHistoryCheckBox.value[index];
            checkEmployed(event, index);
        } 
    }
}
</script>

<template>
    <template v-if="isShowPreview">
        <preview-component :applicantDetails="formValues" @closePreview="isShowPreview = false" @submitData="submitForm"/>
    </template>
    <section class="faq-info">
        <div class="container">
            <div class="col-md-12">
                <div class="content-head center">
                    <h3 class="center_divider"><em>APPLICANT<span class="highlight-color"> DETAILS</span></em></h3>
                </div>
            </div>
            <v-form @submit.prevent="previewApplication" id="resume-form">
                <v-card class="mb-4 pa-4" elevation="5">
                    <div class="forms-container">
                        <ul class="progressbar">
                        <li v-for="(stepper, index) in stepperList" :key="stepper" :class="[(index + 1 <= activeStepper && isValidStep[index + 1]) ? 'active': '',  (!isValidStep[index + 1] && activeStepper == index + 1) ? 'error': '' ]">
                            {{ stepper }}
                        </li>
                        </ul>
                        <div class="form-input-wrapper">
                            <v-container>
                                <!-- Job Source & Position Desired -->
                                <div class="position-desired" v-show="activeStepper == 1">  
                                    <h4><span class="highlight-color">Job Source</span></h4>
                                    <p class="ma-0 mb-2 pa-0 text-required-field">(<span class="text-red">*</span>) Required fields.</p>
                                    <v-row>
                                        <v-col  xl="6" lg="6" md="6" cols="12">
                                            <v-select class="required-input" v-model="formValues.source" :disabled="isJobSourceDisabled" :items="selectForms.sources" type="text" density="compact" variant="solo" clearable label="Job Source" :error-messages="v$.source.$errors.map(e=> e.$message)">
                                            </v-select>
                                        </v-col>
                                        <v-col  xl="6" lg="6" md="6" cols="12">
                                            <v-text-field class="required-input" v-model.trim="formValues.refer" :error-messages="v$.refer.$errors.map(e=> e.$message)" type="text" density="compact" variant="solo" clearable label="Referred by" v-show="formValues.source && formValues.source.toLowerCase().trim()  == 'referral'"></v-text-field>
                                            <v-text-field class="required-input" v-model.trim="formValues.other_job_source" :error-messages="v$.other_job_source.$errors.map(e=> e.$message)" type="text" density="compact" variant="solo" clearable label="Please specify" v-show="formValues.source && formValues.source.toLowerCase().trim()  == 'other'"></v-text-field>
                                            <v-combobox class="required-input" v-model.trim="formValues.other_job_source" :disabled="isSocMedDisabled" :items="socialsData" :error-messages="v$.other_job_source.$errors.map(e=> e.$message)" type="text" density="compact" variant="solo" clearable label="Please specify" v-show="formValues.source && formValues.source.toLowerCase().trim()  == 'social media'"></v-combobox>
                                        </v-col>
                                    </v-row>
                                    <h4><span class="highlight-color">Position Desired</span></h4>
                                    <v-row>
                                        <v-col cols="12" xl="6" lg="6" md="6">
                                            <v-select class="required-input" v-model="tempJobValue" :disabled="isSelectJobDisabled" :error-messages="v$.position_id.$errors.map(e=> e.$message)" :items="jobs" item-props="props" item-value="temp_id" single-line density="compact"  variant="solo" clearable label="Position Applied For"></v-select>
                                        </v-col>
                                        <v-col cols="12" xl="6" lg="6" md="6">
                                            <v-select class="required-input" v-model="formValues.market" :disabled="isDisabledNationality" :error-messages="v$.market.$errors.map(e=> e.$message)" chips multiple :items="selectMarket" single-line density="compact"  variant="solo" clearable label="Nationality"></v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col xl="4" lg="4" md="6" cols="12">
                                            <v-combobox class="required-input" v-model="formValues.notice_period" :items='selectForms.notice_period' type="text" density="compact" variant="solo" clearable label="Notice Period Required" :error-messages="v$.notice_period.$errors.map(e=> e.$message)"></v-combobox>
                                        </v-col>
                                        <v-col xl="4" lg="4" md="6" cols="12">
                                            <FloatLabel>
                                                <currency-component
                                                    id="salary"
                                                    class="required-input input-form-salary"
                                                    :class="(v$.salary.$errors.map(e=> e.$message).length > 0) ? 'v-field--error' : ''"
                                                    v-model="formValues.salary"
                                                    :currency="(selectedMarket != undefined && selectedMarket != null && selectedMarket.toLowerCase() == 'filipino') ? 'PHP' : 'USD'" 
                                                    locale="en-US"
                                                    mode="currency"
                                                    currencyDisplay="code"
                                                    :max= "999999.00"/>
                                                <label for="input-form-salary">Expected Salary</label>
                                            </FloatLabel>
                                            <div class="custom-error-container py-1 px-3 text-red-darken-4">
                                                <div class="v-messages" role="alert" >
                                                    <div class="messages__message">{{ v$.salary.$errors.map(e=> e.$message).length > 0 ? v$.salary.$errors.map(e=> e.$message)[0].toString() : '' }}</div>   
                                                </div>
                                            </div>
                                        </v-col>
                                        <v-col xl="4" lg="4" md="6" cols="12">
                                            <FloatLabel>
                                                <calendar-component
                                                    id="start-date"
                                                    class="full-calendar required-input input-form-start-date"
                                                    :class="(v$.start_date.$errors.map(e=> e.$message).length > 0) ? 'v-field--error' : ''"
                                                    v-model="formValues.start_date"
                                                    showIcon
                                                    iconDisplay="input"
                                                    clearable 
                                                    today="false"
                                                    :minDate="new Date()"
                                                    :selectOtherMonths="true"
                                                    dateFormat="yy-mm-dd"/>
                                                <label for="input-form-start-date">Date Available to Work</label>
                                            </FloatLabel>
                                            <div class="custom-error-container py-1 px-3 text-red-darken-4">
                                                <div class="v-messages" role="alert" >
                                                    <div class="messages__message">{{ (v$.start_date.$errors.map(e=> e.$message).length > 0) ? v$.start_date.$errors.map(e=> e.$message)[0] : '' }}</div>   
                                                </div>
                                            </div>
                                        </v-col>
                                    </v-row>
                                </div>
                                <!-- Personal Information -->
                                <div class="personal-information" v-show="activeStepper == 2">
                                    <h4><span class="highlight-color">Personal Information</span></h4>
                                    <p class="ma-0 mb-2 pa-0 text-required-field">( <span class="text-red">*</span> ) Required fields.</p>
                                    <v-row>
                                        <v-col xl="4" lg="4" md="4" cols="12">
                                            <v-text-field class="required-input" v-model.trim="formValues.f_name" :error-messages="v$.f_name.$errors.map(e=> e.$message)" type="text" density="compact"  variant="solo" clearable label="First Name (as in Passport)" > </v-text-field>
                                        </v-col>
                                        <v-col xl="4" lg="4" md="4" cols="12">
                                            <v-text-field v-model.trim="formValues.m_name" :error-messages="v$.m_name.$errors.map(e=> e.$message)" type="text" density="compact" variant="solo" clearable label="Middle Name (as in Passport)" > </v-text-field>
                                        </v-col>
                                        <v-col xl="4" lg="4" md="4" cols="12">
                                            <v-text-field class="required-input" v-model.trim="formValues.l_name" :error-messages="v$.l_name.$errors.map(e=> e.$message)" type="text" density="compact"  variant="solo" clearable label="Last Name (as in Passport)" > </v-text-field>
                                        </v-col>
                                        <v-col xl="4" lg="4" md="4" cols="12">
                                            <v-text-field class="required-input" v-model.trim="formValues.nick" :error-messages="v$.nick.$errors.map(e=> e.$message)" type="text" density="compact"  variant="solo" clearable label="Nickname" > </v-text-field>
                                        </v-col>
                                        <v-col xl="4" lg="4" md="4" cols="12">
                                            <v-select class="required-input" v-model="formValues.gender" :items="selectForms.gender" :error-messages="v$.gender.$errors.map(e=> e.$message)" type="text" density="compact"  variant="solo" clearable label="Gender"> </v-select>
                                        </v-col>
                                        <v-col xl="4" lg="4" md="4" cols="12">
                                            <v-combobox class="required-input" v-model="formValues.nationality" :error-messages="v$.nationality.$errors.map(e=> e.$message)" :items="selectForms.nationality" type="text" density="compact" variant="solo" clearable label="Nationality (type your nationality if it's not listed)"></v-combobox>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col xl="4" lg="4" md="4" cols="12">
                                            <FloatLabel>
                                                <calendar-component
                                                    id="birthdate"
                                                    class="full-calendar input-form-birthdate"
                                                    :added-class="'required-input'"
                                                    :class="(v$.birthdate.$errors.map(e=> e.$message).length > 0) ? 'v-field--error' : ''"
                                                    v-model="formValues.birthdate"
                                                    showIcon
                                                    clearable 
                                                    iconDisplay="input"
                                                    :maxDate="new Date(formattedDateAgeMin)"
                                                    :selectOtherMonths="true"
                                                    dateFormat="yy-mm-dd"/>
                                                <label for="input-form-birthdate">Birthdate</label>
                                            </FloatLabel>
                                            <div class="custom-error-container py-1 px-3 text-red-darken-4">
                                                <div class="v-messages" role="alert" >
                                                    <div class="messages__message">{{ (v$.birthdate.$errors.map(e=> e.$message).length > 0) ? v$.birthdate.$errors.map(e=> e.$message)[0] : '' }}</div>   
                                                </div>
                                            </div>
                                        </v-col>

                                        <v-col xl="4" lg="4" md="4" cols="12">
                                            <v-text-field class="required-input" v-model="formValues.age" disabled :error-messages="v$.age.$errors.map(e=> e.$message)" type="text" density="compact"  variant="solo" clearable label="Age" hint="by year"></v-text-field>
                                        </v-col>
                                        <v-col xl="4" lg="4" md="4" cols="12">
                                            <v-select class="required-input" v-model="formValues.civil_status" :items="selectForms.civil_status" :error-messages="v$.civil_status.$errors.map(e=> e.$message)" type="text" density="compact" variant="solo" clearable label="Civil Status"> </v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row class="d-none">
                                        <v-col xl="4" lg="4" md="4" cols="12">
                                            <v-combobox class="required-input" :items="['UMID', 'GSIS', 'Driver\'s License', 'NBI Clearance', 'Postal ID', 'Voter\'s ID', 'TIN']" type="text" density="compact"  variant="solo" clearable label="ID Type"></v-combobox>
                                        </v-col>
                                        <v-col xl="4" lg="4" md="4" cols="12">
                                            <v-text-field class="required-input"  type="text" density="compact" clearable  variant="solo" label="ID Number"></v-text-field>
                                        </v-col>
                                        <v-col xl="4" lg="4" md="4" cols="12">
                                            <date-picker-component :added-class="'required-input'" :label="'Date Issued'"/>
                                        </v-col>
                                    </v-row>
                                    <v-row class="d-none">
                                        <v-col xl="6" lg="6" md="6" cols="12">
                                            <v-text-field  density="compact"  variant="solo" clearable label="Passport Number"></v-text-field>
                                        </v-col>
                                        <v-col xl="6" lg="6" md="6" cols="12">
                                            <date-picker-component :label="'Expiry Date'"/>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col xl="9" lg="9" md="9" cols="12">
                                            <v-text-field class="required-input" v-model.trim="formValues.address" :error-messages="v$.address.$errors.map(e=> e.$message)" type="text" density="compact"  variant="solo" clearable label="Permanent Address">
                                            </v-text-field>
                                        </v-col>
                                        <v-col xl="3" lg="3" md="3" cols="12">
                                            <v-text-field v-model="formValues.zip_code" :error-messages="v$.zip_code.$errors.map(e=> e.$message)" type="text" density="compact" variant="solo" clearable label="Zip Code"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col xl="4" lg="4" md="4" cols="12">
                                          <v-checkbox @keyup="toggleCheckboxOnEnter($event, 'is_same_as_perm_address')" label="Check if same as Permanent Address" class="ma-0 pa-0" v-model="is_same_as_perm_address"></v-checkbox>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col xl="9" lg="9" md="9" cols="12" >
                                            <v-text-field class="required-input" v-model.trim="formValues.current_addr" :error-messages="v$.current_addr.$errors.map(e=> e.$message)" type="text" density="compact"  variant="solo" clearable label="Current Address" :disabled="is_same_as_perm_address"></v-text-field >
                                        </v-col>
                                        <v-col xl="3" lg="3" md="3" cols="12">
                                            <v-text-field v-model="formValues.current_zip" :error-messages="v$.current_zip.$errors.map(e=> e.$message)" type="text" density="compact"  variant="solo" clearable label="Zip Code" :disabled="is_same_as_perm_address"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <p>*Please provide at least two (2) contact details. (Note: Email is required)</p> 
                                    <v-row>
                                        <v-col xl="4" lg="4" md="4" cols="12">
                                            <v-text-field v-model.trim="formValues.email" class="required-input" :error-messages="v$.email.$errors.map(e=> e.$message)" density="compact"  variant="solo" clearable label="Email" prepend-inner-icon="mdi-email"></v-text-field>
                                        </v-col>
                                        <v-col xl="4" lg="4" md="4" cols="12">
                                            <v-text-field v-model.trim="formValues.skype" :error-messages="v$.skype.$errors.map(e=> e.$message)" type="text" density="compact" variant="solo" clearable label="Skype ID" prepend-inner-icon="mdi-skype"></v-text-field>
                                        </v-col>
                                        <v-col xl="4" lg="4" md="4" cols="12">
                                            <vue-tel-input id="phoneNum" label-holder="Phone Number" v-model="formValues.phone" v-bind="vueTelProps" @validate="formattedPhoneNumber($event,'phone')" :class="(v$.phone.$errors.map(e=> e.$message).length > 0) ? 'v-field--error' : (formValues.phone && !isPhoneFormatted['phone']) ? 'v-field--error' : ''"></vue-tel-input>
                                            <div class="custom-error-container py-1 px-3 text-red-darken-4">
                                                <div class="v-messages" role="alert" >
                                                    <div class="messages__message">{{ (v$.phone.$errors.map(e=> e.$message).length > 0) ? v$.phone.$errors.map(e=> e.$message)[0] : (formValues.phone && !isPhoneFormatted['phone']) ? 'Please enter a correct phone format' : '' }}</div>   
                                                </div>
                                            </div>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col  xl="6" lg="6" md="6" cols="12">
                                            <v-select v-model="formValues.other_phone_type" :items="['WhatsApp', 'Telegram', 'Viber', 'Line', 'None']" type="text" density="compact" variant="solo" clearable label="Other Phone" :error-messages="v$.other_phone_type.$errors.map(e=> e.$message)"> 
                                            </v-select>
                                        </v-col>
                                        <v-col  xl="6" lg="6" md="6" cols="12">
                                            <vue-tel-input id="otherPhone"  class="required-input" label-holder="Other Phone Number" v-model="formValues.other_phone" :class="(v$.other_phone.$errors.map(e=> e.$message).length > 0) ? 'v-field--error' : (formValues.other_phone && !isPhoneFormatted['other_phone']) ? 'v-field--error' : ''" v-bind="vueTelProps" @validate="formattedPhoneNumber($event,'other_phone')" v-show="formValues.other_phone_type && phoneType.includes(formValues.other_phone_type.toLowerCase().trim(['whatsapp', 'telegram', 'viber', 'line']) )"></vue-tel-input>
                                            <div class="custom-error-container py-1 px-3 text-red-darken-4">
                                                <div class="v-messages" role="alert" >
                                                    <div class="messages__message">{{ (v$.other_phone.$errors.map(e=> e.$message).length > 0) ? v$.other_phone.$errors.map(e=> e.$message)[0]  : (formValues.other_phone && !isPhoneFormatted['other_phone']) ? 'Please enter a correct phone format' : '' }}</div>   
                                                </div>
                                            </div>
                                        </v-col>
                                    </v-row>
                                </div>

                                <!-- Academic Qualifications -->
                                <div class="academic-language w-add-field" v-show="activeStepper == 3">
                                    <h4><span class="highlight-color">Academic Qualifications</span></h4>
                                    <p class="ma-0 mb-2 pa-0 text-required-field">( <span class="text-red">*</span> ) Required fields.</p>
                                    <v-card class="pa-4 mb-2" elevation="0" v-for="(academic, index) in formValues.qualification" :key="academic">
                                    <div class="d-flex justify-end mb-2">
                                        <v-btn icon="mdi-delete" color="red-darken-2 btn-removeField" size="30" @click="removeItem('qualification', index)" v-if="formValues.qualification.length > 1"></v-btn>
                                    </div>
                                    <v-row>
                                        <v-col xl="4" lg="4" md="6" cols="12">
                                            <v-select type="text" class="required-input" v-model.trim="formValues.qualification[index].qualification_achieved"  :items="selectForms.qualification_achieved" density="compact" :error-messages="multipleFieldErrorCheck('qualification', 'qualification_achieved', index)" variant="solo" clearable label="Qualification Achieved"></v-select>
                                        </v-col>
                                        <v-col xl="4" lg="4" md="6" cols="12">
                                            <v-text-field type="text" v-model.trim="formValues.qualification[index].major" density="compact" :error-messages="multipleFieldErrorCheck('qualification', 'major', index)" variant="solo" clearable label="Major"></v-text-field>
                                        </v-col>
                                        <v-col xl="4" lg="4" md="6" cols="12">
                                            <v-text-field type="text" class="required-input" v-model.trim="formValues.qualification[index].institution" :error-messages="multipleFieldErrorCheck('qualification', 'institution', index)" density="compact" clearable variant="solo" label="Name of Institution"></v-text-field>
                                        </v-col>
                                        <v-col xl="4" lg="4" md="6" cols="12">
                                            <v-autocomplete class="required-input" v-model.trim="formValues.qualification[index].country" :error-messages="multipleFieldErrorCheck('qualification', 'country', index)" density="compact" clearable variant="solo" label="Country" :items="countriesData"></v-autocomplete>
                                        </v-col>

                                        <v-col xl="4" lg="4" md="6" cols="12">
                                            <FloatLabel>
                                                <calendar-component   
                                                    id="from-qualif"
                                                    class='required-input input-form-from-qualif'
                                                    :class = "(multipleFieldErrorCheck('qualification', 'from', index).length > 0 ) ? 'v-field--error': ''"
                                                    v-model="formValues.qualification[index].from"
                                                    showIcon
                                                    view="year"
                                                    :maxDate="new Date()"
                                                    :yearRange="yearRange"
                                                    clearable 
                                                    dateFormat="yy"/>
                                                <label for="input-form-from-qualif" >From</label>
                                            </FloatLabel>
                                            <div class="custom-error-container py-1 px-3 text-red-darken-4">
                                                <div class="v-messages" role="alert" >
                                                    <div class="messages__message">{{ multipleFieldErrorCheck('qualification', 'from', index).length > 0 ? multipleFieldErrorCheck('qualification', 'from', index)[0] : '' }}</div>   
                                                </div>
                                            </div>
                                        </v-col>
                                        <v-col xl="4" lg="4" md="6" cols="12">
                                            <FloatLabel>
                                                <calendar-component   
                                                    id="to-qualif"
                                                    v-model="formValues.qualification[index].to"
                                                    class='required-input input-form-to-qualif'  
                                                    :class = "(multipleFieldErrorCheck('qualification', 'to', index).length > 0 ) ? 'v-field--error': ''"
                                                    showIcon
                                                    view="year"
                                                    :maxDate="new Date()" 
                                                    clearable  
                                                    dateFormat="yy"/>    
                                                <label for="input-form-to-qualif" >To</label>
                                            </FloatLabel>
                                            <div class="custom-error-container py-1 px-3 text-red-darken-4">
                                                <div class="v-messages" role="alert" >
                                                    <div class="messages__message">{{ multipleFieldErrorCheck('qualification', 'to', index).length > 0 ? multipleFieldErrorCheck('qualification', 'to', index)[0] : '' }}</div>   
                                                </div>
                                            </div>
                                        </v-col>
                                    </v-row>
                                    </v-card>
                                    <v-btn size="30" class="my-4 btn-addfield" color="success" block @click="addItem('qualification')" :disabled="formValues.qualification.length == 5">Add Academic Qualification &#43;</v-btn>
                                    <h4 class="d-none"><span class="highlight-color">Other training, certification or licenses held</span></h4>
                                    <v-row class="d-none">
                                        <v-col>
                                            <v-textarea type="text" density="compact" clearable variant="filled" label="Other training, certification or licenses held" prepend-inner-icon="mdi-briefcase" rows="5" color="blue-darken-4" ></v-textarea>
                                        </v-col>
                                    </v-row>
                                    <h4><span class="highlight-color">Language</span></h4>
                                    <v-card class="pa-4 mb-2" elevation="0" v-for="(language , index) in formValues.language" :key="language">
                                        <div class="d-flex justify-end mb-2">
                                            <v-btn icon="mdi-delete" color="red-darken-2 btn-removeField" size="30" @click="removeItem('language', index)" v-if="formValues.language.length > 1"></v-btn>
                                        </div>
                                        <v-row>
                                            <v-col xl="4" lg="4" cols="12">
                                                <v-text-field class="required-input" type="text" density="compact" v-model.trim="formValues.language[index].language" :error-messages="multipleFieldErrorCheck('language', 'language', index)" variant="solo" clearable label="Language(s)" ></v-text-field>
                                            </v-col>
                                            <v-col xl="4" lg="4" md="6" cols="12">
                                                <v-text-field class="required-input" type="number" density="compact" v-model="formValues.language[index].spoken" :error-messages="multipleFieldErrorCheck('language', 'spoken', index)" variant="solo" clearable label="Spoken 1(Poor) - 5(Excellent)" :min="1" :max="5"></v-text-field>
                                            </v-col>
                                            <v-col xl="4" lg="4" md="6" cols="12">
                                                <v-text-field class="required-input" type="number" density="compact" v-model="formValues.language[index].written" :error-messages="multipleFieldErrorCheck('language', 'written', index)" clearable variant="solo" label="Written 1(Poor) - 5(Excellent)" :min="1" :max="5"></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                    <v-btn size="30" class="my-4 btn-addfield" color="success" block @click="addItem('language')" :disabled="formValues.language.length == 5">Add Language &#43;</v-btn>
                                </div>

                                <!-- Career History -->
                                <div class="career-character w-add-field" v-show="activeStepper == 4">
                                    <h4><span class="highlight-color">Career History</span></h4>
                                    <p class="ma-0 mb-2 pa-0 text-required-field">( <span class="text-red">*</span> ) Required fields.</p>
                                    <v-checkbox @keyup="toggleCheckboxOnEnter($event, 'noExperience')" label="Check if not applicable" v-model="noExperience"></v-checkbox>
                                    <v-card class="pa-3 mb-2" elevation="0" v-for="(career , index) in formValues.career" :key="career">
                                        <div class="d-flex justify-end mb-2 ">
                                            <v-btn icon="mdi-delete" size="30" color="red-darken-2 btn-removeField" @click="removeItem('career', index)" v-if="formValues.career.length > 1"></v-btn>
                                        </div>
                                        <v-row>
                                            <v-col xl="4" lg="4" cols="12">
                                                <v-text-field type="text" class="required-input" density="compact" v-model.trim="formValues.career[index].company_name" :error-messages="multipleFieldErrorCheck('career', 'company_name', index)"  variant="solo" clearable label="Company Name" ></v-text-field>
                                            </v-col>
                                            <v-col xl="4" lg="4" md="6" cols="12">
                                                <v-text-field type="text" class="required-input" density="compact" v-model.trim="formValues.career[index].position_held" :error-messages="multipleFieldErrorCheck('career', 'position_held', index)" variant="solo" clearable label="Position Held" ></v-text-field>
                                            </v-col>
                                            <v-col xl="4" lg="4" md="6" cols="12">
                                            <FloatLabel>
                                                <currency-component 
                                                    id="salary-package"
                                                    class="required-input exsalary input-form-salary-package" 
                                                    v-model="formValues.career[index].salary_package"
                                                    :class = "(multipleFieldErrorCheck('career', 'salary_package', index).length > 0 ) ? 'v-field--error': ''"
                                                    :currency="(selectedMarket != undefined && selectedMarket != null && selectedMarket.toLowerCase() == 'filipino') ? 'PHP' : 'USD'" 
                                                    locale="en-US"
                                                    mode="currency"
                                                    currencyDisplay="code"
                                                    clearable
                                                    :max= "999999.00"/>
                                                <label for="input-form-salary-package">Salary Package</label>
                                            </FloatLabel>
                                            <div class="custom-error-container py-1 px-3 text-red-darken-4">
                                                <div class="v-messages" role="alert" >
                                                    <div class="messages__message">{{ multipleFieldErrorCheck('career', 'salary_package', index).length > 0 ? multipleFieldErrorCheck('career', 'salary_package', index)[0] : '' }}</div>   
                                                </div>
                                            </div>
                                            </v-col>
                                            <v-col xl="4" lg="4" md="6" cols="12">
                                            <FloatLabel>
                                                <calendar-component   
                                                    id="from-career"
                                                    class="required-input input-form-from-career"
                                                    :class = "(multipleFieldErrorCheck('career', 'from', index).length > 0 ) ? 'v-field--error': ''"
                                                    v-model:modelValue="formValues.career[index].from"
                                                    showIcon
                                                    :maxDate="new Date()" 
                                                    clearable 
                                                    :selectOtherMonths="true"
                                                    dateFormat="yy-mm-dd"/>
                                                <label for="input-form-from-career" >From</label>
                                            </FloatLabel>
                                            <div class="custom-error-container py-1 px-3 text-red-darken-4">
                                                <div class="v-messages" role="alert" >
                                                    <div class="messages__message">{{ multipleFieldErrorCheck('career', 'from', index).length > 0 ? multipleFieldErrorCheck('career', 'from', index)[0] : '' }}</div>   
                                                </div>
                                            </div>
                                            </v-col>
                                            <v-col xl="4" lg="4" md="6" cols="12" v-if="!careerHistoryCheckBox[index]">
                                                <FloatLabel>
                                                    <calendar-component   
                                                    id="to-career"
                                                    class="required-input input-form-to-career" 
                                                    v-model:modelValue="formValues.career[index].to"
                                                    :class = "(multipleFieldErrorCheck('career', 'to', index).length > 0 ) ? 'v-field--error': ''"
                                                    :index="index"
                                                    showIcon
                                                    :maxDate="new Date()"
                                                    clearable 
                                                    :selectOtherMonths="true"
                                                    dateFormat="yy-mm-dd"/>    
                                                    <label for="input-form-to-career" >To</label>
                                                </FloatLabel>
                                                <div class="custom-error-container py-1 px-3 text-red-darken-4">
                                                    <div class="v-messages" role="alert" >
                                                        <div class="messages__message">{{ multipleFieldErrorCheck('career', 'to', index).length > 0 ? multipleFieldErrorCheck('career', 'to', index)[0] : '' }}</div>   
                                                    </div>
                                                </div>
                                            </v-col>
                                            <v-col xl="4" lg="4" md="6" cols="12">
                                                <v-checkbox label="Check if still employed" class="ma-0 pa-0" @keyup="toggleCheckboxOnEnter($event, 'careerHistoryCheckBox', index )" @change="checkEmployed($event, index)" v-model="careerHistoryCheckBox[index]"></v-checkbox>
                                            </v-col>
                                            <v-col cols="12" class="mt-0">
                                                <v-textarea rows="2" density="compact" v-model.trim="formValues.career[index].reason_for_leaving" :error-messages="multipleFieldErrorCheck('career', 'reason_for_leaving', index)" variant="solo" clearable label="Reason For Leaving" ></v-textarea>
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                    <v-btn class="my-3 btn-addfield" size="30" block color="success"  @click="addItem('career')" v-if="!noExperience" :disabled="formValues.career.length == 5">Add Career History &#43;</v-btn>
                                    <!-- Family Background
                                    <h4 class="d-none"><span class="highlight-color">Family Background</span></h4>
                                    <v-card class="pa-4 mb-2 d-none" elevation="0" v-for="(family , index) in formValues.family" :key="family">
                                        <div class="d-flex justify-end mb-2">
                                            <v-btn icon="mdi-delete" size="30" color="red-darken-2 btn-removeField" @click="removeItem('family', index)" v-if="formValues.family.length > 1"></v-btn>
                                        </div>
                                        <v-row>
                                            <v-col xl="3" lg="3" md="6" cols="12">
                                                <v-text-field type="text" class="required-input" density="compact" variant="solo" clearable label="Full Name" ></v-text-field>
                                            </v-col>
                                            <v-col xl="3" lg="3" md="6" cols="12">
                                                <v-text-field type="text" class="required-input" density="compact" variant="solo" clearable label="Relationship" ></v-text-field>
                                            </v-col>
                                            <v-col xl="3" lg="3" md="6" cols="12">
                                                <v-text-field type="number" class="required-input" density="compact" variant="solo" label="Age" ></v-text-field>
                                            </v-col>
                                            <v-col xl="3" lg="3" md="6" cols="12">
                                                <v-text-field type="text" class="required-input" density="compact" variant="solo" label="Occupation" ></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                    <v-btn class="my-3 btn-addfield d-none" size="30" block color="success"  @click="addItem('family')" :disabled="formValues.family.length == 5">Add Family Background &#43;</v-btn> -->
                                    <!-- Character Reference -->
                                    <h4><span class="highlight-color">Character Reference</span></h4>
                                    <v-card class="pa-4 mb-2" elevation="0" v-for="(character_ref , index) in formValues.character_ref" :key="character_ref">
                                        <div class="d-flex justify-end mb-2">
                                            <v-btn icon="mdi-delete" size="30" color="red-darken-2 btn-removeField" @click="removeItem('character_ref', index)" v-if="formValues.character_ref.length > 1"></v-btn>
                                        </div>
                                        <v-row>
                                            <v-col xl="4" lg="4" md="6" cols="12">
                                                <v-text-field type="text" class="required-input" density="compact" v-model.trim="formValues.character_ref[index].full_name" :error-messages="multipleFieldErrorCheck('character_ref', 'full_name', index)" variant="solo" clearable label="Full Name" ></v-text-field>
                                            </v-col>
                                            <v-col xl="4" lg="4" md="6" cols="12">
                                                <v-text-field type="text" class="required-input" density="compact" v-model.trim="formValues.character_ref[index].company_name" :error-messages="multipleFieldErrorCheck('character_ref', 'company_name', index)" variant="solo" clearable  label="Company Name" ></v-text-field>
                                            </v-col>
                                            <v-col xl="4" lg="4" md="6" cols="12">
                                                <v-text-field type="text" class="required-input" density="compact" v-model.trim="formValues.character_ref[index].position" :error-messages="multipleFieldErrorCheck('character_ref', 'position', index)" variant="solo" clearable label="Position" ></v-text-field>
                                            </v-col>
                                            <v-col xl="4" lg="4" md="6" cols="12">
                                                <v-text-field type="text" class="required-input" density="compact" v-model.trim="formValues.character_ref[index].relationship" :error-messages="multipleFieldErrorCheck('character_ref', 'relationship', index)" variant="solo" clearable label="Relationship with Applicant (e.g. Supervisor)" ></v-text-field>
                                            </v-col>
                                            <v-col xl="4" lg="4" md="6" cols="12">
                                                <vue-tel-input class="required-input" id="phoneNum" label-holder="Phone Number" v-model="formValues.character_ref[index].contact_number" v-bind="vueTelProps" @validate="formattedPhoneNumber($event, `character_ref-${index}`)" :class="multipleFieldErrorCheck('character_ref', 'contact_number', index).length > 0 ? 'v-field--error' : (formValues.character_ref[index].contact_number != '' && formValues.character_ref[index].contact_number != undefined && formValues.character_ref[index].contact_number != null && !isPhoneFormatted['character_ref'][index]) ? 'v-field--error' : ''"></vue-tel-input>
                                                <div class="custom-error-container py-1 px-3 text-red-darken-4">
                                                    <div class="v-messages" role="alert" >
                                                        <div class="messages__message">{{ multipleFieldErrorCheck('character_ref', 'contact_number', index).length > 0 ? multipleFieldErrorCheck('character_ref', 'contact_number', index)[0] : (formValues.character_ref[index].contact_number != '' && formValues.character_ref[index].contact_number != undefined && formValues.character_ref[index].contact_number != null && !isPhoneFormatted['character_ref'][index]) ? 'Please enter a correct phone format' : '' }}</div>   
                                                    </div>
                                                </div>
                                            </v-col>
                                            <v-col xl="4" lg="4" md="6" cols="12">
                                            <v-text-field v-model.trim="formValues.character_ref[index].email" :error-messages="multipleFieldErrorCheck('character_ref', 'email', index)" density="compact"  variant="solo" clearable label="Email" prepend-inner-icon="mdi-email"></v-text-field>
                                        </v-col>
                                        </v-row>
                                    </v-card>
                                    <v-btn class="my-3 btn-addfield" size="30" block color="success"  @click="addItem('character_ref')" :disabled="formValues.character_ref.length == 5">Add Character Reference &#43;</v-btn>
                                </div>
                                <!-- Resume and Image -->
                                <div class="resume-image" v-show="activeStepper == 5">
                                    <h4><span class="highlight-color">Resume & Image</span></h4>
                                    <p class="ma-0 mb-2 pa-0 text-required-field">( <span class="text-red">*</span> ) Required fields.</p>
                                    <v-row>
                                        <v-col xl="6" lg="6" md="6" cols="12">
                                            <v-file-input class="required-input"  :error-messages="v$.cv_doc.$errors.map(e=> e.$message)" type="file" density="compact" variant="solo" clearable label="Upload Resume" hint="Upload with pdf file." prepend-icon="" append-inner-icon="mdi-paperclip"  accept=".pdf" @change="uploadedResume" @click:clear="clearFile('resume')" > </v-file-input>
                                        </v-col>
                                        <v-col xl="6" lg="6" md="6" cols="12">
                                            <v-file-input class="required-input" :error-messages="v$.profile.$errors.map(e=> e.$message)" type="file" density="compact" variant="solo" clearable label="Please Upload ID Picture" hint="Upload with jpeg or png file." prepend-icon="" append-inner-icon="mdi-camera" accept="image/jpeg, image/png, image/jpg, .jpg, .png, .tif, .tiff, .bmp" @change="uploadedImage" @click:clear="clearFile('image')"> </v-file-input> 
                                        </v-col>
                                    </v-row>

                                    <div id="html_element">
                                        <vue-recaptcha v-show="showRecaptcha" sitekey="6LciYJEUAAAAAOO6tdXC6xNI9OC7ySdDNf12Gd7T"
                                            size="normal" 
                                            theme="light"
                                            hl="en"
                                            @verify="recaptchaVerified"
                                            @expire="recaptchaExpired"
                                            @fail="recaptchaFailed"
                                            @error="recaptchaError"
                                            ref="captcha">
                                        </vue-recaptcha>
                                    <div class="invalid-inputs" v-show="!isValidCaptcha">Please Verify Captcha</div>
                                    </div>

                                </div>
                            </v-container>
                            <div class="btn-stepper">
                                <v-btn class="float-left action-buttons" prepend-icon="mdi-chevron-left" rounded="xl" color="success" @click="prevStepper" v-show="activeStepper > 1 && !isSubmitting" >
                                    Previous
                                </v-btn>
                                <v-btn class="float-right action-buttons" append-icon="mdi-chevron-right"  rounded="xl" color="success" @click="nextStepper" v-show="activeStepper < stepperList.length">
                                    Next
                                </v-btn>
                                <v-btn class="submit-button float-right" color="primary" type="submit" v-if="stepperList.length == activeStepper">Submit</v-btn>
                            </div>
                        </div>
                    </div>
                </v-card>
            </v-form>
        </div>
    </section>
</template>

<style scoped src="../assets/css/resume-form-view.css"></style>