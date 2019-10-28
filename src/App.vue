<template>
  <div>
    <div class="text-center my-5">
      <h1>Eventeiros Generator</h1>
      <h6 class="text-secondary">
        O seu gerador de nomes favorito
        <span class="fa fa-star" style="color: green;"></span>
      </h6>
    </div>
    <div id="main" class="py-5">
      <div class="container">
        <div class="row">
          <div class="col-md">
            <div class="card" style="width: 100%;">
              <div class="card-body text-center">
                <div class="card-title">Prefixo</div>
              </div>
              <ul class="list-group list-group-flush text-center">
                <li class="list-group-item">A</li>
                <li class="list-group-item">B</li>
                <li class="list-group-item">C</li>
              </ul>
              <div class="card-body text-center">
                <input type="text" class="form-control" id="prefix" placeholder="Digite um sufixo!" />
              </div>
            </div>
          </div>
          <div class="col-md">
            <div class="card" style="width: 100%;">
              <div class="card-body text-center">
                <div class="card-title">Sufixo</div>
              </div>
              <ul class="list-group list-group-flush text-center">
                <li class="list-group-item">A</li>
                <li class="list-group-item">B</li>
                <li class="list-group-item">C</li>
              </ul>
              <div class="card-body text-center">
                <input type="text" class="form-control" id="sufix" placeholder="Digite um sufixo!" />
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
      prefixes: [],
      sufixes: []
    };
  }
};
</script>

<style>
#main {
  background: #f1f1f1;
}
</style>
