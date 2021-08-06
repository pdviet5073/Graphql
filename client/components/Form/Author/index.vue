<template>
  <b-col>
    <ValidationObserver v-slot="{ handleSubmit }" tag="div">
      <b-form ref="formAuthor" @submit.prevent="handleSubmit(onSubmitFormAuthor)">
        <div class="text-right mb-3">
          <b-button type="button" variant="info">
            <nuxt-link class="text-light" to="/book">Book</nuxt-link>
          </b-button>
        </div>
        <CustomInput
          v-model="initialValueAuthor.name"
          name="authorName"
          rules="required"
          type="text"
          placeholder="Author name"
        ></CustomInput>
        <CustomInput
          v-model.number="initialValueAuthor.age"
          name="Age"
          rules="required"
          type="number"
          placeholder="Author age"
        ></CustomInput>
        <div class="text-right">
          <b-button type="submit" variant="info">Add Author</b-button>
        </div>
      </b-form>
    </ValidationObserver>
  </b-col>
</template>

<script lang="ts">
import { Action, Component, Ref, Vue } from "nuxt-property-decorator";
import { authorType } from "@/types";
import { createAuthorMutation } from "@/apollo/mutations/author.mutation";
import CustomInput from "@/components/CustomInput/index.vue";

@Component({
  components: {
    CustomInput,
  },
})
export default class extends Vue {
  initialValueAuthor: authorType = {
    name: null,
    age: null,
  };

  @Ref("formAuthor") readonly formAuthor!: HTMLFormElement;

  @Action("author/createAuthor") createAuthor!: Function;

  onSubmitFormAuthor() {
    try {
      const authorValue = this.initialValueAuthor;

      this.$apolloProvider!.defaultClient.mutate({
        mutation: createAuthorMutation,
        variables: authorValue,
      }).then(({ data }) => {
        this.createAuthor(data.createAuthor);
        this.formAuthor.reset();
      });
    } catch (e) {
      console.error(e);
    }
  }
}
</script>
