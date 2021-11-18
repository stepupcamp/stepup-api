import { Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import Debug from 'debug';
const debug = Debug('dev:exception');

export default (err: HttpException, req: Request, res: Response) => {
	res.status(err.status || 500)
		.json({
			success: false,
			message: err.message
		});

	/* Displays the exception trance in console for dev environment */
	debug('Exception %O', err);
};