import Vuex from "vuex";
import { shallowMount, createLocalVue, ThisTypedShallowMountOptions } from "@vue/test-utils";
import chai, { expect } from "chai";
import BookList from "~/components/BookList/index.vue";
// import { books } from "~/test/factory/book";

let actions: any = {};
let state: any = {};
const localVue = createLocalVue();
localVue.use(Vuex);

const mountComponent = (
  options: ThisTypedShallowMountOptions<BookList> = {},
  mockStore: any = {}
) => {
  actions = {
    setBook: chai.spy(),
    setBooksData: chai.spy(),
  };
  state = {
    bookDetail: {},
    booksData: {
      books: [],
      totalPages: 0,
      totalItem: 0,
      currentPage: 0,
    },
    ...mockStore.state,
  };

  const store = new Vuex.Store({
    modules: {
      books: {
        state,
        actions,
        getters: {
          booksD: () => {},
        },
        namespaced: true,
      },
    },
  });

  const wrapper = shallowMount(BookList, {
    store,
    localVue,
    ...options,
    stubs: {
      "b-col": "<div><slot/></div>",
      "b-row": "<div><slot/></div>",
    },
    methods: {
      getBooks: () => {},
    },
  });
  return wrapper;
};

describe("BookList", () => {
  test("load data when mounted", async () => {
    const wrapper = mountComponent();
    const vm = wrapper.vm as any;
    wrapper.setMethods({
      getBooks: chai.spy(),
    });
    await vm.getBooks();

    expect(actions.setBooksData).to.have.been.called();

    // expect(vm.getBooks).to.have.been.called();
  });

  // test("Have BookDetails component", () => {
  //   const wrapper = mountComponent();

  //   expect(wrapper.find("bookdetails-stub").exists()).to.be.true();
  // });

  // test("Handle load data", () => {
  //   const getBooks = chai.spy();
  //   mountComponent({
  //     methods: {
  //       getBooks,
  //     },
  //   });
  //   expect(getBooks).to.be.been.called();
  // });

  // test("Should set bookData when load success", async () => {
  //   const data = { ...books };
  //   const wrapper = mountComponent({
  //     mocks: {
  //       $apolloProvider: {
  //         defaultClient: {
  //           query: () => Promise.resolve({ data }),
  //         },
  //       },
  //     },
  //   });
  //   wrapper.setMethods({
  //     getBooks: chai.spy(),
  //   });
  //   const vm = wrapper.vm as any;
  //   await vm.getBooks();
  //   expect(vm.getBooks).to.have.been.called();
  //   expect(actions.setBooksData).to.have.been.called.with(books);
  // });
});
