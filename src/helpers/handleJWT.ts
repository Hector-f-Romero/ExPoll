import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.SECRET_JWT);

const generateJWT = async (id: string, role: string) => {
	return await new SignJWT({ id, role })
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setIssuer("expoll.dev")
		.setAudience("expoll.com")
		.setExpirationTime("2h")
		.sign(secret);
};

const verifyWT = async (token: string) => {
	return await jwtVerify(token, secret, {
		issuer: "expoll.dev",
		audience: "expoll.com",
	});
};

export { generateJWT, verifyWT };
