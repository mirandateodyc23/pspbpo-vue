<script setup>
import Calendar from 'primevue/calendar';
</script>

<template>
    <Calendar
    ></Calendar>
</template>

<style>
.p-float-label {
    box-shadow: none;
    background-color: #ffffee57;
    border-bottom: 1px solid #a3a3a3;
    border-radius: 2px;
    min-height: 48px;
}

.p-inputtext:enabled:focus {
    outline: none;
}

.p-inputtext {
    padding: 16px 16px 5px;
    outline: none !important;
}

.p-calendar button svg  {
    display: none;
}

.p-calendar button:before {
    content: "\F00ED";
    display: inline-block;
    font: normal normal normal 24px / 1 "Material Design Icons";
    font-size: inherit;
    text-rendering: auto;
    line-height: inherit;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    opacity: 0.6;
    font-size: 24px;
}

.p-inputwrapper-filled {
    background-color: #eaf9ff;
}

.p-float-label {
    transition: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    transition-property: opacity, transform;
    box-shadow: none;
    background-color: #ffffee57;
    border-bottom: 1px solid #a3a3a3;
    border-radius: 2px;
    min-height: 48px;
}

.p-float-label label {
    font-size: 1rem;
    color: rgba(0, 0, 0, 0.87);
    opacity: .6;
    top: 40%;
}

.p-float-label:has(.p-inputwrapper-filled) label, 
.p-float-label:has(.p-inputwrapper-focus) label, 
.p-float-label:has(input.p-filled) label, 
.p-float-label:has(input:-webkit-autofill) label, 
.p-float-label:has(input:focus) label, 
.p-float-label:has(textarea.p-filled) label, 
.p-float-label:has(textarea:focus) label {
    color: rgba(0, 0, 0, 0.87) !important;
    opacity: 0.6 !important;
    top: 5px !important;
    font-size: 12px;
}

/* Datepicker - Year*/
.p-datepicker {
    font-family: 'Raleway';
    padding: 12px 12px 22px;
}

.p-datepicker-header {
    border-bottom: none;
    padding: 10px 0px 20px;
    font-size: .875rem;
}

.p-datepicker-calendar-container table.p-datepicker-calendar {
    font-size: .9rem;
}
.p-datepicker-calendar-container table.p-datepicker-calendar tr th {
    text-align: center;
    width: 45px;
}
.p-datepicker-calendar-container table.p-datepicker-calendar tr td {
    text-align: center;
    width: 45px;
}
.p-datepicker-calendar-container table.p-datepicker-calendar tr td span {
    width: 60%;
    display: block;
    margin: 0 auto;
    line-height: 1.6;
}
.p-datepicker table td.p-datepicker-today > span {
    background-color: #ffffff;
    color: #334454;
}

/* Custom CSS to style the selected date in PrimeVue Calendar */
.p-highlight {
background-color: #0D47A1; /* Your desired background color */
color: #fff; /* Your desired text color */
border-radius: 50%; /* Optional: if you want rounded corners */
}

.p-yearpicker-year.p-highlight {
    border-radius: 0% !important;
}

.p-yearpicker-year {
    padding: 10px 0;
}

.p-calendar {
    border: 1px solid #000000; /* Black border */
}

/* Hide the header of the calendar */
.p-calendar .p-datepicker-header {
    display: none;
}

/* Hide the title of the calendar */
.p-calendar .p-datepicker-title {
    display: none;
}

/* Style the day cells of the calendar */
.p-calendar .p-datepicker-calendar .p-datepicker-days td span {
    height: 30px;
    width: 48px;
}

/* Style the buttons within the day cells */
.p-calendar .p-datepicker-calendar .p-datepicker-days td span .p-button {
    height: 15px;
    font-size: 0.85rem;
}

/* Adjust the gap between rows of days */
.p-calendar .p-datepicker-calendar .p-datepicker-days {
    grid-row-gap: 1px;
}

/* Scale the overlay content */
.p-calendar .p-overlaypanel-content {
    transform: scale(0.92);
}

button.p-datepicker-year.p-link {
    margin-left: 5px;
}

@media screen and (max-width: 480px) {
    .p-calendar .p-overlaypanel-content {
        transform: scale(0.85);
    }
}

</style>