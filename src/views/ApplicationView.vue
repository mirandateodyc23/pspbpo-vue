<script setup>
import JobApplication from '../services/JobApplication';
import ApplicantStatus from '../models/ApplicantStatus';
import CheckApplication from '../models/CheckApplication';
import { useRouter } from 'vue-router';
import { ref, reactive, onMounted } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import vueRecaptcha from 'vue3-recaptcha2';
import Swal from 'sweetalert2';

// router functions
const router = useRouter();

// models
const applicantStatus = ref(new ApplicantStatus());
const checkApplication = new CheckApplication();
// profile pic base64
const profilePic = ref(null);

// forms
const formValues = reactive(checkApplication);
const rules = checkApplication.rules();
const v$ = useVuelidate(rules, formValues);
const isSubmitting = ref(false);

// captcha
const showRecaptcha = ref(true);
const captcha = ref(null);
const isValidCaptcha = ref(false);

// for checking token
const isTokenCheckRunning = ref(false);
const tokenCheckInterval = ref();

// converting blob to base64
async function getFile(filename) {
  const response = await JobApplication.getFile(filename);
  profilePic.value = response.data;

}

// submit/check status
async function checkStatus() {
  // if token check is running will not validate, else will validate
  const isValid = isTokenCheckRunning.value ? true : await v$.value.$validate();
  if(isTokenCheckRunning.value) {
    isValidCaptcha.value = true;
  }
  
  if (!isValid || !isValidCaptcha.value) return;
  isSubmitting.value = true;

  const response = await JobApplication.checkApplicationStatus(formValues);
  // success
  if (response.data != undefined && response.data.success) {
    applicantStatus.value = response.data;
    if(profilePic.value == null) {
      getFile(response.data.data.profile_pic);
    }
    checkToken();
  } else {
    applicantStatus.value.success = false;
    const textError = (response.response != undefined) ? response.response.data.message : (response.data != undefined) ?  response.data.message : response.message;
    // token expired, and check token is running
    if(textError == 'The token expired.' && isTokenCheckRunning.value) {
      localStorage.removeItem('t');
      localStorage.removeItem('r');
      clearInterval(tokenCheckInterval.value);
      isTokenCheckRunning.value = false;
      profilePic.value = null;
      Swal.fire({
        title: "Your session has expired",
        text: "Please re-input your reference code and email address", 
        icon: "warning",
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonText: "Ok"
      }).then((result) => {
            if(result.isConfirmed) {
              router.go();
            }
        });
    }
    // error general
    else {
      Swal.fire({
        title: "Error",
        text: textError, 
        icon: "error",
        allowOutsideClick: true,
        allowEscapeKey: true,
        confirmButtonText: "Close"
      });
      localStorage.removeItem('t');
      localStorage.removeItem('r');
    }
  }
  isSubmitting.value = false;
}

// callback for captcha
function recaptchaVerified() {
  isValidCaptcha.value = true;
}

function recaptchaExpired() {
  isValidCaptcha.value = false;
  captcha.value.reset();
}

function recaptchaFailed() {
  isValidCaptcha.value = false;
}

function recaptchaError() {
  isValidCaptcha.value = false;
}

onMounted(() => { 
 let token = localStorage.getItem('t');
 let ref_code = localStorage.getItem('r');
// will run a token check if there is token and ref code
 if(token != null && ref_code != null) {
  checkToken();
 } else {
  clearInterval(tokenCheckInterval.value);
  localStorage.removeItem('t');
  localStorage.removeItem('r');
 }
});

function checkToken() {
  if(isTokenCheckRunning.value){
    return;
  } else {
    isTokenCheckRunning.value = true;
    if(!applicantStatus.value.success) {
      checkStatus();
    }
    tokenCheckInterval.value = setInterval(checkStatus, 122 * 1000)
  } 
}

function formatDate(d, format = 1) {
  
  const date = new Date(d);
  if(format == 1) {
    return `${date.getDate()}-${date.toLocaleString('default', { month: 'short' })}-${date.getFullYear()} ${date.toLocaleTimeString()}`
  }
  return `${date.getDate()}-${date.toLocaleString('default', { month: 'short' })}-${date.getFullYear()}`
}

</script>

