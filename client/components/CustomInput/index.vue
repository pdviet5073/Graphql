<template>
  <ValidationProvider v-slot="{ errors, valid }" ag="div" :name="name" :rules="rules">
    <b-form-group>
      <b-form-input
        v-if="type !== 'select'"
        :value="value"
        :type="type"
        :state="errors[0] ? false : valid ? true : null"
        :placeholder="placeholder"
        @input="$emit('input', $event)"
      />
      <b-form-select v-else :value="value" @input="$emit('input', $event)">
        <template #first>
          <b-form-select-option :value="null" disabled
            >-- Please select an option --</b-form-select-option
          >
        </template>
        <b-form-select-option v-for="option in options" :key="option.id" :value="option.id">{{
          option.name
        }}</b-form-select-option>
      </b-form-select>
      <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
    </b-form-group>
  </ValidationProvider>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { authorType } from "@/types";

@Component
export default class extends Vue {
  @Prop() value!: string;
  @Prop() type!: string;
  @Prop() placeholder!: string;
  @Prop() rules!: string;
  @Prop() name!: string;
  @Prop() options!: Array<authorType>;
}
</script>
