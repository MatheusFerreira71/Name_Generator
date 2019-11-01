<template>
  <div>
    <div class="card" style="width: 100%;">
      <div class="card-body text-center">
        <div class="card-title">
          {{ title }}
          <span class="badge badge-success">{{itens.length}}</span>
        </div>
      </div>
      <ul class="list-group list-group-flush text-center slide">
        <li class="list-group-item" v-for="item in itens" v-bind:key="item.id">
          <div class="row">
            <div class="col-md">{{item.description}}</div>
            <div class="col-md text-right">
              <button class="btn btn-outline-danger my-2" v-on:click="removeItens(item);">
                <span class="fa fa-trash"></span>
              </button>
            </div>
          </div>
        </li>
      </ul>
      <div class="card-body text-center">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            id="itens"
            placeholder="Digite um item!"
            v-model="description"
            v-on:keyup.enter="addItens(type, description)"
          />
          <div class="input-group-append">
            <button class="btn btn-success" v-on:click="addItens(type, description);">
              <span class="fa fa-plus"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "listaDeItens",
  props: ["title", "type", "itens"],
  data() {
    return {
      description: ""
    };
  },
  methods: {
    addItens(type, description) {
      this.$emit("addItens", {
        type,
        description
      });
      this.description = "";
    },
    removeItens(item) {
      this.$emit("removeItens", item);
      this.item = "";
    }
  }
};
</script>

<style>
.slide {
  height: 196px;
  position: relative;
  overflow-y: scroll;
}
</style>
