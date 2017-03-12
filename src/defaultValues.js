require('./baseData');

window.app = window.app || {};
window.app.defaultValues = window.app.defaultValues || {};

(function() {
	console.log(window.app);
	var defaultValues = window.app.defaultValues;
	var baseData = window.app.baseData;

	defaultValues.inflation = () => {

		let yearMax = Math.max.apply(null,Object.keys(baseData.inflation))
		,yearMin = Math.min.apply(null,Object.keys(baseData.inflation))
		,cpiYearMax = baseData.inflation[yearMax].cpi
		,cpiYearMin = baseData.inflation[yearMin].cpi
		,years = yearMax - (yearMin - 1);

		return Math.pow(cpiYearMax*1.0/cpiYearMin, 1/years) - 1;
	}

	defaultValues.ageRetirement = 65;
	defaultValues.ratesOfReturn = [6.5,4];

})();
