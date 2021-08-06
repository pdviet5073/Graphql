<template>
  <div class="root__error">
    <h1>{{ error.statusCode }}</h1>
    <p>{{ error.message }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class extends Vue {
  @Prop() error!: any;
}
</script>
