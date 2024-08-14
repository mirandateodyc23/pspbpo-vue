<script setup></script>

<template>
    <title>{{ $t('title.privacy_policy') + ' | Pacific Sea BPO Services, Ltd.' }}</title>
    <section class="faq-info">
      <div class="container">
        <div class="row">
          <div class="content-head center">
            <h3 class="center_divider" v-html="$t(`privacy_policy.title`)">
            </h3>
          </div>
          <div class="col-md-12">
            <div class="clearfix seprator_top_forty"></div>
            <p class="text-justify" v-for="(content) in $tm(`privacy_policy.contents`)" :key="content"> {{content}} </p>     
            <template v-for="policy in $tm('privacy_policy.policies')" :key="policy.title">
              <h5 class="text-justify" v-html="policy.title"> </h5>
              <p class="text-justify" v-html="policy.description"></p>
              <ol class="list-custom">
                  <li v-for="(more_info, index) in policy.more_info" :key="more_info" class="text-justify"> 
                  <span>{{ index + 1 }}. </span> {{ more_info }}</li>
              </ol>
              <p class="text-justify" v-if="policy.more_description">
                {{ policy.more_description }}
              </p>
            </template>
            <div class="clearfix seprator_top_forty"></div>
          </div>
        </div>
      </div>
    </section>
</template>

<style scoped src="../assets/css/privacy-policy-view.css"></style>
