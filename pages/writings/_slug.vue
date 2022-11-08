<template>
  <v-row justify="center" align="center">
    <v-col justify="center" align="center" cols="12">
      <v-card>
        <v-toolbar dark>
          <v-spacer></v-spacer>
          <v-toolbar-title class="wh">{{ title }}</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon v-if="liked_post" @click.native="toggle_like">mdi-cards-heart</v-icon>
            <v-icon v-else @click.native="toggle_like">mdi-cards-heart-outline</v-icon>
          </v-btn>
        </v-toolbar>

        <article>
          <pre class="text-body-1 mx-5 pre">
            <nuxt-content :document="document"></nuxt-content>
          </pre>
        </article>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  async asyncData(context) {
    const slug = context.params?.slug || 'index'
    const document = await context.$content(`writings/${slug}`).fetch()
    const title = document.title
    return {
      document,
      title,
    }
  },
  data() {
    return {
      liked_post: false,
      liked_posts: [],
    }
  },
  watch: {
    liked_posts(newPosts, _oldPosts) {
      newPosts.includes(this.title) ? (this.liked_post = true) : (this.liked_post = false)
    }
  },
  mounted() {
    const liked_posts = localStorage.getItem('liked_posts')
    liked_posts && (this.liked_posts = JSON.parse(liked_posts))
  },
  methods: {
    toggle_like() {
      const did_like_post = this.liked_posts.includes(this.title)
      did_like_post && (this.liked_posts = this.liked_posts.filter(post => post === this.title))
      !did_like_post && (this.liked_posts.push())
    },
  },
}
</script>

<style lang="scss">
.wh {
  color: $title-color;
}
.pre {
  text-align: left;
  overflow-x: auto;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
}

/* div.nuxt-content-container { */
/* } */
/**/
div.nuxt-content {
  width: fit-content;
  margin: 0 auto;
}
/**/
/* div.nuxt-content > p { */
/*   width: fit-content; */
/* } */

/* p.nuxt-content { */
/* } */
</style>
