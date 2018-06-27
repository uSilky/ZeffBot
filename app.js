const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("./config.json");

client.on("ready", () => {

  console.log(`BOT ON!`); 

});

client.login(config.token);

client.on("message", async message => {

    if(message.author.bot) return;
    
    if(message.content.indexOf(config.prefix) !== 0) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

if(command === "say") {
    if (message.member.hasPermission('MANAGE_GUILD')) {  
           
        let mensg = args.join(" ");
        if(!mensg)
           return message.channel.send("Digite a msg do aviso!")
           
        const anuncio = new Discord.RichEmbed()
           .setColor("0cff00")
           .setAuthor("Aviso")
           
           .setDescription(mensg)
           
           .setTimestamp()
           .setFooter(`Por: ${message.author.tag}`, message.author.avatarURL)
        
        message.channel.send("@everyone", anuncio)

}
}
if(command === "sugestao") {
    message.delete().catch(O_o=>{});
    
    const comousar = new Discord.RichEmbed()
       .setAuthor("Zeff", client.user.avatarURL)
       .setTitle("z!sugestao")
       .setDescription(`Irá dar uma sugestão para o BOT.`)
       .setColor("#60d1f6")
       .setFooter("Zeff - Copyright©")
       .addField("Como usar", "`z!sugestao <sugestao>`")
       .addField("INFO", "Esse comando só funciona nesse grupo!")

       
    let mensg = args.join(" "); 
    if(!mensg) return message.channel.send(message.author, comousar)

    const sugestao = new Discord.RichEmbed()
       .setAuthor("Sugestão:")
       .setDescription(mensg)
       .setThumbnail(message.author.avatarURL)
       .setColor("#60d1f6")
       .setFooter(`Sugestão por: ${message.author.tag} © Zeff - CopyRight`)

     message.channel.send(`${message.author} Sugestão enviada!`)
      

    const dono = message.guild.members.get("368111860735541248");
    dono.user.send(sugestao)


}
});