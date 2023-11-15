/* eslint-disable no-multi-assign */
function translatePage(isFirstCall) {
	const lang = localStorage.getItem('LA');

	// dont try to translate the page to English when its first loaded since its already in English
	if ((isFirstCall && lang === 'EN') || !lang) return;

	function applyTranslation(json) {
		document.documentElement.lang = lang.toLowerCase();
		const translation = json[lang];
		// to prevent reptition in the json file
		translation['pause-start'] = translation['pause-end'] = translation.start = translation.end;
		// dont crash if an invalid language is provided (by devtools for example)
		if (!translation) return;
		const transKeys = Object.keys(translation);
		for (let i = 0; i < transKeys.length; i++) {
			const el = document.getElementById(transKeys[i]);
			if (el) el.innerText = translation[transKeys[i]];
		}
	}

	// check cache for translations
	if (window.translations) {
		applyTranslation(window.translations);
		return;
	}

	const translationData = new Promise((resolve) => {
		const oReq = new XMLHttpRequest();
		oReq.overrideMimeType('application/json');
		oReq.onload = function onload() {
			const json = JSON.parse(this.responseText);
			// cache to not request the json file each time you switch between languages;
			window.translations = json;
			resolve(json);
		};
		oReq.open('get', 'translationdata.json', false);
		oReq.send();
	});
	translationData.then(applyTranslation);
}
translatePage(true);
