import Vue from "vue";
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import * as rules from "vee-validate/dist/rules";
// import { Context } from "@nuxt/types";

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

for (const [rule, validation] of Object.entries(rules)) {
  extend(rule, {
    ...validation,
  });
}
// export default ({ app }: Context) => {
//   configure({
//     defaultMessage: (field: string, values: any): any => {
//       // override the field name.
//       values._field_ = app.i18n.t(`fields.${field}`);
//       return app.i18n.t(`validation.messages.${values._rule_}`, values);
//     },
//   });
// };
