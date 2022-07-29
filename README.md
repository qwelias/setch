# setch
**S**implest f**ETCH** wrapper I could come up with to reduce boilerplate code when using `fetch` on a daily basis while keeping as much compatibility with standatd as possible

### install
`npm i setch`

### usage
```ts
// basics
import { setch, makeSetch, mime } from 'setch'

const setchMyApi = makeSetch(baseUrl, { headers: { accept: mime.json } }, 200)

// will reject if res.status !== 200, so we can safely call json()
// see setch.qwelias.me for more
const json = await setchMyApi(urlString).then(r => r.json())
```

### docs
there's not much to it really, have a look at [source](https://github.com/qwelias/setch/blob/master/src/index.ts) or [generated typedoc](https://setch.qwelias.me/functions/setch.html)
