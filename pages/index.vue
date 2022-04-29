<template>
    <main class="page">
        <Loader v-if="fetchingRecords" />
        <template v-else>
            <section class="blog__optimization__container">
                <div class="blog__optimization__picture">
                    <img :src="articles.mainArticle.jetpack_featured_media_url" :alt="articles.mainArticle.title" class="blog__poster" />
                </div>

                <div class="blog__optimization__content">
                    <p class="blog__optimization__small__heading">
                        <span class="blog__optimization__small__heading__name"> {{ articles.mainArticle.author }} </span>

                        <span class="blog__optimization__dot"> &middot; </span>

                        <span class="blog__optimization__small__heading__date"> {{ articles.mainArticle.date | howLong }} </span>
                    </p>

                    <div v-html="articles.mainArticle.title.rendered" class="blog__optimization__main__heading"></div>

                    <div v-html="articles.mainArticle.excerpt.rendered" class="blog__optimization__main__body">
                        Not long ago I decided to improve the loading times of my website. It already loads pretty fast, but I knew there was still room for improvement and one of them was CSS loading. I will walk you through the process and show you how you can improve your load times as well.<br />
                        <br />

                        To see how CSS affects the load time of a webpage we first have to know how the browser converts an HTML document into a functional webpage...
                    </div>

                    <div class="blog__optimization__footer">
                        <p class="blog__optimization__footer__length">3 Min Read</p>

                        <nuxt-link
                            :to="{
                                name: 'blog-id',
                                params: { id: articles.mainArticle.id },
                            }"
                            class="blog__optimization__footer__details"
                            >Read Full <font-awesome-icon :icon="['fas', 'long-arrow-alt-right']" class="fa-fw"
                        /></nuxt-link>
                    </div>
                </div>
            </section>

            <section class="blog__container">
                <div class="blog__listing" v-if="articles.blogs.length">
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

            <section class="pagination">
                <div class="pagination__container">
                    <button @click.prevent="loadMore" :disabled="fetchingMore" class="pagination__button">
                        {{ fetchingMore ? "Loading..." : "Load More" }}
                    </button>
                </div> 
            </section>

            <section class="blog__joining">
                <p class="blog__joining__heading">Join our Team of Writers</p>
                <p class="blog__joining__body">On dasdas, writers earn a living doing what they love. Getting started is easy. Just pay a one time <span class="blog__joining__fee">$25</span> fee and everything is ready to go.</p>
                <div class="blog__joining__button__container">
                    <button class="blog__joining__button" @click="makePayment">JOIN US</button>
                </div>
            </section>
        </template>
    </main>
</template>

<script>
import { mapState } from "vuex";
import Loader from "@/components/Loader.vue";

export default {
    components: {
        Loader,
    },
    data() {
        return {
            fetchingRecords: true,
            currentPage: 1,
            fetchingMore: false,
        };
    },

    async asyncData({ store }) {
        await store.dispatch("blogs/fetchBlogs", 1);
        return {
            fetchingRecords: false,
        };
    },

    computed: {
        ...mapState("blogs", ["fetchBlogs", "blogs"]),

        articles() {
            const [mainArticle, ...remainingArticles] = this.blogs;
            return {
                mainArticle,
                blogs: remainingArticles || [],
            };
        },

        paymentData() {
            return {
                tx_ref: this.generateReference(),
                amount: 25,
                currency: "USD",
                payment_options: "card",
                customer: {
                    name: "Demo Customer  Name",
                    email: "snilori@gmail.com",
                    phone_number: "0708***2587",
                },
                customizations: {
                    title: "Blog App",
                    description: "",
                    logo: "",
                },
                callback: this.makePaymentCallback,
                onclose: this.paymentModalClose,
            };
        },
    },

    methods: {
        generateReference() {
            let date = new Date();
            return date.getTime().toString();
        },
        makePayment() {
            this.payWithFlutterwave(this.paymentData);
        },
        makePaymentCallback(response) {
            if (response.status === "successful") {
                this.closePaymentModal(10);
            }
        },
        async loadMore() {
            this.fetchingMore = true;
            this.currentPage += 1;
            await this.$store.dispatch("blogs/fetchBlogs", this.currentPage);
            this.fetchingMore = false;
        },
    },
};
</script>