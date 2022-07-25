# setch
**S**implest f**ETCH** wrapper I could come up with to reduce boilerplate code when using `fetch` on a daily basis while keeping as much compatibility with standatd as possible

### install
`npm i setch`

### usage
```ts
// basics
import { setch, mime } from 'setch'

// will reject if !Response.ok, so we can safely call json()
// see docs for more configuration
const json = await setch(
  urlString,
  { headers: { accept: mime.json } },
).then(r => r.json())
```

### docs
there's not much to it really, have a look at [source](https://github.com/qwelias/setch/blob/master/src/index.ts) or [generated typedoc](https://setch.qwelias.me/functions/setch.html)
