<template>
  <div>
    <div class="text-center my-5">
      <h1>Eventeiros Generator</h1>
      <h6 class="text-secondary">
        O seu gerador de domínios favorito
        <span class="fa fa-star" style="color: green;"></span>
      </h6>
    </div>
    <div id="main" class="py-5">
      <div class="container">
        <div class="row">
          <div class="col-md">
            <div class="card" style="width: 100%;">
              <div class="card-body text-center">
                <div class="card-title">
                  Prefixo
                  <span class="badge badge-success">{{prefixes.length}}</span>
                </div>
              </div>
              <ul class="list-group list-group-flush text-center">
                <li
                  class="list-group-item"
                  v-for="prefix in prefixes"
                  v-bind:key="prefix"
                >{{prefix}}</li>
              </ul>
              <div class="card-body text-center">
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    id="prefix"
                    placeholder="Digite um prefixo!"
                    v-model="prefixo"
                    v-on:keyup.enter="addPrefix(prefixo)"
                  />
                  <div class="input-group-append">
                    <button class="btn btn-success" v-on:click="addPrefix(prefixo);">
                      <span class="fa fa-plus"></span>
                    </button>
                  </div>
                </div>
                <button
                  class="btn btn-danger my-2"
                  style="width: 100%;"
                  v-on:click="removePrefix(prefixo);"
                >
                  <span class="fa fa-trash"></span>
                </button>
              </div>
            </div>
          </div>
          <div class="col-md">
            <div class="card" style="width: 100%;">
              <div class="card-body text-center">
                <div class="card-title">
                  Domínios
                  <span class="badge badge-success">{{domains.length}}</span>
                </div>
              </div>
              <ul class="list-group list-group-flush text-center">
                <li class="list-group-item" v-for="domain in domains" v-bind:key="domain">
                  <div class="row">
                    <div class="col-md text-left">{{domain}}</div>
                    <div class="col-md text-right">
                      <a class="btn btn-outline-success" href="https://www.hostgator.com.br" target="_blank">
                        <span class="fa fa-shopping-cart"></span>
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md">
            <div class="card" style="width: 100%;">
              <div class="card-body text-center">
                <div class="card-title">
                  Sufixo
                  <span class="badge badge-success">{{sufixes.length}}</span>
                </div>
              </div>
              <ul class="list-group list-group-flush text-center">
                <li class="list-group-item" v-for="sufix in sufixes" v-bind:key="sufix">{{sufix}}</li>
              </ul>
              <div class="card-body text-center">
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    id="sufix"
                    placeholder="Digite um sufixo!"
                    v-model="sufixo"
                    v-on:keyup.enter="addSufix(sufixo)"
                  />
                  <div class="input-group-append">
                    <button class="btn btn-success" v-on:click="addSufix(sufixo);">
                      <span class="fa fa-plus"></span>
                    </button>
                  </div>
                </div>
                <button
                  class="btn btn-danger my-2"
                  style="width: 100%;"
                  v-on:click="removeSufix(sufixo);"
                >
                  <span class="fa fa-trash"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

export default {
  name: "app",
  data: () => {
    return {
      prefixo: "",
      sufixo: "",
      prefixes: [],
      sufixes: []
    };
  },
  methods: {
    addPrefix(prefixo) {
      if (!prefixo) {
        alert("Informe um Prefixo");
      } else {
        this.prefixes.push(prefixo);
        this.prefixo = "";
      }
    },
    addSufix(sufixo) {
      if (!sufixo) {
        alert("Informe um Sufixo");
      } else {
        this.sufixes.push(sufixo);
        this.sufixo = "";
      }
    },
    removePrefix(prefixo) {
      if (!prefixo) {
        this.prefixes.pop();
      } else {
        if (this.prefixes.indexOf(prefixo) == -1) {
          alert(`Prefixo "${prefixo}" não encontrado!`);
        } else {
          this.prefixes.splice(this.prefixes.indexOf(prefixo), 1);
          this.prefixo = "";
        }
      }
    },
    removeSufix(sufixo) {
      if (!sufixo) {
        this.sufixes.pop();
      } else {
        if (this.sufixes.indexOf(sufixo) == -1) {
          alert(`Sufixo "${sufixo}" não encontrado!`);
        } else {
          this.sufixes.splice(this.sufixes.indexOf(sufixo), 1);
          this.sufixo = "";
        }
      }
    }
  },
  computed: {
    domains() {
      const domains = [];
      for (const prefix of this.prefixes) {
        for (const sufix of this.sufixes) {
          domains.push(prefix + sufix);
        }
      }
      return domains;
    }
  }
};
</script>

<style>
#main {
  background: #f1f1f1;
}
</style>
