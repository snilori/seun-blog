<template>
    <main class="blog" v-if="blog">
        <section class="blog__intro">
            <div class="blog__intro__container">
                <p class="blog__intro__small__heading">
                    <span class="blog__intro__small__heading__name"> {{ blog.author }}</span>

                    <span class="blog__intro__small__heading__date"> {{ blog.date | howLong }} </span>
                </p>

                <div v-html="blog.title.rendered" class="blog__intro__main__heading"></div>

                <div v-html="blog.content.rendered" class="blog__intro__main__body"></div>

                <div class="blog__intro__block__picture">
                    <img :src="blog.jetpack_featured_media_url" :alt="blog.title" class="blog__extended__poster" />
                </div>
            </div>
        </section>

        <section class="blog__container" v-if="articles.blogs.length">
            <p class="blog__title">More Articles</p>
            <div class="blog__listing">
                <div class="blog__listing__item" v-for="blog in articles.blogs" :key="blog.id">
                    <img :src="blog.jetpack_featured_media_url" :alt="blog.title" class="blog__poster" />
                    <p class="blog__small__heading">
                        <span class="blog__small__heading__name"> {{ blog.author }} </span>

                        <span class="blog__dot"> &middot; </span>

                        <span class="blog__small__heading__time"> {{ blog.date | howLong }} </span>
                    </p>

                    <div v-html="blog.title.rendered" class="blog__main__heading"></div>

                    <div v-html="blog.excerpt.rendered" class="blog__main__body"></div>

                    <div class="blog__footer">
                        <p class="blog__footer__length">12 Min Read</p>
                        <nuxt-link
                            :to="{
                                name: 'blog-id',
                                params: { id: blog.id },
                            }"
                            class="blog__footer__details"
                            >Read Full <font-awesome-icon :icon="['fas', 'long-arrow-alt-right']" class="fa-fw"
                        /></nuxt-link>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import { mapState } from "vuex";
export default {
    data() {},

    async asyncData({ store, error, params }) {
        try {
            await store.dispatch("blogs/fetchBlog", params.id);
            console.log("params: ", params);
        } catch (err) {
            error(err);
        }
    },

    computed: {
        ...mapState("blogs", ["fetchBlog", "blog", "blogs"]),

        articles() {
            const [mainArticle, ...remainingArticles] = this.blogs;
            return {
                mainArticle,
                blogs: remainingArticles || [],
            };
        },
    },
};
</script>
