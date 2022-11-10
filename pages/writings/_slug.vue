<template>
  <v-row justify="center" align="center">
    <v-col justify="center" align="center" cols="12">
      <v-card>
        <v-toolbar dark>
          <v-spacer></v-spacer>
          <v-toolbar-title class="wh">{{ title }}</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon v-if="liked_post" color="primary" @click="liked_post = false">mdi-cards-heart</v-icon>
            <v-icon v-else @click="liked_post = true">mdi-cards-heart-outline</v-icon>
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
    console.log(document)
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
    liked_post(new_state) {
      if (new_state){
        this.liked_posts.push(this.title)
      } else {
        this.liked_posts = this.liked_posts.filter(post => post !== this.title)
      }
    },
    liked_posts(new_state) {
      localStorage.setItem('liked_posts', JSON.stringify(new_state))
    }
  },
  mounted() {
    const liked_posts = localStorage.getItem('liked_posts')
    if (liked_posts) { this.liked_posts = JSON.parse(liked_posts) }
  },
  /* created() { */
  /*   console.log('LIKED_POSTS created', localStorage.getItem('liked_posts')) */
  /* }, */
  /* methods: { */
  /*   toggle_like() { */
  /*     const did_like_post = this.liked_posts.includes(this.title) */
  /*     did_like_post && (this.liked_posts = this.liked_posts.filter((post) => post === this.title)) */
  /*     !did_like_post && this.liked_posts.push() */
  /*   }, */
  /* }, */
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
