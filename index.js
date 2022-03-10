const fetchSiaZone = require('./fetch-sia-zone');
const { wire: { types } } = require('bns');

function middleware () {
  const zones = new Map()
  return {
    hostname: ':data.:protocol(_skyname).', 
    handler: async ({ protocol, data }, name, type) => {
      data = data.split('.')
      const skylink = data[data.length - 1]
      try {
        let zone = zones.get(skylink) 

        if (!zone) {
          zone = await fetchSiaZone(skylink)
          zones.set(skylink, zone)
          console.log(zone)
        }
        const res = zone.resolve(name, types[type])
        console.log(name, types[type], res)
        return res
      } catch (e) {
        console.log('error', e)
        return null
      }
    }
  }
}

module.exports = middleware