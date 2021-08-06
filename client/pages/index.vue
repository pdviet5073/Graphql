<template>
  <b-container class="py-3 mt-3" :style="{ backgroundClolor: 'lightcyan' }">
    <h1 class="text-center text-info mb-3">My Book</h1>
    <hr />
    <b-row>
      <b-col>
        <FormBook />
      </b-col>
      <b-col>
        <FormAuthor />
      </b-col>
    </b-row>
    <hr />
    <BookList />
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import FormBook from "@/components/Form/Book/index.vue";
import FormAuthor from "@/components/Form/Author/index.vue";
import BookList from "@/components/BookList/index.vue";

@Component({
  components: {
    FormBook,
    FormAuthor,
    BookList,
  },
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
p,
li {
  margin-bottom: 5px;
}
</style>
