export const state = () => ({
  blogs: [],
  blog: {},
});

export const getters = {
  getBlogs: (state) => {
    return state.blogs;
  },
  getBlog: (state) => {
    return state.blog;
  },
};

export const mutations = {
  SET_BLOGS(state, blogs) {
    state.blogs = [...state.blogs, ...blogs];
  },
  SET_BLOG(state, blog) {
    state.blog = blog;
  },
};

export const actions = {
  async fetchBlogs({ commit }, page) {
    console.log({ page });
    let response = await this.$axios.$get(
      `https://techcrunch.com/wp-json/wp/v2/posts?page=${page}`
    );
    
    const blogs = response;

    commit("SET_BLOGS", blogs);

    return blogs;
  },

  async fetchBlog({ commit }, id) {
    let response = await this.$axios.$get(
      `https://techcrunch.com/wp-json/wp/v2/posts/${id}`
    );
    console.log("ResponseBlog: ", response);

    const blog = response;

    commit("SET_BLOG", blog);

    return blog;
  },
};
