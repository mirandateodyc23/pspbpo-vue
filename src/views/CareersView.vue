<script setup>
function setItem(job_position, category, market, title, nationality) {
  localStorage.setItem('desiredJob', JSON.stringify({job_position, category, market, title, nationality}));
}

window.scrollTo({
    top: 0
});
</script>

<template>
  <div>
  <title>{{ $t('title.careers') + ' | Pacific Sea BPO Services, Ltd.' }}</title>
    <section class="faq-info">
      <div class="container">
        <div class="row">
          <div class="content-head center">
            <h3 class="center_divider" v-html="$t('careers.title')"></h3>
          </div>
          <div class="col-md-9">
            <div class="clearfix seprator_top_forty"></div>
            <p>{{ $t('careers.description') }}</p>
            <div class="clearfix seprator_top_forty"></div>
            <h4>{{ $t('careers.benefits.title') }}</h4>
            <template v-for="content in $tm('careers.benefits.contents')" :key="content.title">
              <h5>{{ content.category }}</h5>
              <ol class="list-custom">
                <li v-for="(benefit, index) in content.benefits" :key="benefit">
                  <span class="number">{{ index + 1 }}.</span> {{ benefit }}
                </li>
              </ol>
              <div class="clearfix seprator_top_thirty"></div>
            </template>
          </div>
          <div class="col-md-3 clearfix positions">
            <div class="clearfix seprator_top_forty"></div>
            <h4 v-html="$t('jobs.title')"></h4>
            <template v-for="job_position in $tm('jobs.contents')" :key="job_position.category">
              <div class="clearfix seprator_top_thirty"></div>
              <h5>{{ job_position.category }}</h5>
              <ul class="diamond">
                <li v-for="job in job_position.job_lists" :key="job.value">
                  <router-link :to="{name: 'jobs', query: {category: job_position.category.toLowerCase(), title: job.slug, nationality: (job.is_general) ? undefined : job.market.replaceAll(',', '-')} }" @click="setItem(job.id, job_position.category, job.market, job.slug, job.market.replaceAll(',', '-'))">
                    {{ job.title }}
                  </router-link>
                </li>
              </ul>
            </template>
            <div class="clearfix seprator_top_forty"></div>
            <p>
              Can't find what you are looking for?<br />Discover what’s possible. Join our Talent
              Pool today!
            </p>
              <p>
                <router-link  class="btn-medium btn-full-black active" to="/resume">JOIN US</router-link> 
              </p> 
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped src="../assets/css/careers-view.css"></style>
