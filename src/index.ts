/**
 * Make setch function with baseUrl, baseOptions, baseStatus
 *
 * @param baseUrl url string to use as a base
 * @param baseOptions request options to use as a base
 * @param baseStatus expected base status code
 * @returns `setch` function where you can append to `baseUrl`,
 * merge extra options (`headers` merged separately, so it's required to be a `Record`),
 * or use another expected status
 */
 export const makeSetch = (
    baseUrl: string,
    baseOptions: SetchInit = {},
    baseStatus?: Status,
): typeof setch => (url, options = {}, status?) => setch(
    baseUrl + url,
    { ...baseOptions, ...options, headers: { ...baseOptions?.headers, ...options?.headers } },
    status ?? baseStatus,
)

/**
 * fetch and throw on unexpected status code
 *
 * @param url
 * @param options same as `RequestInit`, except `headers` have to be a `Record` so it's easy to merge them with ones from `baseOptions`
 * @param status expected response status code.
 * Either number or RegExp to match,
 * if true uses Response.ok, if false no check is made
 */
export const setch = async (url: string, options: SetchInit = {}, status: Status = true) => {
    const res = await fetch(url, options)

    if (!isOk(status, res)) throw Object.assign(
        new Error(res.statusText),
        { name: 'SetchStatusError', statusCode: res.status, req: { url, options }, expected: status },
    )

    return res
}

export type SetchInit = Omit<RequestInit, 'headers'> & { headers?: Record<string, string> }
export type Status = number | RegExp | boolean
export const isOk = (status: Status, res: Response) => {
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
