<script lang="ts">
export default defineComponent({
  props: {
    mode: {
      type: String,
      default: 'normal',
    },
  },
  data() {
    return {
      menu_items: [{index: 1, page: 'writings', name: 'Writings'}],
    }
  },
  setup() {
    const sidebar = ref(null)
    return {
      sidebar,
    }
  },
})
</script>

<template>
  <div
    ref="sidebar"
    :class="{
      'fixed top-0 hidden pt-12 h-screen': mode === 'normal',
      'relative flex-1 flex flex-col w-full': mode === 'mobile',
    }"
  >
    <div class="flex-1 overflow-y-auto pl-4 lg:pl-0 pr-4 py-4">
      <ul>
        <li v-for="i in menu_items" :key="i.name">
          <Anchor
            :to="{ name: 'dashboard' }"
            class="group flex items-center mb-4 hover:no-underline"
          >
            <div
              class="flex items-center mr-4 px-2 py-2 rounded-md ring-1 ring-slate-900/5 shadow-sm group-hover:shadow group-hover:ring-slate-900/10 dark:ring-0 dark:shadow-none dark:group-hover:shadow-none dark:group-hover:highlight-white/10 group-hover:shadow-sky-200 dark:highlight-white/10"
              :class="{
                'text-white dark:text-white group-hover:bg-sky-500 bg-sky-500':
                  i.index === 1,
                'text-slate-500 dark:text-gray-100 group-hover:bg-gray-200 bg-gray-100 dark:group-hover:bg-slate-600 dark:bg-slate-700':
                  i.index !== 1,
              }"
            >
              <icon-clarity:pencil-line class="text-xs" />
            </div>
            <span
              class="text-sm font-semibold capitalize"
              :class="{
                'font-extrabold text-sky-500 dark:text-sky-400': i.index === 1,
              }"
            >
              {{i.name}}
            </span>
          </Anchor>
        </li>
      </ul>
    </div>
  </div>
</template>
