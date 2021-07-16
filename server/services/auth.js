import jwt from "express-jwt"
import jwks from "jwks-rsa"

const secret = jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-xii7jtio.us.auth0.com/.well-known/jwks.json'
})

export const jwtCheck = jwt({
    secret: secret,
    audience: 'https://live-chatty.com',
    issuer: 'https://dev-xii7jtio.us.auth0.com/',
    algorithms: ['RS256']
})