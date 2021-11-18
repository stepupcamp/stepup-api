import mongoose from 'mongoose';
import config from '../config';
import fs from 'fs';
import LooseObject from '../interfaces/LooseObject';

mongoose.plugin((schema: any) => {
	if (schema.options._id === false) {
		// Removing "id" getter when the _id is set to false in the schema options.
		schema.set('id', false);
	}

	let prevTransform: (
		doc: mongoose.Document,
		ret: LooseObject,
	) => LooseObject;
	if (
		schema.options.toObject &&
		typeof schema.options.toObject.transform === 'function'
	) {
		prevTransform = schema.options.toObject.transform;
	}

	const transform = (doc: mongoose.Document, ret: LooseObject) => {
		let obj = ret;
		if (prevTransform) {
			obj = prevTransform(doc, ret);
		}

		delete obj._id;
		delete obj.__v;

		return obj;
	};

	const toObject = {
		...{ versionKey: false, getters: true, virtuals: true },
		...schema.options.toObject,
		...{ transform },
	};
	const toJSON = {
		...{ versionKey: false, getters: true, virtuals: true },
		...schema.options.toJSON,
		...{ transform },
	};
	schema.set('toJSON', toJSON);
	schema.set('toObject', toObject);
});

const options = { useNewUrlParser: true, useUnifiedTopology: true };

if (process.env.NODE_ENV === 'production') {
	const ca = [fs.readFileSync(config.mongoCertPath)];
	options.server = {
		sslValidate: true,
		sslCA: ca,
	};
}

export default async () => {
	const connection = await mongoose.connect(config.databaseURL, options);

	return connection.connection.db;
};
