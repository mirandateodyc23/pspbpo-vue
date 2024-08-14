<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref } from 'vue';
import { useI18n } from "vue-i18n";
const { tm } = useI18n();
  
const queryRoutes = useRoute().query;
const router = useRouter();
const desiredJob = ref(queryRoutes && Object.keys(queryRoutes).length != 0 ? queryRoutes : localStorage.getItem("desiredJob")); 
const categoryIndex = ref(-1);
const jobIndex = ref(-1);
const source = ref();
const marketList = ref([]);

function checkJob() {
  if(desiredJob.value == null) return router.push('/careers');
  desiredJob.value = typeof desiredJob.value === 'object' ? desiredJob.value : JSON.parse(desiredJob.value);
  if(desiredJob.value.category == undefined || desiredJob.value.category == null || desiredJob.value.title == undefined || desiredJob.value.title == null) return router.push('/careers');
  categoryIndex.value = tm('jobs.contents').findIndex((value) => value.category.toLowerCase() == desiredJob.value.category.toLowerCase());
  if (categoryIndex.value < 0) return router.push('/careers');
  jobIndex.value = tm(`jobs.contents[${categoryIndex.value}].job_lists`).findIndex((value) => value.slug.toLowerCase() == desiredJob.value.title.toLowerCase());
  if (jobIndex.value < 0) return router.push('/careers');
  if(queryRoutes.source != undefined && queryRoutes.source) {
    localStorage.removeItem('desiredJob');
    source.value = queryRoutes.source;
    let storageItem = {
      job_position: tm(`jobs.contents[${categoryIndex.value}].job_lists[${jobIndex.value}].id`),
      category: tm(`jobs.contents[${categoryIndex.value}].category`),
      market: tm(`jobs.contents[${categoryIndex.value}].job_lists[${jobIndex.value}].market`),
      title: tm(`jobs.contents[${categoryIndex.value}].job_lists[${jobIndex.value}].slug`),
      source: source.value,
      nationality: tm(`jobs.contents[${categoryIndex.value}].job_lists[${jobIndex.value}].market`),
    }
    localStorage.setItem('desiredJob', JSON.stringify(storageItem));
  }
  marketList.value = tm(`jobs.contents[${categoryIndex.value}].job_lists[${jobIndex.value}].market`).split(',');
  if(`jobs.contents[${categoryIndex.value}].job_lists[${jobIndex.value}].is_general` && queryRoutes.nationality != undefined && queryRoutes.nationality) {
    const marketCheck = marketList.value.filter(market => queryRoutes.nationality.split('-').map(nationality => nationality.trim().toLowerCase()).includes(market.trim().toLowerCase()));
    if(marketCheck.length > 0) {
      marketList.value = marketCheck;
    }
  }
}

checkJob();
</script> 

