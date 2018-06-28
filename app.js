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

    if(command === "kick") {
        message.delete().catch(O_o=>{});
        if(!message.member.hasPermission('KICK_MEMBERS'))
          return message.reply("você não tem permissão! :x:");
        
        const comousarkick = new Discord.RichEmbed()
          .setAuthor("ZeffBOT", client.user.avatarURL)
          .setTitle("k!kick")
          .setDescription(`Ira kickar o usuário mencionado.`)
          .setColor("#60d1f6")
          .setFooter("© ZeffBOT - CopyRight")
          .addField("Como usar", "`k!kick @usuário <motivo>`")
          .addField("Permissão", "O staff que for expulsar tem que esta em um cargo com a permissão `Expulsar membros`")
        
        let member = message.mentions.members.first();
        if(!member)
          return message.channel.send(comousarkick);
        if(!member.kickable) 
          return message.reply("eu não posso banir esse usuário! Ele(a) têm um cargo maior.");
        
        let motivo = args.slice(1).join(' ');
        if(!motivo) motivo = "Não informado";
        
        // Now, time for a swift kick in the nuts!
        await member.kick(`Por: ${message.author.tag} | Motivo: ` + motivo)
          .catch(error => message.reply(`Desculpa ${message.author} Eu não poderia banir por causa de: ${error}`));
        
       const kickmsg = new Discord.RichEmbed()
           .setAuthor('Você foi kikado!', member.user.avatarURL)
           .setColor("ff0000")
    
           .setThumbnail(member.user.avatarURL)
       
           .setTimestamp()
           .setFooter("© ZeffBOT Moderação", message.author.avatarURL)
    
            .addField("Motivo:", motivo)
    
            .addField("Servidor:", message.guild.name)  
      
       member.send(kickmsg)
        
       const kickado = new Discord.RichEmbed()
           .setAuthor(member.user.tag + ' | Kick', member.user.avatarURL)
           .setDescription(`${member.user.tag} (ID: ${member.user.id}) não respeitou as regras e foi kickado! :worried: `)
           .setColor("ff0000")
    
           .setThumbnail(member.user.avatarURL)
    
           .setTimestamp()
           .setFooter("© ZeffBOT Moderação", message.author.avatarURL)
    
            .addField("Motivo:", motivo)
    
            .addField("Staffer:", message.author)
            
        message.channel.send(kickado)
    }
}
if(command === "ban") {
    message.delete().catch(O_o=>{});
    if (message.member.hasPermission('MANAGE_MESSAGES')) {
    const comousar = new Discord.RichEmbed()
       .setAuthor("ZeffBOT", client.user.avatarURL)
       .setTitle("k!mute")
       .setDescription(`Ira mutar o usuário mencionado.`)
       .setColor("#60d1f6")
       .setFooter("© ZeffBOT - CopyRight")
       .addField("Como usar", "`k!mute @usuário <motivo>`")
       .addField("Permissão", "O staff que for mutar tem que esta em um cargo com a permissão `Gerenciar mensagens`")
 
    let member = message.mentions.members.first();
    if(!member)
       return message.channel.send(comousar);
 
    let motivo = args.slice(1).join(' ');
    if(!motivo)
       return message.reply("Por favor, indique um motivo para o mute!");
 
    if (!message.guild.roles.find("name", "Mutado") || message.guild.roles.find("name", "mutado")) {
       
       const norole = new Discord.RichEmbed()
          .setColor("ff0000")
          .setAuthor('Deu um erro', client.user.avatarURL)
          
          .setDescription(`${message.author}, o cargo **Mutado** não foi encontrado. :slight_frown: 
 Crie um cargo com o nome "**Mutado**", assim poderei mutar o usuário!`)
       
       
          .setTimestamp()
          .setFooter("© ZeffBOT ERRO", message.author.avatarURL)
       
       message.channel.send(norole)
       
       
      } else {
         let role = message.guild.roles.find("name", "Mutado");
         member.addRole(role)
         
         const mutemsg = new Discord.RichEmbed()
           .setAuthor('Você foi mutado!', member.user.avatarURL)
           .setColor("ff0000")
 
           .setThumbnail(member.user.avatarURL)
 
           .setTimestamp()
           .setFooter("© ZeffBOT Moderação", message.author.avatarURL)
 
           .addField("Motivo:", motivo)
 
           .addField("Servidor:", message.guild.name)  
   
        member.send(mutemsg)
         
         const mutado = new Discord.RichEmbed()
            .setAuthor(member.user.tag + ' | Mute', member.user.avatarURL)
            .setDescription(`${member.user.tag} (ID: ${member.user.id}) não respeitou as regras e foi mutado! :pensive: `)
            .setColor("ff0000")
 
            .setThumbnail(message.author.avatarURL)
 
            .setTimestamp()
            .setFooter("© ZeffBOT Moderação", message.author.avatarURL)
 
            .addField("Motivo:", motivo)
 
            .addField("Staffer:", message.author)
         
         message.channel.send(mutado)
      }
   
    } else {
       message.reply("você não tem permissão! :x:")
    }
}
});
