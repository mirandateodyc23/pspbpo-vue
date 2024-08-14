import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/companyprofile',
      name: 'companyprofile',
      component: () => import('../views/CompanyProfileView.vue'),
    },
    {
      path: '/careers',
      name: 'careers',
      component: () => import('../views/CareersView.vue')
    },
    {
      path: '/faqs',
      name: 'faqs',
      component: () => import('../views/FaqsView.vue')
    },
    {
      path: '/termsofuse',
      name: 'termsofuse',
      component: () => import('../views/TermsOfUseView.vue')
    },
    {
      path: '/privacypolicy',
      name: 'privacypolicy',
      component: () => import('../views/PrivacyPolicyView.vue')
    },
    {
      path: '/resume',
      name: 'resume',
      component: () => import('../views/ResumeFormView.vue')
    },
    {
      path: '/jobs',
      name: 'jobs',
      component: () => import('../views/JobsView.vue')
    },
    {
      path: '/application-status',
      name: 'application',
      component: () => import('../views/ApplicationView.vue'),
      props: true
    },
    { 
      path: '/:pathMatch(.*)*',   
      redirect: "/",
    },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    }
  }
});

router.beforeEach((to, from, next) => {
  if(to.name == 'resume' && from.name != 'jobs') {
    localStorage.removeItem('desiredJob');
  }
  if(!to.hash) {
    window.scrollTo({
      top: 0,
    });
  }
  // for default just move on the destination
  next();
});

export default router;
