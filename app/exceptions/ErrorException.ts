
type ErrorContent = {
    status: false,
    key: string,
    message: string,
    content?: object
}

const ErrorConstants: {[key: string]: string} = {
    SOMETHINGWENTWRONG: 'Something went wrong!',
    EMAILALREADYEXISTS: 'Email already exist in the system!',
    INVALIDPASSWORD: 'Invalid Password!',
    INVALIDEMAIL: 'Invalid Email!',
    VALIDATIONERROR: 'Invalid data!',
}

export default class ErrorException extends Error
{
    key: string;
    message: string;
    extraData: object;
    statusCode: number;

    constructor(key: string = '', extraData: object = {})
    {
        super(key);
        this.key = ErrorConstants[key] ? key : 'SOMETHINGWENTWRONG';

        this.message = ErrorConstants[this.key]; // debugging
        this.extraData = extraData;
        this.statusCode = 400;

        Error.captureStackTrace(this, this.constructor);
    }

    render()
    {
        const response: ErrorContent = {
            status: false,
            key: this.key,
            message: this.message
        };

        if (Object.keys(this.extraData).length > 0) {
            response.content = this.extraData;
        }

        return response;
    }
}
