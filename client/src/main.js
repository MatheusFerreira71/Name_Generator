import Vue from 'vue';
import App from './App.vue';
import RouterVue from 'vue-router';
import Domains from './components/listaDeDominios.vue';
import DomainView from './components/DomainView.vue';

Vue.use(RouterVue);

const router = new RouterVue({
  routes: [
    {
      path: '/domains',
      component: Domains
    },
    {
      path: '/',
      redirect: '/domains'
    },
    {
      path: '/domains/:domain',
      component: DomainView,
      props: true
    }
  ]
});


Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
