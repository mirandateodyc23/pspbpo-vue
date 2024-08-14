<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
const router = useRoute();

onMounted(() => {
    if(router.hash && useRoute().redirectedFrom == undefined) {
        setTimeout(() => {
            if(document.getElementById(router.hash.replace("#", "")) != null) {
                document.getElementById(router.hash.replace("#", "")).scrollIntoView({behavior: 'smooth'});
            }
        }, 2000)
    }
    else {
    window.scrollTo({
        top: 0  
    })
    }
});
</script>

<template>
   <title>{{ $t('title.home') }}</title>
  <!-- Fullscreen-Slider -->
  <div class="fullscreen-container">
		<div class="slider fullscreenbanner text-center home-banner">
			<ul>
				<li data-transition="boxslide" data-slotamount="7">
          <img src="@/assets/images/header_bg.png" alt="image" class="home-banner-img"/>
          <!-- LAYER NR. 3 -->

          <div class="home-banner-caption">
            <template v-for="(slider_title, index) in $tm('home.slider_section.title')" :key="slider_title">
              <div class="tp-caption skewfromleft" data-speed="500" data-x="60"  data-start="900" data-endspeed="500" :data-y="index == 0 ? 150 : 210" style=" font-weight: 700; line-height: 51px; letter-spacing: 1px; color: #0264aa;" :style="{ fontSize: index == 0 ? 72 + 'px': 54 + 'px' }">{{ slider_title }}</div>
            </template>
          
            <div class="tp-caption lfl" data-speed="500" data-start="1100" data-endspeed="500" data-x="60" data-y="270" style="font-weight: 700;font-size: 25px;color:#383838; padding-left: 0px; text-align: justify;"><span style="position:relative;top:2px;"></span>
              <template v-for="(slider_desc, index) in $tm('home.slider_section.description')" :key="slider_desc">
                {{ slider_desc }}
                <br v-if="index + 1 < $tm('home.slider_section.description').length"/>
              </template>
            </div>
          </div>

        </li>
			</ul>
		</div>
        </div>
    <!-- End of Slider -->

    <!-- Welcome section -->
    <div class="u-welcome animated bounceInDown border_bottom" id="u-welcome">
        <div class="container">
            <h3> <span class="highlight-color">{{ $t('home.welcome_section.title') }}</span> </h3>
            <p v-for="description in $tm('home.welcome_section.descriptions')" v-html="description" :key="description"></p>
        </div>
    </div>
    <!-- End of Welcome section -->

    <!-- Company Profile Section -->
    <section id="companyprofile" class="u-services">
        <div class="container">
            <div class="row">
                <div class="content-head center">
                    <h3 class="center_divider"> <a href="/companyprofile"  v-html="$t('home.company_profile.title')"></a> </h3>
                </div>
                <p class="content-sub"> {{ $t('home.company_profile.description') }} </p>
                <div class="col-md-4 animated fadeInRight">
                    <span class="ct-ribbon">
                        <span class="ct-triangle"></span>
                        <span class="ct-triangle two"></span>
                        <span><i class="icon_target"></i></span>
                    </span>
                    <div class="us-content">
                        <h4 class="mb-2">{{ $t('home.company_profile.vision.title') }}</h4>
                        <p>{{ $t('home.company_profile.vision.description') }}</p>
                        <router-link :to="{ name: 'companyprofile', hash: '#vision' }" class="btn-small">{{ $t('home.company_profile.readmore') }}</router-link>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-md-4 animated fadeInUp">
                    <span class="ct-ribbon">
                        <span class="ct-triangle"></span>
                        <span class="ct-triangle two"></span>
                        <span><i class="icon_key"></i></span>
                    </span>
                    <div class="us-content">
                        <h4 class="mb-2">{{ $t('home.company_profile.mission.title') }}</h4>
                        <p>{{ $t('home.company_profile.mission.description') }}</p>
                        <router-link :to="{ name: 'companyprofile', hash: '#mission' }" class="btn-small">{{ $t('home.company_profile.readmore') }}</router-link>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 animated fadeInLeft">
                    <span class="ct-ribbon">
                        <span class="ct-triangle"></span>
                        <span class="ct-triangle two"></span>
                        <span><i class="icon_star"></i></span>
                    </span>
                    <div class="us-content">
                        <h4 class="mb-2">{{ $t('home.company_profile.core_values.title') }}</h4>
                        <p v-html="$t('home.company_profile.core_values.description')"></p>
                        <router-link :to="{ name: 'companyprofile', hash: '#corevalues' }" class="btn-small">{{ $t('home.company_profile.readmore') }}</router-link>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- End of Company Profile Section-->

    <!-- Careers -->
    <div id="careers" class="u-works animated fadeInRight">
        <div class="content-head center">
        <h3 class="center_divider">
            <a href="/careers"
            v-html="$t('home.careers_section.title')">
        </a>
        </h3>
        </div>
        <p class="content-sub">{{ $t('home.careers_section.title_sub') }}</p>
        <section
        id="bg_color"
        class="quote-style2 aligncenter animated fadeInLeft"
        data-stellar-background-ratio="0.3"
        >
        <div class="bg_overlay"></div>
        <div class="container">
            <div class="row">
            <div id="owl-quotation" class="owl-theme light">
                <div class="item">
                <a href="/careers"
                    ><div class="qutation_info">
                    <span class="name">{{ $t('home.careers_section.join_us') }}</span>
                    </div></a
                >
                </div>
            </div>
            </div>
        </div>
        </section>
    </div>

    <!-- Perks -->
    <section id="perks" class="blog_carousel-lite">
        <!-- start of our blog section -->
        <div class="container">
        <div class="row">
            <div class="content-head center">
            <h3 class="center_divider">
                <a href="#perks"
                ><em
                    ><span class="highlight-color">{{ $t('home.perks_section.title') }}</span></em
                ></a
                >
            </h3>
            </div>
            <p class="content-sub">{{ $t('home.perks_section.description') }}</p>
            <div id="owl-blog">
            <div
                class="col-md-3 webdesign up-item item"
                v-for="perk in $tm('home.perks_section.contents')"
                :key="perk.title"
            >
                <div class="upi-thumb">
                <img :src="'/images/pages/' + perk.img" alt="image" />
                </div>
                <div class="upi-inner">
                <h4>{{ perk.title }}</h4>
                <p>{{ perk.description }}</p>
                </div>
            </div>
            </div>
        </div>
        </div>
    </section>
    <!-- Perks -->

    <!-- Outreach -->
    <section id="outreach" class="u-outreach">
        <!-- start of our blog section -->
        <div class="container">
        <div class="row">
            <div class="content-head center">
            <h3 class="center_divider" v-html="$t('home.outreach_section.title')">
            </h3>
            </div>
            <p class="content-sub">{{ $t('home.outreach_section.description') }}</p>
            <div id="owl-blog">
            <div
                class="col-md-4 webdesign up-item item"
                v-for="outreach in $tm('home.outreach_section.contents')"
                :key="outreach.title"
            >
                <div class="upi-thumb">
                <img :src="'/images/pages/' + outreach.img" alt="image" />
                </div>
                <div class="upi-inner">
                <h4>{{ outreach.title }}</h4>
                <p>{{ outreach.description }}</p>
                </div>
            </div>
            </div>
        </div>
        </div>
    </section>
    <!-- Outreach -->
</template>

<style scoped src="../assets/css/home-view.css"></style>