<template>
  <v-app dark>
    <v-navigation-drawer v-model="show_drawer" right fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar fixed app>
      <nuxt-link to='/'>
        <v-avatar> 
          <img src="/images/icon.png" alt="logo">
        </v-avatar>
      </nuxt-link>
      <v-spacer />
      <v-btn icon @click.stop="show_drawer = !show_drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer dark app class="justify-center">
      <v-btn v-for="icon in icons" :key="icon.name" target="_blank" :href="icon.link" class="mx-4" icon>
        <v-icon size="24px" :color="icon.color">
          {{ icon.name }}
        </v-icon>
      </v-btn>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      icons: [
        {
          name: 'mdi-twitter',
          link: 'https://twitter.com/JustinTAngeles',
          color: '#1D9BF0',
        },
        {
          name: 'mdi-github',
          link: 'https://github.com/JustinsGithub',
          color: '#FFF',
        },
        {
          name: 'mdi-linkedin',
          link: 'https://www.linkedin.com/in/JustinTAngeles',
          color: '#0A66C2',
        },
        {
          name: 'mdi-instagram',
          link: 'https://www.instagram.com/JustinTAngeles',
          color: '#FB3958',
        },
      ],
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/',
        },
        {
          icon: 'mdi-lead-pencil',
          title: 'Writings',
          to: '/writings',
        },
      ],
      show_drawer: false,
    }
  },
}
</script>
