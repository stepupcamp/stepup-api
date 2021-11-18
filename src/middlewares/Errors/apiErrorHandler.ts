import ApiError from './ApiError';

function apiErrorHandler(
	err: { status: number; message: string },
	_req: any,
	res: any,
	_next: any,
) {
	if (err instanceof ApiError) {
		res.status(err.status).json(err.message);
		return;
	}

	res.status(500).json('Something went wrong on server.');
}
export default apiErrorHandler;
