<template>
  <div>
    <div id="main" class="py-2">
      <div class="container">
        <div class="row">
          <div class="col-md">
            <listaDeItens
              title="Prefixos"
              type="prefix"
              v-bind:itens="itens.prefix"
              v-on:addItens="addItem"
              v-on:removeItens="removeItem"
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
      }
    };
  },
  methods: {
    addItem(item) {
      if (!item.description) {
        alert(`Informe um ${item.type}o!`);
      } else {
        axios({
          url: "http://localhost:4000/",
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
        }).then(() => {
          this.getItens(item.type);
        });
      }
    },
    removeItem(item) {
      axios({
        url: "http://localhost:4000",
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
        this.getItens(item.type);
      });
    },
    getItens(type) {
      axios({
        url: "http://localhost:4000/",
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
    }
  },
  computed: {
    domains() {
      const domains = [];
      for (const prefix of this.itens.prefix) {
        for (const sufix of this.itens.sufix) {
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
    this.getItens("prefix");
    this.getItens("sufix");
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
