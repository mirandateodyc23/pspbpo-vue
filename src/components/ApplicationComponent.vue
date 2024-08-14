<script setup></script>

<template>
  <v-card class="mx-auto px-6 py-8" max-width="344">
    <v-form v-model="form" @submit.prevent="onSubmit">
      <v-card-title class="text-center">Job Application Status</v-card-title>
      <v-card-sub-title class="text-center"
        >Please enter the following information to check the status of your
        application.</v-card-sub-title
      >
      <v-text-field v-model="email" :rules="[required]" label="Email"> </v-text-field>

      <v-text-field
        v-model="reference"
        :rules="[required]"
        clearable
        label="Reference Code"
      ></v-text-field>

      <br />

      <v-btn block color="success" size="large" type="submit" @click="reveal = true">
        Check Status
      </v-btn>
    </v-form>
  </v-card>
</template>

<style lang="scss" scoped></style>
