window.app = window.app || {};
window.app.baseData = window.app.baseData || {};

(function() {
	
	var baseData = window.app.baseData;

	baseData.inflation = {
		1997: { cpi: 90.4, pctchg: 1.7 },
		1998: { cpi: 91.3, pctchg: 1 },
		1999: { cpi: 92.9, pctchg: 1.8 },
		2000: { cpi: 95.4, pctchg: 2.7 },
		2001: { cpi: 97.8, pctchg: 2.5 },
		2002: { cpi: 100, pctchg: 2.2 },
		2003: { cpi: 102.8, pctchg: 2.8 },
		2004: { cpi: 104.7, pctchg: 1.8 },
		2005: { cpi: 107, pctchg: 2.2 },
		2006: { cpi: 109.1, pctchg: 2 },
		2007: { cpi: 111.5, pctchg: 2.2 },
		2008: { cpi: 114.1, pctchg: 2.3 },
		2009: { cpi: 114.4, pctchg: 0.3 },
		2010: { cpi: 116.5, pctchg: 1.8 },
		2011: { cpi: 119.9, pctchg: 2.9 },
		2012: { cpi: 121.7, pctchg: 1.5 },
		2013: { cpi: 122.8, pctchg: 0.9 },
		2014: { cpi: 125.2, pctchg: 2 },
		2015: { cpi: 126.6, pctchg: 1.1 },
		2016: { cpi: 128.4, pctchg: 1.4 },
	}

	baseData.tax = baseData.tax || {};

	baseData.tax.brackets = {
		2017: {
			fed: {
				0: 0.15,
				45917: 0.205,
				91832: 0.26,
				142354: 0.29,
				202801: 0.33
			},
			on: {
				0: 0.0505,
				42201: 0.0915,
				84405: 0.1116,
				150001: 0.1216,
				220001: 0.1316
			}
		}
	}

	baseData.tax.credits = {
		2017: {
			fed: {
				personal: 11635,
				cpp: {
					basicExemption: 3500,
					rate: 0.0495,
					max: {
						ee: 2564.10,
						er: 2564.10
					}
				},
				ei: {
					basicExemption: 3500,
					rate: 0.0163,
					max: {
						ee: 836.19,
						er: 1170.67
					}
				}
			},
			on: {
				personal: 10171
			}
		}
	}

	baseData.tax.specials = {
		2017: {
			fed: {
				employmentAmount: 1177
			},
			on: {
				healthprem: {
					0: 0,
					20001: (incomeTaxable) => { return (incomeTaxable - 20000) * 0.06},
					25001: (incomeTaxable) => { return 300 },
					36001: (incomeTaxable) => { return 300 + (incomeTaxable - 36000) * 0.06},
					38501: (incomeTaxable) => { return 450 },
					48001: (incomeTaxable) => { return 450 + (incomeTaxable - 48000) * 0.25},
					48601: (incomeTaxable) => { return 600 },
					72001: (incomeTaxable) => { return 600 + (incomeTaxable - 72000) * 0.25},
					72601: (incomeTaxable) => { return 750 },
					200001: (incomeTaxable) => { return 750 + (incomeTaxable - 200000) * 0.25},
					200601: (incomeTaxable) => { return 900 },
				},
				surtax: {
					4556: 0.2,
					5831: 0.36
				},
				taxReduction: 231
			}
		}
	}

	baseData.ympe = {
		2016: 54900,
		2017: 55300		
	}

	baseData.limits = {
		rrsp: {
			2017: 26010
		},
		dpsp: {
			2017: 13115
		},
		tfsa: {
			2009: 5000,
			2010: 5000,
			2011: 5000,
			2012: 5000,
			2013: 5500,
			2014: 5500,
			2015: 10000,
			2016: 5500,
			2017: 5500
		}
	}
	baseData.incomeFund = {
		getMin: (age) => {
			if (!Number.isInteger(age)) throw new TypeError();
			if (age < 55) {
				return 0;
			} else if (age < 71) {
				return 1/(90-age);
			} else if (age > 95) {
				return 0.2
			} else {
				let factor = {
					71: 0.0528,
					72: 0.054,
					73: 0.0553,
					74: 0.0567,
					75: 0.0582,
					76: 0.0598,
					77: 0.0617,
					78: 0.0636,
					79: 0.0658,
					80: 0.0682,
					81: 0.0708,
					82: 0.0738,
					83: 0.0771,
					84: 0.0808,
					85: 0.0851,
					86: 0.0899,
					87: 0.0955,
					88: 0.1021,
					89: 0.1099,
					90: 0.1192,
					91: 0.1306,
					92: 0.1449,
					93: 0.1634,
					94: 0.1879,
					95: 0.2
				}
				return factor[age];
			}
		},
		getMax: (age, jurisdiction, lifYear) => {
			if (!Number.isInteger(age) || !Number.isInteger(lifYear)) throw new TypeError();
			let max = {
				on: () => {
					if (lifYear >= 2016) {
						if (age < 41) {
							return 0;
						}
						else if (age > 90) {
							return 1;
						}
						else {
							let rates = {
								41: 0.0598531,
								42: 0.06006,
								43: 0.0602808,
								44: 0.0605167,
								45: 0.0607687,
								46: 0.0610382,
								47: 0.0613265,
								48: 0.061635,
								49: 0.0619655,
								50: 0.0623197,
								51: 0.0626996,
								52: 0.0631073,
								53: 0.0635454,
								54: 0.0640164,
								55: 0.0645234,
								56: 0.0650697,
								57: 0.0656589,
								58: 0.0662952,
								59: 0.0669833,
								60: 0.0677285,
								61: 0.0685367,
								62: 0.0694147,
								63: 0.0703703,
								64: 0.0714124,
								65: 0.0725513,
								66: 0.0737988,
								67: 0.0751689,
								68: 0.0766778,
								69: 0.0783449,
								70: 0.080193,
								71: 0.0822496,
								72: 0.084548,
								73: 0.0871288,
								74: 0.0900423,
								75: 0.0933511,
								76: 0.0971347,
								77: 0.1014952,
								78: 0.1065661,
								79: 0.1125255,
								80: 0.119616,
								81: 0.1281773,
								82: 0.1387002,
								83: 0.1519207,
								84: 0.1689953,
								85: 0.1918515,
								86: 0.2239589,
								87: 0.2722561,
								88: 0.3529338,
								89: 0.5145631,
								90: 1
							}
							return rates[age];
						}
					}
					else throw new RangeError('Only LIF/LRIFs under new regulations effective 2016 are supported.');
				}
			}
			return max[jurisdiction]();			
		}
	}

})();
