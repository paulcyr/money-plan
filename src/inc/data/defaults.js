require('./base');

let app = window.app || {};
let data;

if (app.hasOwnProperty('data')) data = window.app.data;
else data = window.app.data = {};

data.defaults = (function(base) {
	
	let defaults = {
		inflation: function inflation() {
			let yearMax = Math.max.apply(null,Object.keys(base.inflation))
			,yearMin = Math.min.apply(null,Object.keys(base.inflation))
			,cpiYearMax = base.inflation[yearMax].cpi
			,cpiYearMin = base.inflation[yearMin].cpi
			,years = yearMax - (yearMin - 1);

			return Math.pow(cpiYearMax*1.0/cpiYearMin, 1/years) - 1;
		},
		ageRetirement: 65,
		ratesOfReturn: [6.5,4],
		dob: app.objects.AppDate.prototype.increment(new app.objects.AppDate(), -12*25)
	}
	
	return defaults;

})(data.base);