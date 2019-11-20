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
import listaDeItens from "./listaDeItens";
import { mapState, mapActions } from 'vuex';

export default {
  name: "app",
  components: {
    listaDeItens
  },
  data: () => {
    return {};
  },
  methods: {
    ...mapActions(["addItem", "removeItem", "getItens", "generateDomains"]),
    openDomain(domain) {
      this.$router.push({
        path: `/domains/${domain.name}`
      });
    }
  },
  computed: {
    ...mapState(["itens", "domains"])
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
