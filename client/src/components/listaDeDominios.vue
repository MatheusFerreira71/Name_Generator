<template>
  <div>
    <div id="main" class="py-2">
      <div class="container">
        <div class="row">
          <div class="col-md">
            <listaDeItens
              title="Prefixos"
              v-bind:itens="prefixes"
              v-on:addItens="addPrefix"
              v-on:removeItens="removePrefix"
            ></listaDeItens>
          </div>
          <div class="col-md">
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
                    <div class="col-md text-left">{{domain.name}}</div>
                    <div class="col-md text-right">
                      <a class="btn btn-outline-success" v-bind:href="domain.url" target="_blank">
                        <span class="fa fa-shopping-cart"></span>
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md">
            <listaDeItens
              title="Sufixos"
              v-bind:itens="sufixes"
              v-on:addItens="addSufix"
              v-on:removeItens="removeSufix"
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
      prefixes: [],
      sufixes: []
    };
  },
  methods: {
    addPrefix(prefixo) {
      if (!prefixo) {
        alert("Informe um Prefixo");
      } else {
        axios({
          url: "http://localhost:4000/",
          method: "post",
          data: {
            query: `
              mutation ($item: itemInput){
                novoPrefixo: saveItem(item: $item){
                  id
                  type
                  description
                }
              }
            `,
            variables: {
              item: {
                type: "prefix",
                description: prefixo
              }
            }
          }
        }).then(() => {
          this.getPrefixes();
        });
      }
    },
    addSufix(sufixo) {
      if (!sufixo) {
        alert("Informe um Sufixo");
      } else {
        axios({
          url: "http://localhost:4000/",
          method: "post",
          data: {
            query: `
              mutation ($item: itemInput){
                novoSufixo: saveItem(item: $item){
                  id
                  type
                  description
                }
              }
            `,
            variables: {
              item: {
                type: "sufix",
                description: sufixo
              }
            }
          }
        }).then(() => {
          this.getSufixes();
        });
      }
    },
    removePrefix(prefixo) {
      axios({
        url: "http://localhost:4000",
        method: "post",
        data: {
          query: `
                mutation($id: Int) {
                  deleted: deleteItem(id: $id)
                }
              `,
          variables: {
            id: prefixo.id
          }
        }
      }).then(() => {
        this.getPrefixes();
      });
    },
    removeSufix(sufixo) {
      axios({
        url: "http://localhost:4000",
        method: "post",
        data: {
          query: `
              mutation($id: Int) {
                deleted: deleteItem(id: $id)
              }
            `,
          variables: {
            id: sufixo.id
          }
        }
      }).then(() => {
        this.getSufixes();
      });
    },
    getPrefixes() {
      axios({
        url: "http://localhost:4000/",
        method: "post",
        data: {
          query: `
          {
            prefixes: itens(type: "prefix") {
              id
              type
              description
            }
          }
        `
        }
      }).then(res => {
        const query = res.data;
        this.prefixes = query.data.prefixes;
      });
    },
    getSufixes() {
      axios({
        url: "http://localhost:4000/",
        method: "post",
        data: {
          query: `
          {
            sufixes: itens(type: "sufix"){
              id
              type
              description
            }
          }
        `
        }
      }).then(res => {
        const query = res.data;
        this.sufixes = query.data.sufixes;
      });
    }
  },
  computed: {
    domains() {
      const domains = [];
      for (const prefix of this.prefixes) {
        for (const sufix of this.sufixes) {
          const name = prefix.description + sufix.description;
          const url = `https://checkout.hostgator.com.br/?a=add&sld=${name.toLowerCase()}&tld=.com`;
          domains.push({
            name,
            url
          });
        }
      }
      return domains;
    }
  },
  created() {
    this.getPrefixes();
    this.getSufixes();
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
