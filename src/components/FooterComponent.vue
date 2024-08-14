<script setup></script>

<template>
  <footer>
    <div id="contact" class="container">
      <div class="row">
        <div class="col-md-4">
<!-- Footer Logo -->
          <div class="logo-footer">
            <h4><img src="../assets/images/logo_dark.png" alt="Unique" /></h4>
          </div>
          <p class="margin_top margin_top_20"></p>
<!-- Left Column -->
          <ul>
            <li>
              <router-link to="/termsofuse"><strong><span class="arrow_carrot-2right"></span> 
              {{ $t('footer_section.terms_of_use') }}</strong></router-link>
            </li>
            <li>
              <router-link to="/privacypolicy"><strong><span class="arrow_carrot-2right"></span>
                  {{ $t('footer_section.privacy_policy') }}</strong></router-link>
            </li>
          </ul>
        </div>
<!-- Middle Column -->
        <div class="col-md-4">
          <h5>{{ $t('footer_section.contact') }}</h5>
          <ul class="uf-contactinfo">
            <li><span class="icon_mail"></span>recruitment@pacificseainvests.com<br /></li>
            <li><span class="icon_phone"></span> +63 (02) 551 6167 / +63 (02) 659 7113</li>
            <li><span class="icon_printer-alt"></span> +63 (02) 659 7120</li>
            <li><span class="icon_pin"></span> 16th Floor PBCom Bldg, Ayala Avenue <br />Makati City 1200, Philippines</li>
          </ul>
        </div>
<!-- Right Column -->
        <div class="col-md-4">
          <h5>{{ $t('footer_section.follow_us') }}</h5>
          <ul class="uf-contactinfo">
            <li>
              <a href="https://www.facebook.com/PacificseaBPOServices/" target="blank" style="color: #fff"><span
                  class="social_facebook"></span>Facebook</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/company/pacific-sea-bpo-services-inc" target="blank"
                style="color: #fff"><span class="social_linkedin"></span>LinkedIn</a>
            </li>
          </ul>
        </div>
        <div class="col-md-3 hidden">
					<h5>{{ $t('footer_section.registered_company') }}</h5>
					<p class="margin_top margin_top_20"><img src="../assets/images/pagcor-logo.png" width="90" height="70"></p>
				</div>
      </div>
    </div>
<!-- Bottom Footer -->
    <div class="footer_bottom">
      <div class="container">
        <div class="row">
          <div class="col-md-6 col-sm-12 col-xs-12 alignleft">
            <p>© {{ $t('footer_section.copyright').replace('[year]', new Date().getFullYear()) }}</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
