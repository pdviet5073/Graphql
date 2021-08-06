<template>
  <div class="book__list">
    <b-row>
      <b-col cols="7">
        <b-row>
          <b-col v-for="book in booksD" :key="book.id" lg="4" md="6" class="mb-3">
            <b-card
              border-variant="info"
              text-variant="info"
              class="shadow h-100 card__item"
              @click="handleSelectBook(book.id)"
            >
              <b-card-text align="center">{{ book.name }}</b-card-text>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="5">
        <BookDetails :bookselected="bookDetail" :loading="loading" />
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Action, State, Getter } from "nuxt-property-decorator";
import { getBooks, getBookById } from "@/apollo/queries/book.query";
import { bookDetailType } from "@/types";
import BookDetails from "@/components/BookDetails/index.vue";

@Component({
  components: {
    BookDetails,
  },
})
export default class extends Vue {
  loading: boolean = false;

  @Getter("books/booksD") booksD!: bookDetailType[];
  @State((state) => state.books.bookDetail) bookDetail!: bookDetailType[];
  @Action("books/setBooksData") setBooksData!: Function;
  @Action("books/setBook") setBook!: Function;

  mounted() {
    this.getBooks();
  }

  async getBooks() {
    try {
      const { data } = await this.$apolloProvider!.defaultClient.query({
        query: getBooks,
        variables: {
          page: 1,
        },
      });
      this.setBooksData(data.books);
    } catch (error) {
      throw new Error(error);
    }
  }

  async handleSelectBook(id: string) {
    try {
      this.loading = true;
      await this.$apolloProvider!.defaultClient.query({
        query: getBookById,
        variables: { id },
      })
        .then(({ data }) => this.setBook(data.book))
        .finally(() => (this.loading = false));
    } catch (error) {
      throw new Error(error);
    }
  }
}
</script>
