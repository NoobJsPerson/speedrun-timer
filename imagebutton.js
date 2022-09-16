 
    let currentflag = getCookie("LA")
   
    //initial check
    reloadco();

    //check if something has changed, with external tool(inspect tool)
    function reloadco(){
        currentflag = getCookie("LA")

        if(currentflag == "PT"){
            console.log('%cLanguage=PT', 'color:red;font-weight:bold;')
            changeimage("PT")
        
        }else if(currentflag == "IT"){
            console.log('%cLanguage=IT', 'color:green;font-weight:bold;')
            changeimage("IT")
        }else if(currentflag == "FR"){
            console.log('%cLanguage=FR', 'color:blue;font-weight:bold;')
            changeimage("FR")
        }else if(currentflag == "SP"){
            console.log('%cLanguage=SP', 'color:moccasin;font-weight:bold;')
            document.cookie = "LA=SP; expires=Tues, 18 Dec 3068 12:00:00 UTC";
            changeimage("SP")
        }else{
            console.log('%cLanguage=UK', 'font-weight:bold;')
            document.cookie = "LA=UK; expires=Tues, 18 Dec 3068 12:00:00 UTC";
            changeimage("UK")
        }
    }
   
    //original src = https://stackoverflow.com/questions/10730362/get-cookie-by-name
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
   //button to change flag
    function changes(){
        if(currentflag == "UK"){
            changeimage("PT")
        }else if(currentflag == "PT"){
            changeimage("IT")
        }else if(currentflag == "IT"){
            changeimage("FR")
        }else if(currentflag == "FR"){
            changeimage("SP")
        }else if(currentflag == "SP"){
            changeimage("UK")
        }
    }
    //change flag
    function changeimage(fla){
        if(fla == "PT"){
            document.cookie = "LA=PT; expires=Tues, 18 Dec 3068 12:00:00 UTC"; 
            currentflag = getCookie("LA")
            document.getElementById("flag").src = "./flags/PT.png"
        }else if(fla == "UK"){
            document.cookie = "LA=UK; expires=Tues, 18 Dec 3068 12:00:00 UTC"; 
            currentflag = getCookie("LA")
            document.getElementById("flag").src = "./flags/UK.png"
        }else if(fla == "IT"){
            document.cookie = "LA=IT; expires=Tues, 18 Dec 3068 12:00:00 UTC"; 
            currentflag = getCookie("LA")
            document.getElementById("flag").src = "./flags/IT.png"
        }else if(fla == "FR"){
            document.cookie = "LA=FR; expires=Tues, 18 Dec 3068 12:00:00 UTC"; 
            currentflag = getCookie("LA")
            document.getElementById("flag").src = "./flags/FR.png"
        }else if(fla == "SP"){
            document.cookie = "LA=SP; expires=Tues, 18 Dec 3068 12:00:00 UTC"; 
            currentflag = getCookie("LA")
            document.getElementById("flag").src = "./flags/SP.jpg"
        }
    }
    //see if something changed with external tool. Every 500 milliseconds
    var myfunc = setInterval(function() {
        reloadco()
    }, 500)
    