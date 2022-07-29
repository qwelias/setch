/**
 * Same as standard `RequestInit`, except `headers` can be only Record,
 * so they can be easily merged in `makeSetch`
 */
export type SetchInit = Omit<RequestInit, 'headers'> & { headers?: Record<string, string> }

/**
 * Either boolean or number or RegExp to match,
 * if true uses Response.ok, if false no check is made.
 * See `isOk` for implementation reference
 */
export type ExpectedStatus = number | RegExp | boolean
