<script lang="ts" setup>
import { capitalize } from '~/utils/str'

// composable
// const { t } = useLang()

// compiler macro
definePageMeta({
  layout: 'page',
})
useHead(() => ({
  title: capitalize('blank page'),
  meta: [
    {
      name: 'description',
      content: 'this is a blank page',
    },
  ],
}))
</script>

<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle text="blank page" class="capitalize" />
    </PageHeader>
    <PageBody>
      <PageSection>
        <div v-for="i in 10" :key="i" class="text-6xl uppercase">
          just blank page with title
        </div>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>
