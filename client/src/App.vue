<template>
  <div>
    <div class="text-center my-5">
      <h1>Eventeiros Generator</h1>
      <h6 class="text-secondary">
        O seu gerador de domínios favorito
        <span class="fa fa-star" style="color: green;"></span>
      </h6>
    </div>
    <div id="main" class="py-2">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";


export default {
  name: "app",
  components: {
  }
};
</script>

<style>
#main {
  background: #f1f1f1;
}
</style>
