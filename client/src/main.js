import Vue from 'vue';
import App from './App.vue';
import RouterVue from 'vue-router';
import Vuex from 'vuex';
import Domains from './components/listaDeDominios.vue';
import DomainView from './components/DomainView.vue';
import axios from "axios/dist/axios";

Vue.use(RouterVue);
Vue.use(Vuex);

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

const store = new Vuex.Store({
  state: {
    itens: {
      prefix: [],
      sufix: []
    },
    domains: []
  },
  mutations: {
    addItem(state, payload) {
      const { item, novoItem } = payload;
      state.itens[item.type].push(novoItem);
    },
    removeItem(state, payload) {
      const { item } = payload; 
      state.itens[item.type].splice(state.itens[item.type].indexOf(item), 1);
    },
    setItens(state, payload){
      const { type, itens } = payload;
      state.itens[type] = itens; 
    },
    setDomains(state, payload){
      const { domains } = payload;
      state.domains = domains;
    }
  },
  actions: {
    async addItem(context, payload) {
      const item = payload;
      if (!item.description) {
        alert(`Informe um ${item.type}o!`);
      } else {
        axios({
          url: "http://192.168.0.18:4000/",
          method: "post",
          data: {
            query: `
              mutation ($item: itemInput){
                novoItem: saveItem(item: $item){
                  id
                  type
                  description
                }
              }
            `,
            variables: {
              item
            }
          }
        }).then(res => {
          const query = res.data;
          const novoItem = query.data.novoItem;
          context.commit("addItem", { item, novoItem });
          context.dispatch("generateDomains");
        });
      }
    },
    async removeItem(context, payload) {
      const item = payload;
      axios({
        url: "http://192.168.0.18:4000",
        method: "post",
        data: {
          query: `
                mutation($id: Int) {
                  deletado: deleteItem(id: $id)
                }
              `,
          variables: {
            id: item.id
          }
        }
      }).then(() => {
        context.commit("removeItem", { item });
        context.dispatch("generateDomains");
      });
    },
    async getItens(context, payload) {
      const type = payload;
      return axios({
        url: "http://192.168.0.18:4000/",
        method: "post",
        data: {
          query: `
          query ($type: String){
            itens: itens(type: $type) {
              id
              type
              description
            }
          }
        `,
          variables: {
            type
          }
        }
      }).then(res => {
        const query = res.data;
        context.commit("setItens", { type, itens: query.data.itens });
      });
    },
    async generateDomains(context) {
      axios({
        url: "http://192.168.0.18:4000/",
        method: "post",
        data: {
          query: `
            mutation {
              domains: generateDomains {
                name
                url
                available
              }
            }
          `
        }
      }).then(res => {
        const query = res.data;
        context.commit("setDomains", { domains: query.data.domains });
      });
    }
  }
});
Promise.all([store.dispatch("getItens","prefix"), store.dispatch("getItens","sufix")]).then(() => {
  store.dispatch("generateDomains");
});


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
