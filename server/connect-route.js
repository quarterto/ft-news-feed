import base from '../views/base';
import main from '../components/main';

import shell from '../styles/shell.scss';
import header from '../styles/header.scss';

export const html = (req, res) => children => {
	res.headers['content-type'] = 'text/html';
	return base({body: main({children}), styles: [shell, header].map(s => s._getCss()).join('')});
};

export const json = (req, res) => obj => {
	res.headers['content-type'] = 'application/json';
	return JSON.stringify(obj);
};

export const id = (req, res) => a => a;

export default (routes, wrap = id) => (req, res, next) => {
	res.headers = {};
	return Promise.resolve(routes(req, res, next))
		.then(wrap(req, res, next))
		.then(t => {
			res.writeHead(res.statusCode, res.headers);
			res.end(t);
		})
		.catch(next);
}
