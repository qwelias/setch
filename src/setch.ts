import { SetchStatusError } from './SetchStatusError'
import type { SetchInit, ExpectedStatus } from './types'

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
 * Implements `ExpectedStatus` check against `Response`
 */
export const isOk = (status: ExpectedStatus, res: Response) => {
    if (status === false) return true
    if (status === true) return res.ok
    if (status instanceof RegExp) return status.test(String(res.status))
    return res.status === status
}
