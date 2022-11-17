<script lang="ts" setup>
import { capitalize } from '~/utils/str'

// composable
// const { t } = useLang()

// compiler macro
definePageMeta({
  key: 'page',
})

useHead(() => ({
  title: capitalize('page not found'),
}))
</script>

<template>
  <PageWrapper class="flex flex-col items-center justify-center">
    <Error :code="404" />
  </PageWrapper>
</template>
