var rollup = require('rollup');
var uglify = require('rollup-plugin-uglify');

Promise.all([{
	file: "index.js",
	format: "iife"
}].map(function(item){
	return rollup.rollup({
		input: "src/" + item.file,
		plugins: [
			uglify()
		]
	}).then(function(bundle){
		bundle.write({
			format: item.format,
			file: "dist/" + item.file
		});
	});
})).then(function(){
	console.error("打包完成");
});