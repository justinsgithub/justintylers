export default defineEventHandler((event) => {
  console.log('New request: ' + (event.req.url || 'No node'))
  console.log (JSON.stringify(event.context))
})
