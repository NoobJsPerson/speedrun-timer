if (localStorage.getItem("css") == "css") {

    document.querySelectorAll('style,link[rel="stylesheet"]').forEach(item => item.remove())

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './og.css';
    document.getElementsByTagName('HEAD')[0].appendChild(link);

    console.log("attempt")

}