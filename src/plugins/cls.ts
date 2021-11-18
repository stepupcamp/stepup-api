/*
 * This implementation is inspired by the package "express-http-context".
 * The reason to not use the package directly is that, it would make
 * the "Continous Local Storage" (CLS) implementation tightly coupled with
 * HTTP request. This implementation allows the usage even if the module using it
 * is not called from a HTTP request.
 */

import { Request, Response, NextFunction } from 'express';
import cls from 'cls-hooked';

const nsid = 'a6a29a6f-6747-4b5f-b99f-07ee96e32f88';
const ns: cls.Namespace = cls.createNamespace(nsid);

/* Express.js middleware that is responsible for initializing the context for each request. */
function middleware(_req: Request, _res: Response, next: NextFunction) {
	ns.run(() => next());
}

/*
 * Gets a value from the context by key.  Will return undefined if the context has not yet been initialized for this request or if a value is not found for the specified key.
 * @param {string} key
 */
function get(key: string): any {
	if (ns && ns.active) {
		return ns.get(key);
	}
}

/*
 * Adds a value to the context by key.  If the key already exists, its value will be overwritten.  No value will persist if the context has not yet been initialized.
 * @param {string} key
 * @param {*} value
 */
function set(key: string, value: any): any {
	if (ns && ns.active) {
		return ns.set(key, value);
	}
}

export default { middleware, get, set, ns };
