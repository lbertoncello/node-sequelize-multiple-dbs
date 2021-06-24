class StringUtils {

	static replaceSpecialCharacters (str) {
		return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').
			toLowerCase();
	}

	static replaceAccents (str) {
		return str.replace(/[&/\\#!,+()$~%.'":*?<>{}]/g, '_');
	}

	static normalizeString (str) {
		return this.replaceSpecialCharacters(this.replaceAccents(str)).
			toLowerCase();
	}

}

module.exports = StringUtils;
