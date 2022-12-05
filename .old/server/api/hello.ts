export default defineEventHandler((event) => {
  console.log(event.context.session)
  return {
    api: 'works'
  }
})