<template>
  <section class="faq-info">
    <div class="content-head center">
      <h3 class="center_divider">
        <em>Application <span class="highlight-color">Status</span></em>
      </h3>
    </div>
    <v-card class="mx-auto px-6 py-8" max-width="344" :loading="isSubmitting" elevation="7" v-if="!applicantStatus.success && !applicantStatus.data">
      <v-form @submit.prevent="checkStatus()">
        <p class="text-center">
          Please enter the following information to check the status of your application.
        </p>
        <v-text-field variant="solo" v-model="formValues.email" :error-messages="v$.email.$errors.map((e) => e.$message)"
          label="Email" density="compact" />
        <v-text-field variant="solo" density="compact" v-model="formValues.reference_code"
          :error-messages="v$.reference_code.$errors.map((e) => e.$message)" label="Reference Code" />
        <vue-recaptcha v-show="showRecaptcha" sitekey="6LciYJEUAAAAAOO6tdXC6xNI9OC7ySdDNf12Gd7T" size="normal"
          theme="light" hl="en" @verify="recaptchaVerified" @expire="recaptchaExpired"
          @fail="recaptchaFailed" @error="recaptchaError" ref="captcha">
        </vue-recaptcha>
        <div class="invalid-inputs" v-show="!isValidCaptcha">Please Verify Captcha</div>
        <br />
        <v-btn block color="success" size="large" type="submit" :loading="isSubmitting">
          Check Status
        </v-btn>
      </v-form>
    </v-card>

    <div class="pa-10" v-else-if="applicantStatus.success && applicantStatus.data">
      <v-card class="pa-4">
        <v-row>
          <v-col sm="12" md="12" lg="4" xl="4" xxl="4">
            <div class="resume-img-container mb-5">
                <v-sheet class="header">
                  <v-img max-width="200" min-height="200"
                    :src="profilePic">
                  </v-img>
                  <h1>
                  <span class="font-weight-bold job-info header-title">Welcome, {{ applicantStatus.data.nickname }}!
                    </span>
                  </h1>
                </v-sheet>
            </div>
          </v-col>
          <v-col sm="12" md="6" lg="4" xl="4" xxl="4">
            <v-container class="bg-surface-variant">
              <h3>Applicant Status</h3>
                <v-sheet class="pa-2 ma-2">
                  <p>
                    <span class="font-weight-bold job-info">Job Applied: </span> {{ applicantStatus.data.title }}
                  </p>
                  <p>
                    <span class="font-weight-bold job-info">Market: </span> {{ applicantStatus.data.job_nationality }}
                  </p>
                  <p>
                    <span class="font-weight-bold job-info">Date Applied: </span> {{ formatDate(applicantStatus.data.application_datetime) }}
                  </p>
                  <p>
                    <span class="font-weight-bold job-info">Current Status: </span> {{ applicantStatus.data.status }}
                  </p>
                  <p v-if="applicantStatus.data.interview_datetime != null">
                    <span class="font-weight-bold job-info">Interview Date: </span> {{ formatDate(applicantStatus.data.interview_datetime) }}
                  </p>
                  <p v-if="applicantStatus.data.exam_datetime != null">
                    <span class="font-weight-bold job-info">Exam Date: </span> {{ formatDate(applicantStatus.data.exam_datetime) }}
                  </p>
                </v-sheet>
            </v-container>
          </v-col>
          <v-col sm="12" md="6" lg="4" xl="4" xxl="4">
            <v-container class="bg-surface-variant">
              <h3>Personal Information</h3>
                <v-sheet class="pa-2 ma-2">
                  <p>
                    <span class="font-weight-bold job-info">Email:</span> {{ applicantStatus.data.email }}
                  </p>
                  <p>
                    <span class="font-weight-bold job-info">Full Name:</span> {{ applicantStatus.data.passport_name }}
                  </p>
                  <p>
                    <span class="font-weight-bold job-info">Nickname:</span> {{ applicantStatus.data.nickname }}
                  </p>
                  <p>
                    <span class="font-weight-bold job-info">Nationality:</span> {{ applicantStatus.data.nationality }}
                  </p>
                  <p>
                    <span class="font-weight-bold job-info">Birthdate:</span> {{ formatDate(applicantStatus.data.birth_date, 0) }}
                  </p>
                  <p>
                    <span class="font-weight-bold job-info">Age:</span> {{ applicantStatus.data.age }}
                  </p>
                </v-sheet>
            </v-container>
          </v-col>
        </v-row>
         
          

      </v-card>
    </div>
  </section>
</template>

<style scoped src="../assets/css/application-view.css"></style>
