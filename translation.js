translate()
let interval = 10
function translate(){
    if(getCookie("LA") == "PT"){
        //settings
        try {
            document.getElementById("theme").innerHTML="Mudar o tema";
            document.getElementById("cmds").innerHTML="Mensagem personalizada";
            document.getElementById("resetbutton").innerHTML="Reiniciar";
            document.getElementById("wstts").innerHTML="o segundo que o tempo começa";
            document.getElementById("wstte").innerHTML="que segundo o tempo termina";
            document.getElementById("fv").innerHTML="taxa de quadros do vídeo";
            document.getElementById("ft").innerHTML="tempo final";
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

        try {
            document.getElementById("ctml").innerHTML="Tempo Atual(Milisegundos): ";
            document.getElementById("cf").innerHTML="Quadro Atual: ";
            document.getElementById("sfb").innerHTML="Para a frente ou para trás: ";
            document.getElementById("fra").innerHTML="taxa de quadros";
            document.getElementById("st").innerHTML="Tempo de início: ";
            document.getElementById("et").innerHTML="Tempo do Fim: ";
            document.getElementById("ttt").innerHTML="Tempo Total: ";
            document.getElementById("set-start").value = "Definir o tempo atual como início";
            document.getElementById("go-to-start").value = "Ir para o tempo de início";
            document.getElementById("modMessageButton").innerHTML = "Copiar mensagem para a área de transferência";
            document.getElementById("set-end").value = "Definir o tempo atual como o fim";
            document.getElementById("go-to-end").value = "Ir para o tempo final";
        } catch (error) {}
        
        
    }else if(getCookie("LA") == "UK"){
        //settings
        try{  
            document.getElementById("theme").innerHTML="Change Theme";
            document.getElementById("cmds").innerHTML="Custom Mod Message";
            document.getElementById("resetbutton").innerHTML="Reset";
            document.getElementById("wstts").innerHTML="what second the timer starts";
            document.getElementById("wstte").innerHTML="what second the timer ends";
            document.getElementById("fv").innerHTML="framerate of the video";
            document.getElementById("ft").innerHTML="final time";
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

        try {
            document.getElementById("ctml").innerHTML="Current Time (in milliseconds): ";
            document.getElementById("cf").innerHTML="Current Frame: ";
            document.getElementById("sfb").innerHTML="Step forward or backward: ";
            document.getElementById("fra").innerHTML="framerate";
            document.getElementById("st").innerHTML="Start Time: ";
            document.getElementById("et").innerHTML="End Time: ";
            document.getElementById("ttt").innerHTML="Total Time: ";
            document.getElementById("set-start").value = "Set current time as start";
            document.getElementById("go-to-start").value = "Go to start time";
            document.getElementById("modMessageButton").innerHTML = "Copy Mod Message to Clipboard";
            document.getElementById("set-end").value = "Set current time as end";
            document.getElementById("go-to-end").value = "Go to end time";
           
        } catch (error) {}
        
    }else if(getCookie("LA") == "IT"){
        //settings
        try{  
            document.getElementById("theme").innerHTML="Cambia Tema";
            document.getElementById("cmds").innerHTML="Messaggio Personalizzato";
            document.getElementById("resetbutton").innerHTML="Ricomincia";
            document.getElementById("wstts").innerHTML="in quali secondi inizia il timer"; 
            document.getElementById("wstte").innerHTML="in che secondo finisce il timer";
            document.getElementById("fv").innerHTML="frame rate del video";
            document.getElementById("ft").innerHTML="ultima volta";
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

        try {
            document.getElementById("ctml").innerHTML="Ora corrente (in millisecondi): ";
            document.getElementById("cf").innerHTML="Cornice attuale: ";
            document.getElementById("sfb").innerHTML="Fai un passo avanti o indietro: ";
            document.getElementById("fra").innerHTML="frequenza dei fotogrammi";
            document.getElementById("st").innerHTML="Volta di inizio: ";
            document.getElementById("et").innerHTML="Il tempo di completamento: ";
            document.getElementById("ttt").innerHTML="Tempo Totale: ";
            document.getElementById("set-start").value = "Imposta l'ora corrente come inizio";
            document.getElementById("go-to-start").value = "Vai all'ora di inizio";
            document.getElementById("modMessageButton").innerHTML = "Copia il messaggio negli Appunti";
            document.getElementById("set-end").value = "Imposta l'ora corrente come fine";
            document.getElementById("go-to-end").value = "Vai al tempo della fine";
            
        } catch (error) {}

    }else if(getCookie("LA") == "FR"){
        //settings
        try{  
            document.getElementById("theme").innerHTML="Change le Thème";
            document.getElementById("cmds").innerHTML="Message Personnalisé";
            document.getElementById("resetbutton").innerHTML="Réinitialiser";
            document.getElementById("wstts").innerHTML="à quelles secondes le chronomètre démarre"; 
            document.getElementById("wstte").innerHTML="à quelle seconde le chronomètre se termine";
            document.getElementById("fv").innerHTML="framerate de la vidéo";
            document.getElementById("ft").innerHTML="la dernière fois";
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

        try {
            document.getElementById("ctml").innerHTML="Heure actuelle (en millisecondes): ";
            document.getElementById("cf").innerHTML="Cadre actuel: ";
            document.getElementById("sfb").innerHTML="Avancer ou reculer: ";
            document.getElementById("fra").innerHTML="fréquence d'images";
            document.getElementById("st").innerHTML="Temps de début: ";
            document.getElementById("et").innerHTML="l'temps de réalisation: ";
            document.getElementById("ttt").innerHTML="Temps Total: ";
            document.getElementById("set-start").value = "Définir l'heure actuelle comme début";
            document.getElementById("go-to-start").value = "Aller à l'heure de début";
            document.getElementById("modMessageButton").innerHTML = "Copier le message dans le presse-papiers";
            document.getElementById("set-end").value = "Définir l'heure actuelle comme fin";
            document.getElementById("go-to-end").value = "Aller à l'heure de fin";
            
        } catch (error) {}
        
    }else if(getCookie("LA") == "SP"){
        //settings
        try{  
            document.getElementById("theme").innerHTML="Cambiar de tema";
            document.getElementById("cmds").innerHTML="Mensaje personalizado";
            document.getElementById("resetbutton").innerHTML="Reiniciar";
            document.getElementById("wstts").innerHTML="qué segundos comienza el temporizador"; 
            document.getElementById("wstte").innerHTML="en que segundo termina el cronómetro";    
            document.getElementById("fv").innerHTML="velocidad de fotogramas del video";
            document.getElementById("ft").innerHTML="tiempo final";
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

        try {
            document.getElementById("ctml").innerHTML="Hora actual (en milisegundos): ";
            document.getElementById("cf").innerHTML="Fotograma actual: ";
            document.getElementById("sfb").innerHTML="Paso adelante o atrás: ";
            document.getElementById("fra").innerHTML="cuadros por segundo";
            document.getElementById("st").innerHTML="Tiempo de inicio: ";
            document.getElementById("et").innerHTML="Tiempo de finalización: ";
            document.getElementById("ttt").innerHTML="Tiempo Total: ";
            document.getElementById("set-start").value = "Establecer la hora actual como inicio";
            document.getElementById("go-to-start").value = "Ir a la tiempo de inicio";
            document.getElementById("modMessageButton").innerHTML = "Copiar mensaje al portapapeles";
            document.getElementById("set-end").value = "Establecer la hora actual como final";
            document.getElementById("go-to-end").value = "Ir a la hora de finalización";
                
            
        } catch (error) {}
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