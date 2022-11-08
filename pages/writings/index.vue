<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <h1 class="text-h2 wh">Writings</h1>
      <writings-preview-card v-for="writing in writings" :key="writing.title" v-bind="writing"/>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'

export default {
  async asyncData(context: Context) {
    console.log(context)
    const page = await context.$content('writings/1-am').fetch()
    const writings = await context.$content('writings').fetch()
    console.log(writings)
    return {
      page,
      writings
    }
  },
}
</script>

<style lang="scss">
.wh {
  text-align: center;
  color: $title-color;
}

</style>
