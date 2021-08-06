<template>
  <div>
    <p v-if="loading">loading...</p>
    <b-card v-else bg-variant="info" text-variant="light">
      <b-card-text v-if="!bookselected">Please select a book</b-card-text>
      <b-card-body v-else>
        <h5 class="mb-2">{{ bookselected.name }}</h5>
        <p>{{ bookselected.genre }}</p>
        <p>{{ bookselected.author.name }}</p>
        <p class="my-3">Age: {{ bookselected.author.age }}</p>
        <p class="mb-3">All book by this author</p>
        <ul>
          <li
            v-for="(book, index) in bookselected.author.books"
            :key="`book-${index}`"
            :style="{ listStyle: 'inside' }"
          >
            {{ book.name }}
          </li>
        </ul>
      </b-card-body>
    </b-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { bookDetailType } from "@/types";

@Component
export default class BookDetails extends Vue {
  @Prop() bookselected!: bookDetailType;
  @Prop() loading!: boolean;
}
</script>

<style lang="scss" scoped>
p {
  padding-bottom: 6px;
}
</style>
