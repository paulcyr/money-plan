window.app = window.app || {};

(function() {
	
	let objects = window.app.objects = {};

	function AppDate(...args) {

		let _value = new Date(...args);

		if (Number.isNaN(_value.valueOf())) throw new TypeError();

		this.valueOf = function() {
			return _value;
		}

		this.toString = function() {
			return _value.toString();
		}

		Object.getOwnPropertyNames(Date.prototype).forEach(function(key) {
			if (key === 'constructor') return;
			AppDate.prototype[key] = function () {
				return Date.prototype[key].apply(_value, arguments);
			}
		});

		this.increment = function(addend) {
			let amount = (typeof addend === 'undefined') ? 1 : addend;
			_value = AppDate.prototype.increment(this, amount);
			return this;
		}
	}

	AppDate.prototype.increment = function(appDate, addend) {
		if (!(appDate instanceof AppDate)) throw new TypeError();
		if (!(['undefined', 'number'].indexOf(typeof addend) !== -1 || addend instanceof AppDate))
			throw new TypeError();
	
		if (['undefined', 'number'].indexOf(typeof addend) !== -1) {
			let amount = (typeof addend === 'undefined') ? 1 : addend;
			let newDate = new AppDate(appDate.valueOf())
			newDate.setMonth(newDate.getMonth() + addend);
			return newDate;
		}
		else if (addend instanceof AppDate || addend instanceof Date) {
			return new AppDate(appDate.valueOf() + addend.valueOf());
		}
		
		throw new TypeError();			
	}

	objects.AppDate = AppDate;


	let Account = objects.Account = function(name, properties) {
		if (!(typeof name === 'string' && name.length > 0)) throw new TypeError();
		if (typeof properties !== 'object') throw new TypeError();
		if (!(
			properties.hasOwnProperty('type')
			&& Account.prototype.TYPES.indexOf(properties.type) !== -1)
		) throw new TypeError();
		if (
			properties.hasOwnProperty('balance')			
			&& ['undefined', 'number'].indexOf(typeof properties.balance) === -1
		) throw new TypeError();
		if (
			properties.hasOwnProperty('rAnnual')
			&& ['undefined', 'number', 'function'].indexOf(typeof properties.rAnnual) === -1
		) throw new TypeError();
		if (
			properties.hasOwnProperty('caption')
			&& typeof properties.caption !== 'string'
		) throw new TypeError();

		this.name = name;
		this.type = properties.type;
		this.balance = properties.balance || 0;
		this.rAnnual = properties.rAnnual || 0;
		this.caption = (typeof properties.caption === 'string' && properties.caption.length > 0) ? properties.caption : name;
	}

	Account.prototype.TYPES = ['asset', 'liability']

	let Record = objects.Record = function(date, previousRecord, trxns) {
		console.log(this)
		if (!(this instanceof objects.Record)) throw new Error('Requires instantiation');
		if (!(date instanceof objects.AppDate)) throw new TypeError();
		if (!(typeof previousRecord === 'undefined' || previousRecord instanceof this.constructor))  throw new TypeError();

		Object.defineProperty(this, 'date', {value: date});
		this.previousRecord = previousRecord;
		this.trxns = trxns || {};
		this.accounts = [];
		this.income = {};
		this.sums = {};

		if (previousRecord instanceof Record) {
			this.previousRecord.accounts.forEach((account) => {
				let rAnnual;
				if (typeof account.rAnnual === 'number') rAnnual = account.rAnnual;
				else if (typeof account.rAnnual === 'function') rAnnual = account.rAnnual.call(this)
				else rAnnual = 0; 
				let balance = account.balance * (1 + rAnnual/12);
				if (this.trxns.hasOwnProperty(account)) balance += this.trxns[account.name];
				this.accounts.push(new objects.Account(account.name, account.type, balance, account.rAnnual));
			});
		}
		else if (this.previousRecord instanceof Array)
		{
			if (
				this.previousRecord.some(
					function(value) {
						return !(value instanceof Account);
					}
			)) throw new TypeError();
		}
		else throw new TypeError();

		Object.seal(this);
	}

	Record.prototype = {
		sum: function() {
			let sum = {};
			Account.prototype.TYPES.forEach(function(type) {
				sum[type] = 0;
				let accounts = this.prototype.filter(type);
				accounts.forEach(function(account) {
					sum[type] += account.balance;
				})
			});
			return sum;
		},
		filter: function(type) {
			let accounts;
			if (objects.Accounts.prototype.TYPES.indexOf(type) !== -1) {
				accounts = this.accounts.filter(function(e) {
					return e.type = type;
				});
			}
			else {
				accounts = {};
				objects.Accounts.prototype.TYPES.forEach(function(type) {
					accounts[type] = this.accounts.filter(function(e) {
						return e.type = type;
					});
				});
			}
			return accounts;
		}
	}

})();
