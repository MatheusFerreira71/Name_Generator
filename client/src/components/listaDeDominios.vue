<template>
  <div>
    <div id="main" class="py-2">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <listaDeItens
              title="Prefixos"
              type="prefix"
              v-bind:itens="itens.prefix"
              v-on:addItens="addItem"
              v-on:removeItens="removeItem"
            ></listaDeItens>
          </div>
          <div class="col-md-4 my-2">
            <div class="card" style="width: 100%;">
              <div class="card-body text-center">
                <div class="card-title">
                  Domínios
                  <span class="badge badge-success">{{domains.length}}</span>
                </div>
              </div>
              <ul class="list-group list-group-flush text-center slides">
                <li class="list-group-item" v-for="domain in domains" v-bind:key="domain.name">
                  <div class="row">
                    <div class="col-6 text-left">{{domain.name}}</div>
                    <div class="col-6 text-right">
                      <button class="btn btn-outline-primary my-1" @click="openDomain(domain)">
                        <span class="fa fa-search"></span>
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-4">
            <listaDeItens
              title="Sufixos"
              type="sufix"
              v-bind:itens="itens.sufix"
              v-on:addItens="addItem"
              v-on:removeItens="removeItem"
            ></listaDeItens>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import axios from "axios/dist/axios";
import listaDeItens from "./listaDeItens";

export default {
  name: "app",
  components: {
    listaDeItens
  },
  data: () => {
    return {
      itens: {
        prefix: [],
        sufix: []
      },
      domains: []
    };
  },
  methods: {
    addItem(item) {
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
          this.itens[item.type].push(novoItem);
          this.generateDomains();
        });
      }
    },
    removeItem(item) {
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
        this.itens[item.type].splice(this.itens[item.type].indexOf(item), 1);
        this.generateDomains();
      });
    },
    getItens(type) {
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
        this.itens[type] = query.data.itens;
      });
    },
    generateDomains() {
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
        this.domains = query.data.domains;
      });
    },
    openDomain(domain) {
      this.$router.push({
        path: `/domains/${domain.name}`
      });
    }
  },
  created() {
    Promise.all([this.getItens("prefix"), this.getItens("sufix")]).then(() => {
      this.generateDomains();
    });
  }
};
</script>

<style>
.slides {
  height: 274px;
  position: relative;
  overflow-y: scroll;
}
</style>
