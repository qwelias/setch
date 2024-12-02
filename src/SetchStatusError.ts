import type { SetchInit, ExpectedStatus } from './types.js'

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

    toJSON() {
        return {
            name: this.name,
            message: this.message,
            url: this.url,
            options: this.options,
            expectedStatus: expectedStatusToJson(this.expectedStatus),
            res: resToJson(this.res),
        }
    }
}

const expectedStatusToJson = (expectedStatus: ExpectedStatus) => {
    return expectedStatus instanceof RegExp
        ? `RegExp(${String(expectedStatus)})`
        : expectedStatus
}

const resToJson = (res: Response) => {
    return {
        status: res.status,
        // @ts-ignore it works
        headers: Object.fromEntries([...res.headers]),
    }
}
