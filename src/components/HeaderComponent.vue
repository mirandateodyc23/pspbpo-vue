<script setup>
import flags from '../assets/json/flags.json'
// Sets clicked language 
function setItem(lang) {
  localStorage.setItem('lang', lang)
}

// Redirection for Outreach page
function getFileURL(name) {
  return name
}

</script>


<template>
<!-- Header -->
  <!-- Language Navigation -->
  <header class="desktop_header no-mobile">
    <div class="u-topbar">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <div class="ut-social pull-right">
              <template v-for="flag in flags" :key="flag.value">
                <a :title="flag.title" @click="($i18n.locale = flag.value), setItem(flag.value)">
                  <img data-rjs="2" :src="'/images/' + getFileURL(flag.img)" />
                </a>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="u-header">
      <div class="container">
  <!-- Logo -->
        <div class="uh-logo pull-left">
          <h1>
            <a href="/" title="Unique"><img src="@/assets/images/logo.png" class="img-responsive" alt="Pacific Sea BPO"/></a>
          </h1>
        </div>
        <!-- Mobile Responsiveness -->
        <div class="navbar-header">
        <!-- Main Navigation Responsiveness -->
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle Navigation</span>
            <i class="icon_menu"></i>
          </button>
        </div>
        <!-- End of Mobile Responsiveness -->
        <nav class="collapse navbar-collapse">
          <!-- Main navigation -->
          <ul id="headernavigation" class="nav navbar-nav pull-right">
            <li class="active">
              <router-link to="/" class="page-scroll">{{ $t('home.navbar_title') }}</router-link>
            </li>
            <li>
              <router-link to="/companyprofile" class="page-scroll">{{ $t('company_profile.navbar_title') }}</router-link>
            </li>
            <li>
              <router-link to="/careers" class="page-scroll">{{ $t('careers.navbar_title') }}</router-link>
            </li>
            <li>
              <router-link to="/faqs" class="page-scroll">{{ $t('faqs.navbar_title') }}</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'home', hash: '#outreach' }" class="page-scroll">{{ $t('outreach.navbar_title') }}</router-link>
            </li>
            <li>
              <router-link to="#contact" class="page-scroll">{{ $t('contact.navbar_title') }}</router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
<!-- End of Header -->

	<!-- Mobile-Header -->
	<div class="mob-header">
		<div class="container">
			<img src="@/assets/images/logo.png" alt=""/>
			<div class="nav-list">
				<div class="m-menu em">
					<span><i class="icon_menu"></i></span>
					<div class="mob-menu">
						<div id="menu">
							<ul>
								<li>
                  <router-link to="/" class="page-scroll">{{ $t('home.navbar_title') }}</router-link>
                </li>
                <li>
                  <router-link to="/companyprofile" class="page-scroll">{{ $t('company_profile.navbar_title') }}</router-link>
                </li>
                <li>
                  <router-link to="/careers" class="page-scroll">{{ $t('careers.navbar_title') }}</router-link>
                </li>
                <li>
                  <router-link to="/faqs" class="page-scroll">{{ $t('faqs.navbar_title') }}</router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'home', hash: '#outreach' }" class="page-scroll">{{ $t('outreach.navbar_title') }}</router-link>
                </li>
                <li>
                  <router-link to="#contact" class="page-scroll">{{ $t('contact.navbar_title') }}</router-link>
                </li>
							</ul>
						</div>
					</div>
				</div>
			</div>	
			<div class="nav-list">	
				<div class="m-language em">
					<span><i class="icon_globe"></i></span>
					<div class="mob-language">
						<div id="language">
							<ul>
                <template v-for="flag in flags" :key="flag.value">
                  <li>
                    <a href="javascript:void(0);" :title="flag.title" @click="($i18n.locale = flag.value), setItem(flag.value)">
                    <img data-rjs="2" :src="'/images/' + getFileURL(flag.img)" style="height: 16px; width: 16px;" />
                    {{ flag.title }}
                    </a>
                  </li>
                </template>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
  
</template>

<style lang="scss">
    // Google Webfont
    @import 'https://fonts.googleapis.com/css?family=Raleway:400,100,200,300,500,600,700,800,900';
    // CSS
    @import 'https://fonts.googleapis.com/css?family=Material+Icons';
    @import '@/assets/font/style.css';
    @import '@/assets/css/font-awesome.min.css';
    @import '@/assets/css/style.css';
    @import '@/assets/css/animate.css';
    @import '@/assets/css/media.css';
    @import '@/assets/css/jquery-ui.min.css';
    @import '@/assets/css/magnific-popup.css';
    @import '@/assets/css/responsive.css';
    @import '@/assets/css/jquery-sliding-menu.css';
    @import '@/assets/css/fhmm.css';
    @import '@/assets/css/extralayers.css';


</style>