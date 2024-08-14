<script setup>
import { ref, computed} from 'vue';
import Applicant from '@/models/Applicant.js';
import formatValue from '@/helpers/formatValue.js'
import selectForms from '../assets/json/select-forms.json';

const isShowDialog = ref(true);
const props = defineProps({
    applicantDetails: {
        required: true,
        type: Applicant
    }
});
const isBtnDisabled = ref(false);
const emits = defineEmits(['closePreview', 'submitData']);
const displayPreview = ref([
    {
        "header": "Job Source & Position Desired",
        "fields": {
            "source" : "Job Source",
            "position" : "Position Applied",
            "market" : "Nationality",
            "notice_period" : "Notice Period Required",
            "salary" : "Expected Salary",
            "start_date" : "Date Available to Work"
        }
    },
    {
        "header": "Personal Information",
        "fields": {
            "f_name" : "First Name",
            "m_name" : "Middle Name",
            "l_name" : "Last Name",
            "nick": "Nickname",
            "birthdate" : "Birthdate",
            "age": "Age",
            "gender" : "Gender",
            "nationality": "Nationality",
            "civil_status" : "Civil Status",
            "address": "Permanent Address",
            "zip_code": "Zip Code",
            "current_addr": "Current Address",
            "current_zip": "Current Zip Code",
            "email": "Email",
            "skype": "Skype",
            "phone": "Phone",
            "other_phone_type": "Other Phone Type",
            "other_phone": "Other Phone"
        }
    },
    {
        "header": "Academic Qualifications",
        "base_class": "qualification",
        "fields": {
            "qualification_achieved": "Qualification Achieved",
            "major": "Major",
            "institution": "Name of Institution",
            "country": "Country",
            "from": "From",
            "to": "To"
        }
    },
    {
        "header": "Language",
        "base_class": "language",
        "fields": {
            "language": "Language",
            "spoken": "Spoken",
            "written": "Written"
        }
    },
    {
        "header": "Career History",
        "base_class": "career",
        "fields": {
            "company_name": "Company Name",
            "position_held": "Position Held",
            "salary_package": "Salary Package",
            "from": "From",
            "to": "To",
            "reason_for_leaving": "Reason For Leaving"
        }
    },
    {
        "header": "Character Reference",
        "base_class": "character_ref",
        "fields": {
            "full_name": "Full Name",
            "company_name": "Company Name",
            "position": "Position",
            "relationship": "Relationship",
            "contact_number": "Phone Number",
            "email": "Email"
        }
    }
]);

function closePreview () {
    isShowDialog.value = false;
    emits('closePreview');
}

function submit() {
    isBtnDisabled.value = true;
    emits('submitData');
}

const imgSrc = computed(() => {
    return (props.applicantDetails['profile'] != undefined) ? URL.createObjectURL(props.applicantDetails['profile']) : '';
});

const pdfSrc = computed(() => {
    return (props.applicantDetails['cv_doc'] != undefined) ? URL.createObjectURL(props.applicantDetails['cv_doc']) : '';
});

const fieldsToFormat = ref(['salary', 'salary_package', 'from', 'to', 'start_date', 'birthdate']);
const fieldsToCheck = ref(['market', 'current_addr', 'current_zip', 'source', 'gender', 'civil_status', 'qualification_achieved']);

function displayCheck(key, value) {
    if(key == 'market') {
        return value.toString();
    }
    else if ((key == 'current_addr' || key == 'current_zip') && !value) { 
        return (key == 'current_addr' ? props.applicantDetails['address'] : props.applicantDetails['zip_code']);
    } else if (key == 'source') {
       if(value.trim().toLowerCase() == 'social media' || value.trim().toLowerCase() == 'other') {
            return props.applicantDetails['other_job_source'];
       } else if (value.trim().toLowerCase() == 'referral') {
            return props.applicantDetails['refer'];
       }
    } else if (key == 'gender' || key == 'civil_status' || key == 'qualification_achieved') {
        const jsonData = selectForms[key].find(data => data.value == value);
        return jsonData.title;
    }
    return value;
}
</script>

<template>
    <v-dialog v-model="isShowDialog" width="1300" id="modalPreview" :persistent="true">
        <v-card>
            <v-card-item>
                <v-card-title>
                    Please confirm that all your details are correct.
                </v-card-title>
            </v-card-item>
            <v-card-text>
                <div>
                    <template v-for="form in displayPreview" :key="form.header">
                        <h3 class="header-title"><span class="highlight-color">{{ form.header }}</span></h3> 
                        <div class="pa-2">
                            <template v-if="form.base_class == undefined" >
                                <p v-for="(field, fieldKey) in form.fields" :key="field"><b>{{ field }}:</b> {{ (fieldsToFormat.includes(fieldKey)) ? formatValue(props.applicantDetails, props.applicantDetails[fieldKey], fieldKey) : (fieldsToCheck.includes(fieldKey)) ? displayCheck(fieldKey, props.applicantDetails[fieldKey]) : props.applicantDetails[fieldKey] }}</p>
                            </template>
                            <template v-else>
                                <template v-for="(classField, index) in props.applicantDetails[form.base_class]" :key="classField">
                                    <p v-for="(field, fieldKey) in form.fields" :key="fieldKey"><b>{{ field }}:</b> {{ (fieldsToFormat.includes(fieldKey)) ? formatValue(props.applicantDetails, props.applicantDetails[form.base_class][index][fieldKey], form.base_class, fieldKey) : (fieldsToCheck.includes(fieldKey)) ? displayCheck(fieldKey, props.applicantDetails[form.base_class][index][fieldKey]) : props.applicantDetails[form.base_class][index][fieldKey] }}</p>
                                     <hr v-if="props.applicantDetails[form.base_class].length != index + 1 " color="#BDBDBD"/>
                                </template>
                                <h4 class="text-center" v-if="form.base_class == 'career' && props.applicantDetails[form.base_class].length == 0">
                                    <em>Not Applicable.</em>
                                </h4>
                            </template>
                        </div>                  
                    </template>
                    <h3 class="header-title"><span class="highlight-color">Resume</span></h3> 
                    <div class="pa-2">
                        <p> <b> Uploaded Resume: </b> <a class="text-blue-darken-4" :href="pdfSrc" target="_blank"> {{ props.applicantDetails['cv_doc'].name }}</a> </p>
                        <p> <b> ID Picture: </b> <a class="text-blue-darken-4" :href="imgSrc" target="_blank" >{{ props.applicantDetails['profile'].name }}</a> </p>
                    </div>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-btn  class="pa-2" rounded="xl" size="large" @click="closePreview">Cancel</v-btn>
                <v-btn  class="pa-2" rounded="xl" size="large" @click.once="submit" :disabled="isBtnDisabled">Confirm</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style src="../assets/css/preview-component.css"></style> 