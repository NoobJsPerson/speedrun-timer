function translatePage(isFirstCall) {
	const lang = localStorage.getItem("LA");
	// dont try to translate the page to English when its first loaded since its already in English
	if(isFirstCall && lang == "EN" || !lang) return; 
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
		console.log("im in here")
		const translation = json[lang];
		if (!translation) return; // dont crash if a invalid language is provided (by devtools for example)
		for (i in translation) {
			const el = document.getElementById(i)
			if(el) el.innerHTML = translation[i];
		}
	})
}
translatePage(true)