export class SetchStatusError extends Error {
    override name = 'SetchStatusError'

    constructor(
        readonly url: string,
        readonly options: SetchInit,
        readonly res: Response,
        readonly expectedStatus: ExpectedStatus,
    ) {
        super('Unexpected HTTP response status code')
    }

    get status() {
        return this.res.status
    }
    get statusCode() {
        return this.res.status
    }

    expectedStatusToJson() {
        return this.expectedStatus instanceof RegExp
            ? `RegExp(${String(this.expectedStatus)})`
            : this.expectedStatus
    }

    toJSON() {
        return {
            name: this.name,
            message: this.message,
            url: this.url,
            options: this.options,
            expectedStatus: this.expectedStatusToJson,
            res: {
                status: this.res.status,
                // @ts-ignore TS dumm, it's there
                headers: Object.fromEntries([...this.res.headers.entries()]),
            },
        }
    }
}

/**
 * Make setch function capturing base url and some defaults for reusability sake
 */
export const makeSetch = (
    baseUrl: string,
    defaultOptions: SetchInit = {},
    defaultExpectedStatus?: ExpectedStatus,
): typeof setch => (url, options = {}, expectedStatus?) => setch(
    baseUrl + url,
    { ...defaultOptions, ...options, headers: { ...defaultOptions?.headers, ...options?.headers } },
    expectedStatus ?? defaultExpectedStatus,
)

/**
 * Do fetch and throw on unexpected status code,
 * see `ExpectedStatus` docs for details
 */
export const setch = async (
    url: string,
    options: SetchInit = {},
    expectedStatus: ExpectedStatus = true,
) => {
    const res = await fetch(url, options)

    if (!isOk(expectedStatus, res)) {
        throw new SetchStatusError(url, options, res, expectedStatus)
    }

    return res
}

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

/**
 * Implements `ExpectedStatus` check against `Response`
 */
export const isOk = (status: ExpectedStatus, res: Response) => {
    if (status === false) return true
    if (status === true) return res.ok
    if (status instanceof RegExp) return status.test(String(res.status))
    return res.status === status
}

/**
 * Just some shortcuts for use in `content-type` or `accept` headers
 */
export const mime = {
    json: 'application/json; charset=utf-8',
    urlencoded: 'application/x-www-form-urlencoded; charset=utf-8',
} as const
