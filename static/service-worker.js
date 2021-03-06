/* eslint-env serviceworker */
/* global toolbox, idbKeyval */
importScripts('/assets/sw-toolbox/sw-toolbox.js');
importScripts('/assets/idb-keyval/idb-keyval.js');

toolbox.precache([
	'/_shell',
	'/app.js',
	'/style.css',
	'https://image.webservices.ft.com/v1/images/raw/fticon:brand-ft-masthead?source=newsfeed'
]);

function serveShell(request, values, options) {
	return toolbox.fastest(new Request('/_shell'));
}

toolbox.router.get('/', serveShell);
toolbox.router.get('/content/:uuid', serveShell);

toolbox.router.get('/app.js', toolbox.fastest);
toolbox.router.get('/style.css', toolbox.fastest);

toolbox.router.get('/_api/search/:page', toolbox.fastest);
toolbox.router.get('/_api/article/:uuid', toolbox.fastest);

toolbox.router.get(
	'/v1/images/raw/fticon:brand-ft-masthead',
	toolbox.cacheOnly,
	{origin: 'https://image.webservices.ft.com'}
);

toolbox.router.get(
	'/build/v2/files/o-fonts-assets@1.3.0/:font',
	toolbox.cacheFirst,
	{origin: 'https://h2.ft.com'}
);
