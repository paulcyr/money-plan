export default class Strings extends React.Component {
	en_CA = {
		settings: {
			name: 'Name'
		}
	};

	get(fqn) {
		let fqnArray = fqn.split('.');
		let langSpace = this[App.lang];
		if (langSpace === undefined) {
			throw new Error('Language not found');
		}
		let walker = (obj, fqnArray) => {
			switch (typeof obj[fqnArray[0]]) {
				case 'undefined':
					throw new Error('String key not found');
				case 'string':
					return obj[fqnArray[0]];
				default:
					return walker(obj[fqnArray[0]], fqnArray.shift());
			}
		}

		return walker(langSpace, fqnArray.shift());
		
	}
}