<template>
  <title>{{ tm(`jobs.contents[${categoryIndex}].job_lists[${jobIndex}].title`) }} | Pacific Sea BPO Services, Ltd.</title>
  <section class="faq-info" v-if="categoryIndex >= 0">
    <div class="container">
      <div class="row">
        <div class="col-md-9">
          <div>
            <h3><span class="highlight-color">{{ tm(`jobs.contents[${categoryIndex}].job_lists[${jobIndex}].title`) }}</span></h3>
          </div>
          <table width="100%" border="0" cellspacing="1" cellpadding="0">
            <div class="clearfix seprator_top_twenty"></div>
            <tbody>
              <tr>
                <th width="20%"><span class="highlight-color">Location: </span></th>
                <td>
                  <strong>Makati City, Philippines</strong>
                </td>
              </tr>
              <tr>
                <th><span class="highlight-color">Department:</span></th>
                <td>
                  <strong>{{ tm(`jobs.contents[${categoryIndex}].job_lists[${jobIndex}].dept`) }}</strong>
                </td>
              </tr>
              <tr>
                <th><span class="highlight-color">Work Type: </span></th>
                <td>
                  <strong>Full Time</strong>
                </td>
              </tr>
              <tr>
                <th><span class="highlight-color">Work Location: </span></th>
                <td>
                  <strong>On-site</strong>
                </td>
              </tr>
            </tbody>
          </table> 

          <template v-if=" tm(`jobs.contents[${categoryIndex}].job_lists[${jobIndex}].job_highlight`).length > 0">
            <div class="clearfix seprator_top_twenty"></div>
                <h4><span class="highlight-color">JOB HIGHLIGHTS:</span></h4>
                    <p class="highlight">  {{ tm(`jobs.contents[${categoryIndex}].job_lists[${jobIndex}].job_highlight`) }}</p>
          </template>
          <div class="clearfix seprator_top_twenty"></div>
                <h4><span class="highlight-color">REQUIRED NATIONALITIES:</span></h4>
                    <ol class="list-custom break-text">
                        <li v-for="(markets, index) in marketList" :key="markets">
                          {{ index + 1 }}. {{ markets }}
                        </li>
                    </ol>
          <template v-if=" tm(`jobs.contents[${categoryIndex}].job_lists[${jobIndex}].job_summary`).length > 0">
            <div class="clearfix seprator_top_twenty"></div>
                <h4><span class="highlight-color">JOB SUMMARY:</span></h4>
                    <p class="highlight">  {{ tm(`jobs.contents[${categoryIndex}].job_lists[${jobIndex}].job_summary`) }}</p>
          </template>
          <div class="clearfix seprator_top_twenty"></div>
                <h4><span class="highlight-color">JOB RESPONSIBILITIES:</span></h4>
          <div class="clearfix seprator_top_twenty"></div>
                <ol class="list-custom break-text">
                    <li v-for="(responsibility, index) in tm(`jobs.contents[${categoryIndex}].job_lists[${jobIndex}].responsibilities`)" :key="responsibility">
                      {{ index + 1 }}. {{ responsibility }}
                        <template v-if="tm(`jobs.contents[${categoryIndex}].job_lists[${jobIndex}].sub_responsibilities[${index}]`)">
                          <ol class="list-custom break-text mt-2">
                            <li v-for="(sub_responsibility, sub_index) in tm(`jobs.contents[${categoryIndex}].job_lists[${jobIndex}].sub_responsibilities[${index}]`)" :key="sub_responsibility">
                              {{ sub_index + 1 }}.  {{ sub_responsibility }}
                            </li>
                          </ol>
                        </template>
                    </li>
                </ol>
          <template v-if=" tm(`jobs.contents[${categoryIndex}].job_lists[${jobIndex}].requirements`).length > 0">
            <div class="clearfix seprator_top_twenty"></div>
                <h4><span class="highlight-color">JOB REQUIREMENTS:</span></h4>
                  <ol class="list-custom">
                      <li v-for="(requirement, index) in tm(`jobs.contents[${categoryIndex}].job_lists[${jobIndex}].requirements`)" :key="requirement">
                        {{ index + 1 }}. {{ requirement }}
                      </li>
                  </ol>
          </template>
          <template v-if=" tm(`jobs.contents[${categoryIndex}].job_lists[${jobIndex}].qualifications`).length > 0">
            <div class="clearfix seprator_top_twenty"></div>
                <h4><span class="highlight-color">JOB QUALIFICATIONS:</span></h4>
                  <ol class="list-custom">
                      <li v-for="(qualification, index) in tm(`jobs.contents[${categoryIndex}].job_lists[${jobIndex}].qualifications`)" :key="qualification">
                        {{ index + 1 }}. {{ qualification }}
                      </li>
                  </ol>
          </template>
          <template v-if=" tm(`jobs.contents[${categoryIndex}].job_lists[${jobIndex}].knowledge_requirements`).length > 0">
            <div class="clearfix seprator_top_twenty"></div>
                <h4><span class="highlight-color">KNOWLEDGE REQUIREMENTS:</span></h4>
                  <ol class="list-custom">
                      <li v-for="(knowledge_requirement, index) in tm(`jobs.contents[${categoryIndex}].job_lists[${jobIndex}].knowledge_requirements`)" :key="knowledge_requirement">
                        {{ index + 1 }}. {{ knowledge_requirement }}
                      </li>
                  </ol>
          </template>
          <template v-if=" tm(`jobs.contents[${categoryIndex}].job_lists[${jobIndex}].skill_requirements`).length > 0">
            <div class="clearfix seprator_top_twenty"></div>
                <h4><span class="highlight-color">SKILL REQUIREMENTS:</span></h4>
                  <ol class="list-custom">
                      <li v-for="(skill_requirement, index) in tm(`jobs.contents[${categoryIndex}].job_lists[${jobIndex}].skill_requirements`)" :key="skill_requirement">
                        {{ index + 1 }}. {{ skill_requirement }}
                      </li>
                  </ol>
          </template>
          <template v-if=" tm(`jobs.contents[${categoryIndex}].job_lists[${jobIndex}].other_requirements`).length > 0">   
            <div class="clearfix seprator_top_twenty"></div>
              <h4><span class="highlight-color">OTHER REQUIREMENTS:</span></h4>
                <ol class="list-custom">
                    <li v-for="(otherrequirement, index) in tm(`jobs.contents[${categoryIndex}].job_lists[${jobIndex}].other_requirements`)" :key="otherrequirement">
                      {{ index + 1 }}. {{ otherrequirement }}
                    </li>
                </ol>
          </template>

          <template v-if=" tm(`jobs.contents[${categoryIndex}].job_lists[${jobIndex}].educational_background`).length > 0">  
            <div class="clearfix seprator_top_twenty"></div>
              <h4><span class="highlight-color">EDUCATIONAL BACKGROUND:</span></h4>
                <ol class="list-custom">
                    <li v-for="(educational_background) in tm(`jobs.contents[${categoryIndex}].job_lists[${jobIndex}].educational_background`)" :key="educational_background">
                      {{ educational_background }}
                      </li>
                  </ol>
          </template>

          <div class="clearfix seprator_top_thirty"></div>
            <p>
              <router-link class="btn-medium btn-full-black active" :to="{name: 'resume', query: {category: desiredJob.category, title: desiredJob.title, source, nationality: desiredJob.nationality } }">&nbsp; {{ $t('jobs.apply_now') }} &nbsp;</router-link>
            </p>
          </div>
  
        <div class="col-md-3">
          <div data-animated="200" class="price_table">
            <div class="hostingtable element_from_left">
              <div class="hostingcontent">
                <h5><span class="highlight-color">COMPANY SNAPSHOT</span></h5>
                <div class="hostingborder"></div>
                <ul>
                  <li><strong>Working Hours:</strong></li>
                  <li>9 Hours</li>
                  <li><strong>Rest Day:</strong></li>
                  <li>2 RD in a week</li>
                  <li><strong>Dress Code:</strong></li>
                  <li>Business Attire - Weekdays</li>
                  <li>Casual Attire - Weekends</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template> 
    
<style scoped src="../assets/css/jobs-view.css"></style>