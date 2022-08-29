translate()
let interval = 10
function translate(){
    if(getCookie("LA") == "PT"){
        //settings
        try {
            document.getElementById("theme").innerHTML="Mudar o tema";
            document.getElementById("cmds").innerHTML="Mensagem personalizada";
            document.getElementById("resetbutton").innerHTML="Reiniciar";
        } catch (error) {}
        //home
        try {
            document.getElementById("lfyt").innerHTML="Carregar do Youtube";
            document.getElementById("lft").innerHTML="Carregar da Twitch";
            document.getElementById("settingsbutton").innerHTML="Definições";
        } catch(error){}
        //new run and settings
        try {
            document.getElementById("sourcecodebutton").innerHTML="Codigo Fonte";
            document.getElementById("backtohome").value="Pagina principal";
        } catch (error) {}
        
        
    }else if(getCookie("LA") == "UK"){
        //settings
        try{  
            document.getElementById("theme").innerHTML="Change Theme";
            document.getElementById("cmds").innerHTML="Custom Mod Message";
            document.getElementById("resetbutton").innerHTML="Reset";
        }catch(error){}
        //home
        try{
            document.getElementById("lfyt").innerHTML="Load from YouTube";
            document.getElementById("lft").innerHTML="Load from Twitch";
            document.getElementById("settingsbutton").innerHTML="Settings";
        }catch(error){}
        //new run and settings
        try{
            document.getElementById("sourcecodebutton").innerHTML="Source Code";
            document.getElementById("backtohome").value="Back to Home";

        }catch(error){}
        
    }else if(getCookie("LA") == "IT"){
        //settings
        try{  
            document.getElementById("theme").innerHTML="Cambia Tema";
            document.getElementById("cmds").innerHTML="Messaggio Personalizzato";
            document.getElementById("resetbutton").innerHTML="Ricomincia";
        }catch(error){}
        //home
        try{
            document.getElementById("lfyt").innerHTML="Carica da Youtube";
            document.getElementById("lft").innerHTML="Carica da Twitch";
            document.getElementById("settingsbutton").innerHTML="Definizioni";
        }catch(error){}
        //new run and settings
        try{
            document.getElementById("sourcecodebutton").innerHTML="Codice Sorgente";
            document.getElementById("backtohome").value="Pagina Iniziale";

        }catch(error){}
    }else if(getCookie("LA") == "FR"){
        //settings
        try{  
            document.getElementById("theme").innerHTML="Change le Thème";
            document.getElementById("cmds").innerHTML="Message Personnalisé";
            document.getElementById("resetbutton").innerHTML="Réinitialiser";
        }catch(error){}
        //home
        try{
            document.getElementById("lfyt").innerHTML="Charger depuis Youtube";
            document.getElementById("lft").innerHTML="Charger depuis Twitch";
            document.getElementById("settingsbutton").innerHTML="Réglages";
        }catch(error){}
        //new run and settings
        try{
            document.getElementById("sourcecodebutton").innerHTML="Code source";
            document.getElementById("backtohome").value="Page d'accueil";

        }catch(error){}
    }else if(getCookie("LA") == "SP"){
        //settings
        try{  
            document.getElementById("theme").innerHTML="Cambiar de tema";
            document.getElementById("cmds").innerHTML="Mensaje personalizado";
            document.getElementById("resetbutton").innerHTML="Reiniciar";
        }catch(error){}
        //home
        try{
            document.getElementById("lfyt").innerHTML="Cargar desde Youtube";
            document.getElementById("lft").innerHTML="Cargar desde Twitch";
            document.getElementById("settingsbutton").innerHTML="Ajustes";
        }catch(error){}
        //new run and settings
        try{
            document.getElementById("sourcecodebutton").innerHTML="Código fuente";
            document.getElementById("backtohome").value="Inicio";

        }catch(error){}
    }
    
    
}
//original src = https://stackoverflow.com/questions/10730362/get-cookie-by-name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

var myfunc = setInterval(function() {
    translate()
}, interval)