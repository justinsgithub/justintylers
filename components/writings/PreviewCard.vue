<template>
  <v-card class="justify-center my-9" raised>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <pre class="description">{{ description }}</pre>
    </v-card-text>
    <v-card-actions>
      <v-btn text nuxt :to="path" color="secondary"> Read More </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Writing title',
    },
    path: {
      type: String,
      default: '/writings',
    },
    description: {
      type: String,
      default: 'Writing description',
    },
  },
}
</script>

<style>
.description {
  overflow-x: auto;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
}
</style>
