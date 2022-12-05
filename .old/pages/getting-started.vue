<script lang="ts" setup>
import { capitalize } from '~/utils/str'

// composable

// compiler macro
definePageMeta({
  layout: 'page',
})
useHead(() => ({
  title: 'Getting Started',
  meta: [
    {
      name: 'description',
      content: 'Getting Started',
    },
  ],
}))
</script>

<template>
  <PageContentRenderer
    path="/page/getting-started"
    page-title="Getting Started"
  />
</template>
