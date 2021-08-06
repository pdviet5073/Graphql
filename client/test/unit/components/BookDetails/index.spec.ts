import { shallowMount } from "@vue/test-utils";
import BookDetails from "@/components/BookDetails/index.vue";
import { bookDetail } from "@/test/factory/book";

const mountComponent = (options: any = {}) => {
  const wrapper = shallowMount(BookDetails, {
    propsData: {
      bookselected: { ...bookDetail },
      ...options.propsData,
    },
    mocks: {
      ...options.mocks,
    },
  });
  return wrapper;
};

describe("Book detail", () => {
  test("is a Vue instance", () => {
    const wrapper = mountComponent();
    expect(wrapper.isVueInstance).toBe(true);
  });

  test("render data prop", () => {
    const wrapper = mountComponent();
    expect(wrapper.props("bookselected").name).toBe("Chi Pheo");
  });
});
