<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="justify-center text-center">
        <v-card-title class="headline justify-center jh"> Justin Angeles </v-card-title>
        <v-avatar size="150">
          <img src="/images/justin-angeles.jpg" alt="Justin Angeles" />
        </v-avatar>
        <v-card-text>
          <p>Thanks for taking the time to visit my site 😊 Here you can find links to my projects, accounts, and activities on the web 🌐</p>
          <hr class="my-9" />
        </v-card-text>
      </v-card>

      <home-project-card v-for="project in projects" :key="project.title" v-bind="project" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      projects: [
        {
          title: 'Creative Writings',
          description: 'I enjoy creative writing as a form of therapy. My writings helped me deal with a lot of childhood trauma and recover from meth addiction.',
          image: '/images/simplenote-writings.png',
          href: '/writings',
          alt: 'Justins Creative Writings',
        },
        {
          title: 'Learning Documentation',
          description: 'I created study docs and document things I learn about. Currently it is pretty much all tech subjects.',
          image: '/images/learning-docs-cover.png',
          href: 'https://docs.justintylers.com',
          alt: 'Justins learning documentation website',
        },
        {
          title: 'Software Development Portfolio',
          description: 'Self-taught software engineer. I have a wide range of experience including SQL & NoSQL databases, Ruby, Python, Linux systems / tools, and the JavaScript ecosystem. Happy to give advice to anyone interested in learning, even figuring out where to start can be difficult.',
          image: '/images/portfolio-cover.png',
          href: 'https://portfolio.justintylers.com',
          alt: 'Justins software development portfolio',
        },
      ],
    }
  },
}
</script>

<style lang="scss">
.jh {
  color: $title-color;
}
</style>
