export class NotFoundInBD extends Error {
	constructor(message: string) {
		super(message);
		this.name = "NotFoundError";
	}
}

export class AlreadyExistInBD extends Error {
	constructor(message: string) {
		super(message);
		this.name = "AlreadyExistDocumentInBDError";
	}
}

export class NotFoundAuthToken extends Error {
	constructor(message: string) {
		super(message);
		this.name = "NotFoundAuthToken";
	}
}
