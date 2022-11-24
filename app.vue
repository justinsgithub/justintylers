<script lang="ts" setup>
import { AppSetup } from './utils/app'
import { ITheme } from './utils/theme'
AppSetup()
const theme = useState<ITheme>('theme.current')
const locale = useState<string>('locale.setting')
const app = useAppConfig()

useHead({
  titleTemplate: '%s - ' + app.author.name,
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { hid: 'description', name: 'description', content: 'Justin T. Angeles website', },
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' },
  ],
})

const get_current_user = async () => {
  // fetch username from github api
  /* try { */
  /*   const response = await fetch(`http://localhost:3000/site_users`, { */
  /*     credentials: 'include', */
  /*     headers: { */
  /*       Accept: 'application/json', */
  /*     },  */
  /*   }) */
  /*   if (response.status !== 200) throw new Error( `error fetching current user`) */
  /*   const data = await response.json() // as { name: string id: string } */
  /*   console.log(data) */
  /* } catch (err) { */
  /*   alert(err) */
  /* } */
}

onMounted(() => {
  console.log('mounted')
  get_current_user()
})

</script>

<template>
  <Html :class="`${theme === 'dark' ? 'dark' : ''}`" :lang="locale">
    <Body
      class="antialiased duration-300 transition-colors text-gray-800 dark:text-gray-200 bg-white dark:bg-cust"
    >
      <NuxtLayout>
        <NuxtLoadingIndicator :height="5" :duration="3000" :throttle="400" />
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>
