import { SignJWT } from "jose";

const generateJWT = async (id: string) => {
	const secret = new TextEncoder().encode(process.env.SECRET_JWT);

	return await new SignJWT({ id })
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setIssuer("expoll.dev")
		.setAudience("expoll.com")
		.setExpirationTime("2h")
		.sign(secret);
};

const verifyJWT = async () => {
	console.log("a");
};
export { generateJWT, verifyJWT };
