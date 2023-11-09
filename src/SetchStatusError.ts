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

        // makes it appear in logs, etc. (class fields don't)
        Object.defineProperty(this, 'status', {
            enumerable: true,
            get: () => this.res.status,
        })
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
        const options = { ...this.options }
        if ('body' in options) options.body = '[REDACTED]' // body is potentially huge

        return {
            name: this.name,
            message: this.message,
            url: this.url,
            options,
            expectedStatus: this.expectedStatusToJson(),
            res: {
                status: this.res.status,
                // @ts-ignore TS dumm, it's there
                headers: Object.fromEntries([...this.res.headers.entries()]),
            },
        }
    }
}
