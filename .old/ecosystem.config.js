module.exports = {
  apps: [
    {
      name: 'justintylers',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}
