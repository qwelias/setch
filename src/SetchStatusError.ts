import type { SetchInit, ExpectedStatus } from './types'

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
            expectedStatus: this.expectedStatusToJson(),
            res: {
                status: this.res.status,
                // @ts-ignore TS dumm, it's there
                headers: Object.fromEntries([...this.res.headers.entries()]),
            },
        }
    }
}
