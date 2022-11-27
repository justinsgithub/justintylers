<script lang="ts" setup>
import { useCounter } from '~/stores/counter'
import { useIdentity } from '~/stores/identity'
import { capitalize } from '~/utils/str'

// compiler macro
definePageMeta({
  layout: 'page',
})
useHead(() => ({
  title: 'test title',
  meta: [
    {
      name: 'description',
      content: 'pages test description',
    },
  ],
}))

const counter = useCounter()
const identity = useIdentity()
</script>

<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle text="pages test title" class="capitalize" />
    </PageHeader>
    <PageBody>
      <PageSection>
        <PageSectionTitle text="pages test counter" class="capitalize" />
        <div class="">
          <div class="mb-2">Counter : {{ counter.count }}</div>
          <div
            class="flex flex-col items-center justify-items-center space-y-2 md:space-y-0 md:flex-row md:space-x-2"
          >
            <Button class="w-full md:w-auto capitalize" type="secondary" size="sm" text="pages test increment" @click.prevent="counter.increment" />
            <Button class="w-full md:w-auto" type="secondary" size="sm" text="pages test increment 2X" @click.prevent="counter.increment2x" />
            <Button class="w-full md:w-auto capitalize" type="secondary" size="sm" text="pages test decrement" @click.prevent="counter.decrement" />
            <Button class="w-full md:w-auto capitalize" type="secondary" size="sm" text="pages.test.reset" @click.prevent="counter.reset" />
          </div>
        </div>
      </PageSection>
      <PageSection>
        <PageSectionTitle text="pages test identity" class="capitalize" />
        <div class="mb-2">
          <span class="capitalize">pages test full name</span>
          <span>{{ identity.fullName }}</span>
        </div>
        <div class="mb-2">
          <div class="flex flex-col items-center space-y-2 md:space-y-0 md:flex-row md:space-x-2" >
            <FormTextInput v-model="identity.firstName" size="md" class="w-full md:w-1/3" />
            <FormTextInput v-model="identity.lastName" size="md" class="w-full md:w-1/3" />
            <Button class="capitalize w-full md:w-auto" text="pages test reset" type="secondary" size="md" @click.prevent="identity.reset" />
          </div>
        </div>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>
