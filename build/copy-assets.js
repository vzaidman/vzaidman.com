const fs = require('fs')
const path = require('path')

const mkdir = dir => {
	try {
		fs.mkdirSync(dir, 0o755);
	} catch(e) {
		if(e.code != "EEXIST") {
			throw e;
		}
	}
};

const copyDir = (src, dest) => {
	mkdir(dest);
	var files = fs.readdirSync(src);
	for(let i = 0; i < files.length; i++) {
		const current = fs.lstatSync(path.join(src, files[i]));
		if(current.isDirectory()) {
			copyDir(path.join(src, files[i]), path.join(dest, files[i]));
		} else if(current.isSymbolicLink()) {
			const symlink = fs.readlinkSync(path.join(src, files[i]));
			fs.symlinkSync(symlink, path.join(dest, files[i]));
		} else {
			fs.copyFileSync(path.join(src, files[i]), path.join(dest, files[i]));
		}
	}
};

module.exports = () => {
	copyDir('assets', 'dist')
}
