const lunr = require('lunr');

let index;

function resetIndex(files) {
	index = lunr(function () {
		this.field('file', { boost: 10 });
		this.field('type');
		this.field('extname');
		this.ref('path');
		files.forEach(function (file) {
			this.add(file);
		}, this);
	});
}


function find(query, cb) {
	if (!index) {
		resetIndex();
	}
	const results = index.search(`${query}*`);
	cb(results);
}




module.exports = {
	resetIndex,
	find,
};
