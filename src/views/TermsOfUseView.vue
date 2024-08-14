<script setup></script>

<template>
  <title>{{ $t('title.terms') + ' | Pacific Sea BPO Services, Ltd.' }}</title>
  <main>
    <section class="faq-info">
      <div class="container">
        <div class="row">
          <div class="content-head center">
            <h3 class="center_divider">
              <span v-html="$t('terms_and_conditions.title')"> </span>
            </h3>
          </div>
          <div class="col-md-12">
            <div class="clearfix seprator_top_forty"></div>
            <h5>
              <span class="highlight-color">{{ $t('terms_and_conditions.attention') }}</span>
            </h5>
            <ul class="list-custom">
              <!--Loop for te tnc's -->
              <li v-for="(detail, index) in $tm(`terms_and_conditions.details`)" :key="detail.title">
                <p class="text-justify"><span class="title"> {{ index + 1 }}. <strong>{{ detail.title }}</strong> </span><span
                    class="description " v-html="detail.description.replace('<year>', new Date().getFullYear())"></span> </p>
              </li>
            </ul>
            <div class="clearfix seprator_top_forty"></div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
