const discord = require("discord.js");
const client = new discord.Client();
const jimp = require("jimp");

let prefix = "!titi"
let citation = ["44 calories !", "Comprenons nous bien...", "C\'est la poêle qui se moque du chaudron !", "Et les arboriculteurs ?", "Permanganate de potassium !", "Complètement azymutés...", "Range ton Gameboy !", "Et les pompiers ?", "Je vous ai parlé de l\'usine de recyclage ?", "T'es en Mat Sup toi !  (Hé ! Hé !)", "Je recapèpète !", "Bac a sable ?", "Playmobil ?", "A partir de 4 mètres ça commence à être dangereux.", "A cet âge là c\'est joueur !", "Erreur classique !", "Etourderie ! Etourderie !", "Attention ! Sinon j\'enlève 1/8 de point !", "Je vous ai parlé de la centrale de Chinon ?", "Je vais finir par vous appeler chamallow !", "Tu prends une poutre...", "Et les électrons célibataires ?", "Je me sens bafoué, humilié et méprisé.", "Ils font le jeu de la droite.", "Ça c'est un point de TP en moins !", "Il comprend vite mais faut lui expliquer longtemps...", "On ne bouge pas la burette !", "La machine à laver ça suce bien !", "C\'est visqueux et sucré.", "Un bon gros glaçon !", "Racine de 2 !", "Le dilemme c\'est le prix.", "Enfin ! Le Fluor c\'est vachement aggressif !", "C\'est comme une salade de fruit.", "En chimie, il y a toujours plusieurs chemins.", "C\'est comme le vin !", "Ca c'est de la chimie allemande."]   //tableau contenant les citations

client.on('ready', () =>{''
    console.log("Titi est lancé !");
})  

client.on('message', (message) =>{

    let args = message.content.split(" ");  //récupération des arguments du message
    let m = Number(args[1]);

    if(message.content.startsWith(prefix)){
        if(args.length < 2){
            let random = getRandomInt(citation.length);
            message.channel.sendMessage(citation[random]);  //envoi de la citation
        }else if(args[1] == "add"){
            if(args.length>2){
                let newCitation = message.content.substring(10);
                citation.push(newCitation);
                message.channel.sendMessage("Titi a bien pris en compte votre citation : " + newCitation);
                console.log(citation);
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
        }else if(m != NaN){
            message.channel.sendMessage(citation[m-1])
        }
        else if(args[1]=='img'){    //setup image de pradier_bulle
            let random = getRandomInt(citation.length);
            jimp.read("pradier_bulle.png").then((image) => {
                let file = "file." + image.extension
                jimp.loadFont(jimp.FONT_SANS_32_BLACK).then((font) => {
                    image.print(font,175,160,citation[random]);
                    image.write(file);
                })
                client.sendFile(message.channel,file);
            }).catch((err) => {
                console.log(err);
            })

        }
            

    }

})

function getRandomInt(max) {        //fonction du random
    return Math.floor(Math.random() * Math.floor(max));
}

client.login(process.env.TOKEN);
