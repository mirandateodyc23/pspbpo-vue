<script setup></script>

<template>
    <title>{{ $t('title.company_profile') + ' | Pacific Sea BPO Services, Ltd.' }}</title>
  <section class="comprofile faq-info-company" >
    <div class="container">
      <div class="content-head center">
        <h3 class="center_divider" v-html="$t(`company_profile.header`)"></h3>
      </div>
      <div class="clearfix seprator_top_forty"></div>
      <div class="col-md-12">
        <div class="row">
          <p v-for="(description) in $tm(`company_profile.descriptions`)" :key="description"> {{ description }} </p>
        </div>
      </div>
    </div>
        <div class="container">
            <div class="col-md-12">
                <div class="row">
                    <div style="text-align: center; margin: 0px auto">
                        <img style="margin-bottom: 40px" src="../assets/images/pages/makati.jpg" />
                    </div>
                    <h4>
                    <span class="highlight-color">{{ $t("company_profile.body.title") }}</span>
                    </h4>
                    <p v-for="description in $tm(`company_profile.body.descriptions`)" :key="description"> {{ description }} </p>
                </div>
            </div>
        </div>
    </section>

    <section class="comprofile" id="vision">
        <div class="container">
            <div class="col-md-12">
                <div class="row">
                    <h4>
                        <span class="highlight-color">{{ $t("company_profile.vision.title") }}</span>
                    </h4>
                    <p>{{ $t("company_profile.vision.descriptions") }}</p>
                </div>
            </div>
        </div>
    </section>

    <section class="comprofile" id="mission">
        <div class="container">
            <div class="col-md-12">
                <div class="row">
                    <h4>
                        <span class="highlight-color">{{ $t("company_profile.mission.title") }}</span>
                    </h4>
                    <p>{{ $t("company_profile.mission.descriptions") }}</p>
                    <ul class="diamond">
                        <li v-for="sub_description in $tm(`company_profile.mission.sub_descriptions`)" :key="sub_description"> {{ sub_description }} </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <section class="comprofile" id="corevalues">
        <div class="container">
            <div class="col-md-12">
                <div class="row">
                    <h4><span class="highlight-color">{{ $t('company_profile.core_values.title') }}</span></h4>
                    <p>{{ $t('company_profile.core_values.descriptions') }}</p>
                    <p v-for="sub_description in $tm('company_profile.core_values.sub_descriptions')" :key="sub_description" v-html="sub_description"></p>
                    <div class="clearfix seprator_top_forty"></div>
                    <div class="clearfix seprator_top_forty"></div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped src="../assets/css/company-profile-view.css"></style>
