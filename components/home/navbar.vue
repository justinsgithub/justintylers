<script lang="ts" setup>
export interface IMenuItem {
  type: 'link' | 'button'
  text: string
  href?: any
  route?: any
}

const navbar = ref(null)
const showDrawer = useState<boolean>('navbar.showDrawer', () => false)
const showOptions = useState<boolean>('navbar.showOptions', () => false)

const menus = computed((): IMenuItem[] => [
  { type: 'button', text: 'Writings', route: { name: 'writings' } },
])

// lifecycle
let timer: NodeJS.Timer
onMounted(() => {
  if (!navbar.value) return

  // scroll
  const { onScroll } = useSticky(navbar.value, 0)
  setTimeout(() => onScroll(), 50)

  // on show on mobile
  setInterval(() => {
    // must in mobile
    const minW = 1024
    if (window.innerWidth < minW) {
      updateDrawerOptions()
    }
  }, 100)
})
onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})

// methods
const updateDrawerOptions = () => {
  // drawer
  if (showDrawer.value || showOptions.value) {
    document.body.classList.add('overflow-hidden')
  } else {
    document.body.classList.remove('overflow-hidden')
  }
}
const toggleDrawer = () => (showDrawer.value = !showDrawer.value)
</script>

<template>
  <div ref="navbar" class="backdrop-filter backdrop-blur-md top-0 z-40 w-full flex-none transition-colors duration-300 lg:z-50 border-b border-gray-900/10 dark:border-gray-50/[0.2] bg-white/[0.5] dark:bg-cust/[0.5]">
    <div id="navbar-banner" class="banner">
      <div class="text-white text-xs text-center py-1 px-4 lg:px-8 bg-primary-500 capitalize" >
        <span class="mr-1">
          Thanks for visiting my site, currently under construction
        </span>
      </div>
    </div>
    <div class="max-w-8xl w-full mx-auto">
      <div class="py-3 lg:px-8 mx-4 lg:mx-0">
        <div class="relative flex items-center">
          <NuxtLink tag="a" class="mr-3 flex-none overflow-hidden md:w-auto text-md font-bold text-gray-900 dark:text-gray-200" :to="{ name: 'index' }" >
            <span class="sr-only">home</span>
            <span class="flex items-center"> JustinTylers.com </span>
          </NuxtLink>

          <div class="relative hidden lg:flex items-center ml-auto">
            <nav class="text-sm leading-6 font-semibold text-gray-600 dark:text-gray-300" role="navigation" >
              <ul class="flex items-center space-x-8">
                <li v-for="(item, i) in menus" :key="i">
                  <Anchor v-if="item.type === 'link'" :to="item.route ? item.route : undefined" :href="item.href ? item.href : undefined" class="hover:no-underline hover:text-slate-900 hover:dark:text-white capitalize" >
                    {{ item.text }}
                  </Anchor>
                  <Button v-else-if="item.type === 'button'" :text="item.text" size="xs" class="font-extrabold capitalize" :to="item.route ? item.route : undefined" :href="item.href ? item.href : undefined" />
                </li>
              </ul>
            </nav>
            <div class="flex space-x-4 border-l ml-6 pl-6 border-gray-900/10 dark:border-gray-50/[0.2]" >
              <ThemeSwitcher />
            </div>
          </div>

          <!-- <div class="relative flex items-center ml-auto lg:hidden"> -->
          <!--   <nav class="text-sm leading-6 font-semibold text-gray-600 dark:text-gray-300" role="navigation" > -->
          <!--     <ul class="flex items-center space-x-8"> -->
          <!--       <li v-for="(item, i) in menus" :key="i"> -->
          <!--         <Anchor v-if="item.type === 'link'" :to="item.route ? item.route : undefined" :href="item.href ? item.href : undefined" class="hover:no-underline hover:text-slate-900 hover:dark:text-white capitalize" > -->
          <!--           {{ item.text }} -->
          <!--         </Anchor> -->
          <!--         <Button v-else-if="item.type === 'button'" :text="item.text" size="xs" class="font-extrabold capitalize" :to="item.route ? item.route : undefined" :href="item.href ? item.href : undefined" /> -->
          <!--       </li> -->
          <!--     </ul> -->
          <!--   </nav> -->
          <!--   <div class="flex space-x-4 border-l ml-6 pl-6 border-gray-900/10 dark:border-gray-50/[0.2]" > -->
          <!--     <ThemeSwitcher /> -->
          <!--   </div> -->
          <!-- </div> -->

          <div class="flex-1 flex justify-end lg:hidden">
            <div class="flex space-x-4 border-r mr-4 pr-4 border-gray-900/10 dark:border-gray-50/[0.2]" >
              <ThemeSwitcher />
            </div>
            <button class="flex items-center focus:outline-none" aria-label="Toggle Drawer Menu" @click="toggleDrawer()" >
              <span class="flex items-center text-gray-600 dark:text-gray-300 text-sm" aria-hidden="true" >
                <icon-uil:bars v-if="!showDrawer" />
                <icon-uil:times v-else />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <ClientOnly>
      <Teleport to="#app-after">
        <!-- menu drawer -->
        <Transition name="slide-fade-from-up" mode="out-in">
          <div v-if="showDrawer" class="fixed lg:hidden bg-gray-100 dark:bg-slate-800 pt-12 top-0 left-0 w-screen h-screen z-30 flex flex-col" >
            <div class="flex-1 flex flex-col relative overflow-y-auto">
              <HomeSidebar mode="mobile" />
            </div>
          </div>
        </Transition>
      </Teleport>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.slide-fade-from-up-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-from-up-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-from-up-enter-from,
.slide-fade-from-up-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

a.router-link-active {
  font-weight: bold;
}
a.router-link-exact-active {
  color: theme('colors.slate.900');
}
html.dark {
  a.router-link-exact-active {
    color: theme('colors.white');
  }
}
</style>
