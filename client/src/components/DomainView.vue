<template>
  <div>
    <div class="container">
      <div class="text-center">
        <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-6">
            <div class="card" style="width: 100%;">
              <div class="card-header bg-dark">
                <h2 class="text-white">{{domain}}</h2>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="domain in domains" v-bind:key="domain.extension">
                  <div class="row">
                    <div class="col-4">{{ domain.extension}}</div>
                    <div class="col-4">
                      <span class="badge badge-success" v-if="domain.available">Disponível</span>
                      <span class="badge badge-danger" v-else>Não Disponível</span>
                    </div>
                    <div class="col-4">
                      <a
                        class="btn btn-outline-success my-1"
                        v-bind:href="domain.url"
                        target="_blank"
                      >
                        <span class="fa fa-shopping-cart"></span>
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="card-footer">
                <router-link
                  to="/domains"
                  class="btn btn-outline-danger my-2"
                  style="font-weight: bold; width: 100%"
                >Voltar</router-link>
              </div>
            </div>
          </div>
          <div class="col-md-3"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios/dist/axios";

export default {
  props: ["domain"],
  data() {
    return {
      domains: []
    };
  },
  created() {
    axios({
      url: "http://192.168.0.18:4000/",
      method: "post",
      data: {
        query: `
          mutation ($name: String) {
            domains: generateDomain(name: $name){
              name
              url
              available
              extension
            }
          }
        `,
        variables: {
          name: this.domain
        }
      }
    }).then(res => {
      const query = res.data;
      this.domains = query.data.domains;
    });
  }
};
</script>