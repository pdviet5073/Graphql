<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <b-form ref="formBook" @submit.prevent="handleSubmit(onSubmitFormBook)">
      <CustomInput
        v-model="initialValueBook.name"
        name="bookName"
        rules="required"
        type="text"
        placeholder="Book Name"
      ></CustomInput>
      <CustomInput
        v-model="initialValueBook.genre"
        name="bookGenre"
        rules="required"
        type="text"
        placeholder="Book genre"
      ></CustomInput>
      <CustomInput
        v-model="initialValueBook.authorId"
        name="authorId"
        rules="selectOption"
        type="select"
        placeholder="Select author"
        :options="authorsData"
      ></CustomInput>
      <div class="text-right">
        <b-button type="submit" variant="info">{{ !isEdit ? "Add Book" : "Update Book" }}</b-button>
      </div>
    </b-form>
  </ValidationObserver>
</template>

<script lang="ts">
import { Component, Vue, Prop, Action, State, Watch, Ref } from "nuxt-property-decorator";
import { bookType, authorType } from "@/types";
import { createBook, updateBookMutation } from "@/apollo/mutations/book.mutation";
import { extend } from "vee-validate";
import { getAuthor } from "@/apollo/queries/author.query";
import CustomInput from "@/components/CustomInput/index.vue";

extend("selectOption", {
  validate: (value = ""): boolean => {
    console.log(!!value);
    return !!value;
  },
  message: "{_field_} is not valid.",
});

@Component({
  components: {
    CustomInput,
  },
})
export default class extends Vue {
  isEdit: boolean = false;

  @Prop() bookupdatedata!: bookType;
  @Prop() bookselected!: string;

  @State((state) => state.author.authorsData) authorsData!: authorType[];
  @Action("author/setAuthorData") setAuthorData!: Function;
  @Action("books/createBook") createBook!: Function;
  @Action("books/updateBook") updateBook!: Function;

  @Ref("formBook") readonly formBookRef!: HTMLFormElement;

  initialValueBook: bookType = {
    name: null,
    genre: null,
    authorId: null,
  };

  mounted() {
    this.getAllAuthor();

    if (!this.bookupdatedata?.name && this.isEdit) this.$router.push("/book");
  }

  async getAllAuthor() {
    try {
      const { data } = await this.$apolloProvider!.defaultClient.query({
        query: getAuthor,
      });
      this.setAuthorData(data.authors);
    } catch (error) {
      throw new Error(error);
    }
  }

  onSubmitFormBook() {
    try {
      const bookValue = this.initialValueBook;

      if (!this.isEdit) {
        this.$apolloProvider!.defaultClient.mutate({
          mutation: createBook,
          variables: bookValue,
        }).then(({ data }) => {
          this.createBook(data.createBook);
        });
      } else {
        this.$apolloProvider!.defaultClient.mutate({
          mutation: updateBookMutation,
          variables: bookValue,
        })
          .then(({ data }) => {
            this.updateBook(data.editBook);
          })
          .finally(() => this.$router.push("/book"));
      }

      this.formBookRef.reset();
    } catch (error) {
      console.error(error);
    }
  }

  @Watch("$route", { deep: true })
  handleupdateBook() {
    this.initialValueBook = this.bookupdatedata;
    this.isEdit = this.$route.path.includes("/book/edit");
  }
}
</script>
