<template>
  <b-container class="py-3 mt-3">
    <nuxt-child />
    <b-row class="d-flex justify-content-center">
      <b-col md="6">
        <FormBook :bookupdatedata="bookUpdateData" :bookselected="bookselected" />
      </b-col>
    </b-row>
    <hr />
    <div class="">
      <b-row class="d-flex justify-content-end align-items-center">
        <label for="input-with-list">Input with datalist</label>
        <b-col md="3">
          <b-form-input v-model="filter.searchKey" debounce="400"></b-form-input>
        </b-col>
      </b-row>

      <b-table
        ref="table"
        class="mt-4"
        striped
        hover
        :fields="fields"
        :items="booksD"
        responsive="sm"
        :per-page="filter.limit"
        :current-page="filter.currentPage"
      >
        <template #cell(stt)="data">
          {{ data.index + 1 }}
        </template>
        <template #cell(name)="data">
          <i>{{ data.item.name }}</i>
        </template>
        <template #cell(genre)="data">
          <i>{{ data.item.genre }}</i>
        </template>
        <template #cell(author)="data">
          <i>{{ data.item.author.name }}</i>
        </template>
        <template #cell(action)="data">
          <button type="button" @click="handleUpdateBook(data.item.id)">
            <b-icon-pencil-square />
          </button>
          <button type="button" @click="handleDeleteBook(data.item.id)"><b-icon-trash /></button>
        </template>
      </b-table>
      <b-pagination
        v-model="filter.currentPage"
        class="justify-content-center mt-5"
        :total-rows="booksData.totalItem"
        :per-page="filter.limit"
        first-number
      ></b-pagination>
    </div>
  </b-container>
</template>

<script lang="ts">
import { Action, Component, Getter, State, Vue, Watch } from "nuxt-property-decorator";
import { getBooks } from "@/apollo/queries/book.query";
import { deleteBookMutation } from "@/apollo/mutations/book.mutation";
import FormBook from "@/components/Form/Book/index.vue";

import { bookDataType, bookType, bookDetailType } from "~/types";

@Component({
  components: {
    FormBook,
  },
})
export default class extends Vue {
  filter: {
    limit: number;
    currentPage: number;
    searchKey: string;
  } = {
    limit: 5,
    currentPage: 1,
    searchKey: "",
  };

  bookselected: string = "";
  bookUpdateData: Partial<bookType> = {};

  fields: Array<{ key: string; label: string; sortable?: boolean }> = [
    { key: "stt", label: "Stt", sortable: true },
    {
      key: "name",
      label: "Book name",
      sortable: true,
    },
    {
      key: "genre",
      label: "Book genre",
      sortable: true,
    },
    {
      key: "author",
      label: "Author",
      sortable: true,
    },
    {
      key: "action",
      label: "Action",
    },
  ];

  @State((state) => state.books.booksData) booksData!: bookDataType;

  @Getter("books/booksD") booksD!: bookDetailType[];

  @Action("books/setBooksData") setBooksData!: Function;
  @Action("books/setBook") setBook!: Function;
  @Action("books/deleteBook") deleteBook!: Function;

  mounted() {
    this.getBooks({ page: this.filter.currentPage, limit: this.filter.limit });
  }

  get bookUpdate() {
    return this.bookUpdateData;
  }

  get getSearchData() {
    return this.booksD.map((item) => item.name?.toLowerCase());
  }

  async getBooks({
    page,
    limit,
    searchKey,
  }: {
    page?: number;
    limit?: number;
    searchKey?: string;
  }) {
    try {
      await this.$apolloProvider!.defaultClient.query({
        query: getBooks,
        variables: {
          page,
          limit,
          searchKey,
        },
      }).then(({ data }) => {
        this.setBooksData(data.books);
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async handleDeleteBook(id: string) {
    try {
      const { data } = await this.$apolloProvider!.defaultClient.mutate({
        mutation: deleteBookMutation,
        variables: { id },
      });
      this.deleteBook(data.deleteBook);
    } catch (error) {
      throw new Error(error);
    }
  }

  handleUpdateBook(id: string) {
    const data = this.booksD.find((book) => book.id === id)!;
    this.bookUpdateData = {
      id: data.id,
      name: data.name,
      genre: data.genre,
      authorId: data.author!.id,
    };
    this.bookselected = data.id!;
    this.$router.push("/book/edit");
  }

  @Watch("filter.currentPage", { deep: true })
  handleUpdateDataBooks() {
    const { currentPage, limit, searchKey } = this.filter;
    this.getBooks({
      page: currentPage,
      limit,
      ...(searchKey && { searchKey }),
    });
  }

  @Watch("filter.searchKey", { deep: true })
  handleSearchData() {
    const { limit, searchKey } = this.filter;

    if (searchKey) {
      this.$router.replace({ query: { q: searchKey } });
      this.getBooks({
        page: 1,
        limit,
        searchKey,
      });
    } else {
      // remove query
      const query = Object.assign({}, this.$route.query);
      delete query.q;
      this.$router.replace({ query });
      this.getBooks({
        page: 1,
        limit,
      });
    }
  }
}
</script>
