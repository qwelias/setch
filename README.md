**S**implest f**ETCH** wrapper I could come up with to reduce boilerplate code when using `fetch` on a daily basis while keeping as much compatibility with standard as possible

## features
- creating `setch` functions with default options
- flexible status code checks with proper errors
- aliases to common content-type strings

## install
`npm i setch`

## usage
```ts
// basics, see docs for details
import { setch, makeSetch, mime } from 'setch'

// capture common parameters for reuse
const setchMyApi = makeSetch(
  baseUrlString, // final url will be baseUrlString + urlString
  { headers: { accept: mime.json } }, // will be merged with options, headers too
  200, // expected status, will throw if it isn't, can be overridden and flexible, see docs
)
// same as setch, but uses captured parameters too
const json = await setchMyApi(urlString, options).then(r => r.json())
```

## docs
[generated typedoc](https://setch.qwelias.me)

but there's not much to it really, have a look at [source](https://github.com/qwelias/setch/blob/master/src) if you're curious :^)
