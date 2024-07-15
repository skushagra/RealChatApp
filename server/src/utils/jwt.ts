import Jwt from "jsonwebtoken"

class JWT {
    public jwt;
    public signature: string;
    constructor(signature: string) {
        this.signature = signature;
        this.jwt = Jwt;
    }

    sign(secret: string) {
        const token: string = this.jwt.sign(this.signature, secret);
        return token;
    }

    verify(token: string) {
        try {
            const decoded = this.jwt.verify(token, this.signature);
            return decoded;
        } catch (err) {
            console.log('Token verification failed: ', err);
            return null;
        }
    }
}

export default new JWT("appSignature");