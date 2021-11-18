import { Response } from 'express';

export default class Utils {
	public static success(
		res: Response,
		data?: any,
		message?: string | number,
	) {
		const response: {
			success: boolean;
			data?: any;
			message?: string | number;
		} = {
			success: true,
		};
		if (data) response.data = data;
		if (message) response.message = message;
		return res.status(200).json(response);
	}
	public static notFound(res: Response) {
		return res.status(404).json({
			success: false,
			message: 'Not found.',
		});
	}
	public static badRequest(res: Response, message?: string) {
		return res.status(401).json({
			success: false,
			message: message,
		});
	}
	public static internalError(res: Response, message?: string) {
		return res.status(500).json({
			success: false,
			message: message,
		});
	}
	public static sendCustomError(
		res: Response,
		status: number,
		message?: string,
	) {
		return res.status(status).json({
			success: false,
			message: message,
		});
	}
}
