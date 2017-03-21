window.app = (() => {
	
	let app = {},
	records = app.records = [],
	cache = app.cache = {},
	objects = app.objects = {}

	let AppDate = objects.AppDate = function(date) {
		if (!(this instanceof AppDate)) throw new Error('Requires instantiation');

		if (AppDate.prototype.isAppDate(date)) this._value = date;
		else if (date instanceof Date) this._value = this.constructor.prototype.parseDate(date)
		else throw new TypeError();

		Object.defineProperty(this, 'value', {value: date});
		Object.defineProperty(this, 'increment', {value: function() {
			let value = AppDate.prototype.increment(this._value);
			return value;
		}});
	}

	AppDate.prototype = {
		valueOf: function() { return this._value; },
		isAppDate: function(date) {
			if (
				Number.isInteger(date)
				&& date >= 190001
				&& date < 220001
				&& date % 100 <= 12
				&& date % 100 !== 0		
			) return true;

			return false;
		},
		parseDate: function(date) {
			if (!(date instanceof Date)) throw new TypeError();
			return Number.parseInt((date.getFullYear()).toString() + ('00' + (date.getMonth()+1)).substr(-2,2), 10);
		},
		increment: function(date) {
			if (!(this.isAppDate(date))) throw new TypeError();
			return new AppDate(date + ((date % 100 === 12) ? 89 : 1));
		}
	}

	let Account = objects.Account = function(balance, rAnnual) {
		if (['undefined', 'number'].indexOf(typeof balance)) throw new TypeError();
		if (['undefined', 'number', 'function'].indexOf(typeof rAnnual) === -1) throw new TypeError();

		this.balance = balance || 0;
		this.rAnnual = rAnnual || 0;
	}

	let Record = objects.Record = function(date, previousRecord) {
		if (!(this instanceof objects.Record)) throw new Error('Requires instantiation');
		if (!AppDate.isAppDate(date)) throw new TypeError();

		Object.defineProperty(this, 'date', {value: date});
		let accounts = ['assets', 'liabilities'];
		this.trxns = {};
		this.income = {};
		this.sums = {}

		// Validate previousRecord
		if (!(typeof previousRecord === 'undefined' || previousRecord instanceof this.constructor)) {
			if (typeof previousRecord === 'object') {
				accounts.forEach((category) => {
					if (!(previousRecord.indexOf(category) !== -1 && typeof previousRecord[category] === 'number')) throw new TypeError();
				});
			}
			else throw new TypeError();
		}

		this.previousRecord = previousRecord;

		// Define category properties and set values
		accounts.forEach((category) => {

			Object.defineProperty(this, category, {
				get: () => {
					let accounts = {};
					if (previousRecord && previousRecord[category] && Object.keys(previousRecord[category]).length) {
						for (let account in previousRecord[category]) {
							if (previousRecord[category].hasOwnProperty(account)) {
								let rAnnual;
								if (typeof account.rAnnual === 'number') rAnnual = account.rAnnual;
								else if (typeof account.rAnnual === 'function') rAnnual = account.rAnnual.call(this)
								else rAnnual = 0; 
								accounts[account] = account.balance * (1 + rAnnual/12);
								if (this.trxns.hasOwnProperty(account)) accounts[account] += this.trxns[account];
							}
						}
					}
					return accounts;
				},
				// set: (accounts) => {
				// 	if (typeof accounts !== 'object') throw new TypeError();

				// 	for (account in accounts) {
				// 		if (accounts.hasOwnProperty(account) && accounts[account] instanceof objects.Account) {
				// 			this['_' + category][account] = accounts[account];
							
				// 		}
				// 	}
				// 					
				// }
			});

			Object.defineProperty(this.sums, category, {
				get: () => {
					return Record.sum(this[category]);
				}
			})

		});

		Object.seal(this.sums);
		Object.seal(this);
		
	}

	Record.prototype = {
		sum: (accounts) => {
			let sum = 0;
			
			for (let account in accounts) {
				if (accounts.hasOwnProperty(account) && accounts[account] instanceof objects.Account) {
					if (typeof accounts[account].balance === 'number') sum += accounts[account].balance;
					else throw new TypeError();
				}
			}

			return sum;
		}
	}

	app.run = function(dob) {
		console.log(this);
		if (!(this.objects.AppDate.isAppDate(dob) || dob instanceof Date)) throw new TypeError();

		if (dob instanceof Date) dob = new this.objects.AppDate(this.objects.AppDate.parseDate((dob)));

		let records = [];
		let current = new this.objects.AppDate(this.objects.AppDate.parseDate((new Date())));

		records.push(new this.objects.Record(current));

		for (let i=0; i < (dob + 9000); i++) {
			current += (current % 100 === 12) ? 89 : 1
			records.push(new this.objects.Record(current, records[i]));
		}

		return records;
	}

	return app;
})();