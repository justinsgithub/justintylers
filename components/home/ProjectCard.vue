<template>
  <v-card class="justify-center text-center my-9" elevation="12" raised>
    <v-img :src="image" :alt="alt" />
    <v-card-title class="justify-center">{{ title }}</v-card-title>
    <v-card-text>
      <p>{{description}}</p>
    </v-card-text>
    <v-card-actions>
      <v-btn v-if="isWritings" text nuxt :to="href" color="secondary" x-large> View </v-btn>
      <v-btn v-else text target="_blank" :href="href" color="secondary" x-large> View </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      default: '/images/learning-docs-cover.png',
    },
    alt: {
      type: String,
      default: 'image',
    },
    title: {
      type: String,
      default: 'project title',
    },
    href: {
      type: String,
      default: 'https://www.linkedin.com/in/JustinTAngeles',
    },
    description: {
      type: String,
      default: 'Project description',
    },
  },
  data() {
    return {
      isWritings: this.href === '/writings'
    }
  }
}
</script>
