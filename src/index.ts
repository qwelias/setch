/**
 * Make setch function with baseUrl, baseOptions, baseStatus
 */
 export const makeSetch = (
    baseUrl: string,
    baseOptions: RequestInit = {},
    baseStatus?: Status,
): typeof setch => (url, options = {}, status?) => setch(
    baseUrl + url,
    { ...baseOptions, ...options, headers: { ...baseOptions?.headers, ...options?.headers } },
    status ?? baseStatus,
)

/**
 * Make fetch and throw on unexpected status code
 */
export const setch = async (url: string, options: RequestInit = {}, status: Status = true) => {
    const res = await fetch(url, options)

    if (!isOk(status, res)) throw Object.assign(
        new Error(res.statusText),
        { name: 'SetchStatusError', statusCode: res.status, req: { url, options }, expected: status },
    )

    return res
}

export type Status = number | RegExp | boolean
export const isOk = (status: Status, res: Response) => {
    if (status === false) return true
    if (status === true) return res.ok
    if (status instanceof RegExp) return status.test(String(res.status))
    return res.status === status
}

export const mime = {
    json: 'application/json; charset=utf-8',
    urlencoded: 'application/x-www-form-urlencoded; charset=utf-8',
} as const
