window.app = window.app || {};
window.app.calcs = window.app.calcs || {};

(function() {
	
	var calcs = window.app.calcs;
	
	calcs.priceIndex = (yearMonth, inflationAnnual) => {
		if (!Number.isInteger(yearMonth)) throw new TypeError();
		if (typeof inflationAnnual !== 'number') throw new TypeError();
		let current = Number.parseInt(
			(new Date()).getUTCFullYear()
			+ ('0' + (new Date().getUTCMonth() + 1)).slice(-2)
		);
		if (yearMonth < current) throw new RangeError();
		if (current === yearMonth) return 1;
		let prevYearMonth = yearMonth % 100 == 1
			? (Number.parseInt(yearMonth/100)-1)*100+12
			: yearMonth - 1;
		let result = (1+(inflationAnnual/12)) * calcs.priceIndex(prevYearMonth, inflationAnnual);
		return result;
	}

	calcs.rorTarget = (t1, retirementYearMonth, t0Ror, tRRor) => {
		if (!Number.isInteger(t1)) throw new TypeError();
		if (!Number.isInteger(retirementYearMonth)) throw new TypeError();
		if (typeof t0Ror !== 'number') throw new TypeError();
		if (typeof tRRor !== 'number') throw new TypeError();
		if (!(t0Ror >= tRRor)) throw new RangeError();
		
		if (t1 >= retirementYearMonth) return tRRor;
		if (t1 <= retirementYearMonth-4000) return t0Ror;

		return t0Ror-(t0Ror-tRRor)*(4000-(retirementYearMonth-t1))/4000;
	}



})();
