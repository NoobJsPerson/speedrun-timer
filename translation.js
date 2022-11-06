function translatePage(isFirstCall) {
	const lang = localStorage.getItem("LA");
	// dont try to translate the page to English when its first loaded since its already in English

	if (isFirstCall && lang == "EN" || !lang) return;

	const trainingData = new Promise((resolve) => {
		const oReq = new XMLHttpRequest();
		oReq.overrideMimeType("application/json");
		oReq.onload = function () {
			resolve(JSON.parse(this.responseText));
		}
		oReq.open("get", "translationdata.json", false);
		oReq.send();

	})
	trainingData.then(json => {
		const translation = json[lang];
		translation.start = translation.end; // to prevent reptition in the json file
		if (!translation) return; // dont crash if an invalid language is provided (by devtools for example)
		for (let i in translation) {
			console.log(i)
			const el = document.getElementById(i)
			if (el) el.innerText = translation[i];
		}
	})
}
translatePage(true);
