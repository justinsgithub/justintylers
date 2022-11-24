<script setup lang="ts">
import { ITheme } from '~/utils/theme'
const theme = useState<ITheme>('theme.current')
</script>
<template>
  <div>
    <slot name="app-before" />
    <div id="app-before"></div>
    <div class="flex flex-col min-h-screen">
      <HomeNavbar />
      <div class="flex-1 w-full flex flex-col">
        <div class="relative flex-1 flex flex-col mx-auto max-w-8xl w-full h-full">
          <slot />
        </div>
      </div>
      <footer class="z-40 border-t bg-white/[0.5]  fixed bottom-0 inset-x-0 lg:border-gray-900/10 dark:(border-gray-50/[0.2] bg-cust/[0.7])">
        <section class="max-w-8xl mx-auto px-4 lg:px-8 flex-1 flex w-full space-x-20" >
          <div class="w-full pt-1 md:py-2">
            <div class="flex justify-evenly">
              <a href="https://twitter.com/JustinTAngeles">
                <icon-fa6-brands:twitter class="text-blue-600" />
              </a>
              <a href="https://github.com/JustinsGithub">
                <icon-fa6-brands:github :class="`${theme === 'dark' ? 'text-white' : ''}`" />
              </a>
              <a href="https://linkedin.com/in/JustinTAngeles">
                <icon-fa6-brands:linkedin-in class="text-blue-700" />
              </a>
              <a href="https://instagram.com/JustinTAngeles">
                <icon-fa6-brands:instagram class="text-red-500" />
              </a>
            </div>
          </div>
        </section>
      </footer>
    </div>
    <slot name="app-after" />
    <div id="app-after"></div>
  </div>
</template>

