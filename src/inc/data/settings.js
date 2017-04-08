require('./defaults');

let app = window.app || {};
let data;

if (app.hasOwnProperty('data')) data = window.app.data;
else data = window.app.data = {};

data.settings = (function(defaults) {

	let settings = {
		get: function(variable) {
			let query = window.location.search.substring(1);
			let varArray = query.split('&');
			let vars = {};
			for (let i = 0; i < varArray.length; i++) {
				let pair = varArray[i].split('=');
				if (typeof pair[0] !== 'undefined' && typeof pair[1] !== 'undefined')
					vars[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
			}
			if (variable) {
				if (typeof vars[variable] === 'undefined' && defaults.hasOwnProperty(variable)) return defaults[variable];
				return vars[variable];
			}
			else {
				for (let aDefault in defaults) {
					if (defaults.hasOwnProperty(aDefault) && typeof vars[aDefault] === 'undefined')
						vars[aDefault] = defaults[aDefault];
				}
				return vars;
			}
		},
		set: function(variable, value) {
			if (!(typeof variable === 'string' && variable.length > 0)) throw new TypeError();
			value = (typeof value === 'string' && value.length > 0) ? value : "";
			let vars = this.get();
			vars[variable] = value;
			let varArray = [];
			for (let aVar in vars) {
				if (typeof vars[aVar] !== 'undefined' && vars[aVar].length > 0)
					varArray.push(encodeURIComponent(aVar) + "=" + encodeURIComponent(vars[aVar]));
			}

			let query = '?';
			if (varArray.length > 1) query += varArray.join("&")
			else if (varArray.length === 1 ) query += varArray[0];
			
			window.history.replaceState(null, document.title, query);
		}		
	}

	return settings;

})(data.defaults);