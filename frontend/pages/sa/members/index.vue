<script lang="ts" setup>
useHead({
  title: 'Social Automation Members',
})

const members = ref<false | any[]>(false)

const get_members = async () => {
  // fetch username from github api
  try {
    const response = await fetch(`http://localhost:3000/members`, {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      },
    })
    if (response.status !== 200) throw new Error(`error fetching members`)
    const data = await response.json() // as { name: string id: string }
    console.log(data)
    members.value = data
  } catch (err) {
    alert(err)
  }
}

onMounted(() => {
  console.log('mounted')
  get_members()
})
</script>
<template>
  <div class="flex-1 flex relative">
    <div class="flex-1 flex">
      <section class="flex-1 flex my-5 mb-15">
        <div class="flex-1 flex flex-col items-center">
          <h1 class="text-center drop-shadow-xl text-5xl block">Members</h1>

          <div v-if="members" v-for="member in members" class="p-4 my-9 pb-20px shadow-xl max-w-lg" >
            <div class="flex-col justify-center items-center flex-wrap w-full box-border" >
              <div>
                <h3 class="text-center text-green text-xl">{{member.username}}</h3>
              </div>
              <div class="my-9">
              <div class="flex my-1 justify-between gap-1">
                <p>how active: </p>
                <p class="text-green">{{ member.active }}</p>
              </div>
              <div class="flex my-1 justify-between gap-1">
                <p>age: </p>
                <p class="text-green">{{ member.age }}</p>
              </div>
              <div class="flex my-1 justify-between gap-1">
                <p>gender: </p>
                <p class="text-green">{{ member.gender }}</p>
              </div>
              <div class="flex my-1 justify-between gap-1">
                <p>last activity:</p>
                <p class="text-green"> {{ member.latest_activity }}</p>
              </div>
              <div class="flex my-1 justify-between gap-1">
                <p>sexual orientation: </p>
                <p class="text-green">{{ member.orientation }}</p>
              </div>
              <div class="flex my-1 justify-between gap-1">
                <p>kink style: </p>
                <p class="text-green">{{ member.style }}</p>
              </div>
              <div class="flex my-1 justify-between gap-1">
                <p>total pictures: </p>
                <p class="text-green">{{ member.total_pictures }}</p>
              </div>
              </div>
              <div>
                <Button text="View Profile" size="xs" class="font-extrabold capitalize" :href="member.page_url" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss">
@import '../assets/sass/variables';

@keyframes anim-fg-1 {
  0%,
  16.667%,
  100% {
    opacity: 1;
  }

  33.333%,
  83.333% {
    opacity: 0.9;
  }
}

@keyframes anim-fg-2 {
  0%,
  16.667%,
  66.667%,
  100% {
    opacity: 0;
  }

  33.333%,
  50% {
    opacity: 1;
  }
}

@keyframes anim-fg-3 {
  0%,
  50%,
  100% {
    opacity: 0;
  }

  66.667%,
  83.333% {
    opacity: 1;
  }
}

.animated-text-bg {
  position: relative;
  display: block;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  content: var(--content);
  display: block;
  width: 100%;
  color: theme('colors.slate.800');
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
  padding-left: $padding;
  padding-right: $padding;
  &:before {
    content: var(--content);
    position: absolute;
    display: block;
    width: 100%;
    color: theme('colors.slate.800');
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    padding-left: $padding;
    padding-right: $padding;
  }
}
.animated-text-fg {
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding-left: $padding;
  padding-right: $padding;
  background-image: linear-gradient(
    90deg,
    var(--start-color),
    var(--end-color)
  );
  position: relative;
  opacity: 0;
  z-index: 1;
  animation: var(--animation-name) 8s infinite;
}

html.dark {
  .animated-text-bg {
    color: theme('colors.gray.100');
    &:before {
      color: theme('colors.gray.100');
    }
  }
}

.triangle-shape {
  width: 0;
  height: 0;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  border-bottom: 40px solid theme('colors.green.600');
  transform: translate(-15rem, -6rem) rotate(45deg);
}

.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 140px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 150%;
  left: 50%;
  margin-left: -75px;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip .tooltiptext::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>
