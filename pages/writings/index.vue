<script lang="ts" setup>

useHead(() => ({
  title: 'Writings',
  meta: [
    {
      name: 'description',
      content: 'Justin Angeles creative writings',
    },
  ],
}))

const get_preview = (article: any) => article.excerpt.children.slice(0, article.excerpt.children.findIndex((child: any) => child.tag === 'hr')).map((obj: any) => obj.children[0].value)

</script>

<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle text="Writings" class="capitalize" />
    </PageHeader>
    <PageBody>
      <ContentList v-slot="{ list }" path="/writings">
        <PageSection v-for="article in list" :key="article._path">
          <div class="block hover:no-underline p-6 flex space-x-6 rounded border border-gray-900/10 dark:border-gray-50/[0.2]" >
            <div class="flex flex-col">
              <div class="text-xl font-semibold text-slate-800 dark:text-gray-50" >
                {{ article.title }}
              </div>
              <div class="text-slate-700 dark:text-gray-300 mb-2 mt-2">
                <div>
                  <pre v-for="line in get_preview(article)">{{line}}</pre>
                </div>
              </div>
              <div class="flex">
                <Anchor class="text-sm flex space-x-1 items-center text-primary-500" :to="article._path">
                  <span> Read </span>
                  <icon:ic:baseline-arrow-right-alt class="text-sm" />
                </Anchor>
              </div>
            </div>
          </div>
        </PageSection>
      </ContentList>
    </PageBody>
  </PageWrapper>
</template>
