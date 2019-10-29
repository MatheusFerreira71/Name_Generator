<template>
  <div>
    <div class="card" style="width: 100%;">
      <div class="card-body text-center">
        <div class="card-title">
          {{ title }}
          <span class="badge badge-success">{{itens.length}}</span>
        </div>
      </div>
      <ul class="list-group list-group-flush text-center">
        <li class="list-group-item" v-for="item in itens" v-bind:key="item">{{item}}</li>
      </ul>
      <div class="card-body text-center">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            id="itens"
            placeholder="Digite um item!"
            v-model="item"
            v-on:keyup.enter="addItens(item)"
          />
          <div class="input-group-append">
            <button class="btn btn-success" v-on:click="addItens(item);">
              <span class="fa fa-plus"></span>
            </button>
          </div>
        </div>
        <button class="btn btn-danger my-2" style="width: 100%;" v-on:click="removeItens(item);">
          <span class="fa fa-trash"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "listaDeItens",
  props: ["title", "itens"],
  data() {
    return {
      item: ""
    };
  },
  methods: {
    addItens(item) {
      this.$emit("addItens", item);
      this.item = "";
    },
    removeItens(item) {
      this.$emit("removeItens", item);
      this.item = "";
    }
  }
};
</script>

<style>
</style>
