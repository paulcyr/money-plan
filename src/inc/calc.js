window.app = window.app || {};
window.app.calc = window.app.calc || {};

(function() {
	
	var calc = window.app.calc;
	
	calc.priceIndex = (yearMonth, inflationAnnual) => {
		if (!Number.isInteger(yearMonth)) throw new TypeError();
		if (typeof inflationAnnual !== 'number') throw new TypeError();
		let current = Number.parseInt(
			(new Date()).getUTCFullYear()
			+ ('0' + (new Date().getUTCMonth() + 1)).slice(-2)
		,10);
		if (yearMonth < current) throw new RangeError();
		if (current === yearMonth) return 1;
		let prevYearMonth = yearMonth % 100 === 1
			? (Number.parseInt(yearMonth/100, 10)-1)*100+12
			: yearMonth - 1;
		let result = (1+(inflationAnnual/12)) * calc.priceIndex(prevYearMonth, inflationAnnual);
		return result;
	}

	calc.rorTarget = (t1, retirementYearMonth, t0Ror, tRRor) => {
		if (!Number.isInteger(t1)) throw new TypeError();
		if (!Number.isInteger(retirementYearMonth)) throw new TypeError();
		if (typeof t0Ror !== 'number') throw new TypeError();
		if (typeof tRRor !== 'number') throw new TypeError();
		if (!(t0Ror >= tRRor)) throw new RangeError();
		
		if (t1 >= retirementYearMonth) return tRRor;
		if (t1 <= retirementYearMonth-4000) return t0Ror;

		return t0Ror-(t0Ror-tRRor)*(4000-(retirementYearMonth-t1))/4000;
	}

	calc.payroll = calc.payroll || {};

	calc.payroll.cpp = (incomeMonth, cppYTD, basicExemption, rate, max) => {
		let basicExemptionMonth = Math.trunc((basicExemption/12)*100)/100,
			deduction =  rate * (incomeMonth - basicExemptionMonth)
			
		return  Math.round(Math.min(deduction, max-cppYTD)*100)/100;
	}

	calc.payroll.ei = (incomeMonth, eiYTD, rate, max) => {
		let deduction = rate * incomeMonth
			
		return  Math.round(Math.min(deduction, max-eiYTD)*100)/100;
	}

	calc.tax = calc.tax || {};
	calc.tax.annual = calc.tax.annual || {};

	calc.tax.net = (payable, credits) => {
		if (!(payable instanceof Array)) throw new TypeError();
		if (!(credits instanceof Array)) throw new TypeError();

		let net = payable.reduce((acc, val) => {
			if (typeof val !== 'number') throw new TypeError(); 
			return acc + val;
		}, 0);

		net -= credits.reduce((acc, val) => {
			if (typeof val !== 'number') throw new TypeError(); 
			return acc + val;
		}, 0);

		return net;
	}

	calc.tax.on = {
		healthPremium: (incomeAnnualTaxable, healthPremiumBrackets) => {
			if (typeof incomeAnnualTaxable !== 'number') throw new TypeError();
			if (!(healthPremiumBrackets instanceof Array)) throw new TypeError();

			for (let i=0; i < healthPremiumBrackets.length; i++) {
				if (typeof healthPremiumBrackets[i] !== 'object') throw new TypeError();
				if (incomeAnnualTaxable >= healthPremiumBrackets[i].start && incomeAnnualTaxable <= healthPremiumBrackets[i].end) {
					return Math.round(healthPremiumBrackets[i].amount(incomeAnnualTaxable)*100)/100;
				}
			}

			throw new RangeError();
		},
		payable: (incomeAnnualTaxable, incomeTaxBrackets, data) => {
			return calc.tax.annual.income(incomeAnnualTaxable, incomeTaxBrackets)
				+ calc.tax.on.healthPremium(incomeAnnualTaxable, data.healthPremiumBrackets);
		},
		credits: {

		},
		net: (payable, creditsNonRefundable, creditsRefundable, surtaxAmts) => {

			creditsRefundable = creditsNonRefundable || 0;

			if (typeof payable !== 'number') throw new TypeError();
			if (typeof creditsNonRefundable !== 'number') throw new TypeError();
			if (typeof creditsRefundable !== 'number') throw new TypeError();
			if (typeof surtaxAmts !== 'undefined' && !(surtaxAmts instanceof Array)) throw new TypeError();

			let net = Math.max(payable-creditsNonRefundable,0),
				surtaxRate = 0,
				i = 0;

			if (surtaxAmts instanceof Array) { 
				do {
					if (net >= surtaxAmts[i].start) {
						surtaxRate += surtaxAmts[i].rate;
					}
					i++;
				} while (net >= surtaxAmts[i].start && i < surtaxAmts.length);
			}

			if (surtaxRate > 0) net *= 1 + surtaxRate;

			return Math.round((net - creditsRefundable)*100)/100;
		}
	}

	calc.tax.annual.income = (incomeAnnualTaxable, brackets) => {
		if (typeof incomeAnnualTaxable !== 'number') throw new TypeError();
		if (!(brackets instanceof Array)) throw new TypeError();

		let i = 0, total = 0, lowerBoundry = brackets[0].start;

		while (incomeAnnualTaxable >= lowerBoundry && i < brackets.length) {
			let currentAmt = 0;
			if (incomeAnnualTaxable > brackets[i].end) {
				currentAmt = brackets[i].end * brackets[i].rate;
			} else {
				currentAmt = (incomeAnnualTaxable - brackets[i].start) * brackets[i].rate;
			}
			total += Math.round(currentAmt * 100)/100;
			i++;
			if (i < brackets.length) lowerBoundry = brackets[i].start;
		}
		return total;
	}



})();
