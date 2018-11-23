const events = require('events')

let Mouse = null

try {
	if(process.arch != 'x64') throw Error()
}
catch {
	console.error('\x1b[31m' + 'ERROR ' + '\x1b[0m' +
	'32-bit Node.JS is not compatible with Cosplayer. Please go here for advice:\n' +
	'\x1b[36m' + 'https://github.com/TeraProxy/Cosplayer/wiki/Version-Incompatibility' + '\x1b[0m')
}

switch(process.versions.modules) {
	case("67"): // Node.js 11
		Mouse = require('./mouse/67.node').Mouse
		break;
	case("64"): // Node.js 10
		Mouse = require('./mouse/64.node').Mouse
		break;

	default:
		console.error('\x1b[31m' + 'ERROR ' + '\x1b[0m' +
		'Your current Node.JS version is not compatible with Cosplayer. Please go here for advice:\n' +
		'\x1b[36m' + 'https://github.com/TeraProxy/Cosplayer/wiki/Version-Incompatibility' + '\x1b[0m')
}

module.exports = function() {
	let that = new events.EventEmitter(),
		mouse = null,
		right = false

	that.once('newListener', () => {
		mouse = new Mouse(function(type, x, y) {
			if(type === 'right-down') right = true
			else if(type === 'right-up') right = false

			that.emit(type, x, y)
		})
	})

	that.ref = function() {
		if(mouse) mouse.ref()
	}

	that.unref = function() {
		if(mouse) mouse.unref()
	}

	that.destroy = function() {
		if(mouse) mouse.destroy()
		mouse = null
	}

	return that
}
