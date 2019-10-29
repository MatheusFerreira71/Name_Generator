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
      <listaDeDominios></listaDeDominios>
      <!-- <div class="container">
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
              <ul class="list-group list-group-flush text-center">
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
      </div> -->
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import listaDeDominios from "./components/listaDeDominios";

export default {
  name: "app",
  components: {
    listaDeDominios
  }
  //,
  // data: () => {
  //   return {
  //     prefixes: [],
  //     sufixes: []
  //   };
  // },
  // methods: {
  //   addPrefix(prefixo) {
  //     if (!prefixo) {
  //       alert("Informe um Prefixo");
  //     } else {
  //       this.prefixes.push(prefixo);
  //     }
  //   },
  //   addSufix(sufixo) {
  //     if (!sufixo) {
  //       alert("Informe um Sufixo");
  //     } else {
  //       this.sufixes.push(sufixo);
  //     }
  //   },
  //   removePrefix(prefixo) {
  //     if (!prefixo) {
  //       this.prefixes.pop();
  //     } else {
  //       if (this.prefixes.indexOf(prefixo) == -1) {
  //         alert(`Prefixo "${prefixo}" não encontrado!`);
  //       } else {
  //         this.prefixes.splice(this.prefixes.indexOf(prefixo), 1);
  //       }
  //     }
  //   },
  //   removeSufix(sufixo) {
  //     if (!sufixo) {
  //       this.sufixes.pop();
  //     } else {
  //       if (this.sufixes.indexOf(sufixo) == -1) {
  //         alert(`Sufixo "${sufixo}" não encontrado!`);
  //       } else {
  //         this.sufixes.splice(this.sufixes.indexOf(sufixo), 1);
  //       }
  //     }
  //   }
  // },
  // computed: {
  //   domains() {
  //     const domains = [];
  //     for (const prefix of this.prefixes) {
  //       for (const sufix of this.sufixes) {
  //         const name = prefix + sufix;
  //         const url = `https://checkout.hostgator.com.br/?a=add&sld=${name.toLowerCase()}&tld=.com`;
  //         domains.push({
  //           name,
  //           url
  //         });
  //       }
  //     }
  //     return domains;
  //   }
  // }
};
</script>

<style>
#main {
  background: #f1f1f1;
}
</style>
