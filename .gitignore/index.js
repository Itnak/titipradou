const discord = require("discord.js");
const client = new discord.Client();

let prefix = "!titi"
let citation = ["44 calories !", "Racine de 2 !"]   //tableau contenant les citations

client.on('ready', () =>{
    console.log("Titi est lancé !");
})  

client.on('message', (message) =>{

    let args = message.content.split(" ");  //récupération des arguments du message
    if(message.content.startsWith(prefix)){
        if(args.length < 2){
            let random = getRandomInt(citation.length);
            message.channel.sendMessage(citation[random]);  //envoi de la citation
        }else if(args[1] == "add"){
            if(args.length>2){
                let newCitation = message.content.substring(10);
                citation.push(newCitation);
                message.channel.sendMessage("Titi a bien pris en compte votre citation : " + newCitation);
                console.log(citation)
            }else{
                message.channel.sendMessage("Titi est totalement azimuté : vous n'avez pas mis de citation !");
            }
        }else if(args[1] == "list"){
            for(i=0 ; i<citation.length ; i++){
                let x = i+1;
                message.channel.sendMessage(x + " - " + citation[i]);
            }
        }else if(args[1] == "remove"){
            if(args[2] != null){
                let n = Number(args[2]);
                if(n != NaN){
                    message.channel.sendMessage("Une citation de Titi est tombée de son sac ! : " + citation[n-1]);
                    citation.splice(n-1 , 1);
                }
            }
        }

    }

})

function getRandomInt(max) {        //fonction du random
    return Math.floor(Math.random() * Math.floor(max));
}

client.login(process.env.TOKEN);
