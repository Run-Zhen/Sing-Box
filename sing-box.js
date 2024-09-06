const { type, name } = $arguments
const compatible_outbound = {
  tag: 'COMPATIBLE',
  type: 'direct'
}

let compatible
let config = JSON.parse($files[0])
let proxies = await produceArtifact({
  name: 'RZ',
  type: 'collection',
  platform: 'sing-box',
  produceType: 'internal'
})

config.outbounds.push(...proxies)

config.outbounds.map(i => {
  if (['Proxy'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies))
  }
  if (['🇭🇰 Hong Kong'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /港|hk|hong kong|Hong Kong|🇭🇰/i))
  }
  if (['🇹🇼 Taiwan'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /台|tw|taiwan|Taiwan|🇹🇼/i))
  }
  if (['🇺🇸 United States'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /美|us|United States|united states|🇺🇸/i))
  }
  if (['🇯🇵 Japan'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /日本|jp|japan|Japan|🇯🇵/i))
  }
  if (['ALL'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, //i))
  }
})

config.outbounds.forEach(outbound => {
  if (Array.isArray(outbound.outbounds) && outbound.outbounds.length === 0) {
    if (!compatible) {
      config.outbounds.push(compatible_outbound)
      compatible = true
    }
    outbound.outbounds.push(compatible_outbound.tag);
  }
});

$content = JSON.stringify(config, null, 2)

function getTags(proxies, regex) {
  return (regex ? proxies.filter(p => regex.test(p.tag)) : proxies).map(p => p.tag)
}
