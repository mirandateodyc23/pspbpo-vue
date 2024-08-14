<script setup> 
import { ref } from 'vue';
const panel = ref([0]);
</script>

<template>
    <title>{{ $t('title.faq') + ' | Pacific Sea BPO Services, Ltd.' }}</title>
    <section id="companytrips" class="faq-info">
        <div class="container">
            <div class="row">
                <div class="content-head center">
                    <h3 class="center_divider" v-html="$t(`faqs.header`)"></h3>
                </div>
                <div class="col-md-9">
                    <div class="clearfix seprator_top_forty"></div>
                    <div id="accordion" class="accordiontwo">
                    <v-expansion-panels variant="popout" v-model="panel">
                        <v-expansion-panel class="active" v-for="faq in $tm('faqs.contents')" :key="faq.title">
                            <v-expansion-panel-title>
                                {{ faq.title }} 
                            </v-expansion-panel-title>
                            <v-expansion-panel-text>
                                <span v-html="faq.description"></span>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped src="../assets/css/faqs-view.css"></style>
