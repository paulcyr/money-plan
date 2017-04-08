window.app = (() => {
	
	let app = {};

	app.run = function(initialAccts, initialTrxns) {
		require('./objects');
		require('./data/settings');
		require('./calc');
		let dob = new this.objects.AppDate(this.data.settings.get('dob'));

		initialAccts = initialAccts || [];
		let bank = new this.objects.Account('bank.savings', {type: 'asset', caption: 'Bank (Savings)'});
		initialAccts.push(bank);

		let records = [];
		let today = new this.objects.AppDate(new Date());
		let current = new this.objects.AppDate(new Date());
		let ttretire = this.objects.AppDate.prototype.increment(this.objects.AppDate.prototype.increment(dob, 65*12), -today);
		let mtretire = Number.parseInt(ttretire/100, 10) * 12 + ttretire % 100;
		let ttexpiry = this.objects.AppDate.prototype.increment(this.objects.AppDate.prototype.increment(dob, 95*12), -today);
		let mtexpiry = Number.parseInt(ttexpiry/100, 10) * 12 + ttexpiry % 100;
		
		records.push(new this.objects.Record(current, initialAccts));

		for (let i=0; i < mtexpiry; i++) {
			current = current.increment();
			records.push(new this.objects.Record(current, records[i]));
		}

		this.records = records;
	}

	return app;
})();

(() => {

	let acctsNames = []
	window.app.run();
})();