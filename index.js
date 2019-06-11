// Resource: Lumi Bot
// Developed by Blue
// Version: 3.4

const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();

bot.commands = new Discord.Collection();
bot.settings = require("./settings.json");

fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);
  
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0) return console.log(`${bot.settings.botname} reeeeeee`);
  
    jsfile.forEach((f, i) =>{
      let props = require(`./commands/${f}`);
      console.log(`[${bot.settings.botname}] > Command Loaded > ${f}`);
      bot.commands.set(props.help.name, props);
    });
  
  });

bot.addons = new Discord.Collection();  

fs.readdir("./sb-addons/", (err, files) => {
    if(err) console.log(err);
  
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0) return console.log(`${bot.settings.botname} No addons detected nor default! Either download addons from https://itzemerald.tk/`);
  
    jsfile.forEach((f, i) =>{
      let props = require(`./sb-addons/${f}`);
      console.log(`[${bot.settings.botname}] > Addons Loaded > ${f}`);
      bot.addons.set(props.help.name, props);
    });
  
  });

bot.on("ready", async () => {
  bot.user.setActivity(bot.settings.BotStatus, {type:"PLAYING"});
    console.log(`\x1b[36m`, `=== [Lumi Bot] ===\n\nLumi Bot - Created by Godly Gamer's\nInvite ${bot.user.username} to your server\nhttps://discordapp.com/api/oauth2/authorize?client_id=${bot.user.username}&permissions=8&scope=bot\n\n=== [Lumi Bot] ===`)
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  if (message.content.indexOf(bot.settings.prefix) !== 0) return;

  let messageArray = message.content.split(" ");
  const args = message.content.slice(bot.settings.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  const cmd = bot.commands.get(command);
  if(!cmd) return;
  cmd.run(bot, message, args);
});

bot.on("message", async message => {
if(message.author.bot) return;
if(message.channel.type === "dm") return;
if (message.content.indexOf(bot.settings.prefix) !== 0) return;

let messageArray = message.content.split(" ");
const args = message.content.slice(bot.settings.prefix.length).trim().split(/ +/g);
const addon = args.shift().toLowerCase();

const cmd = bot.addons.get(addon);
if(!cmd) return;
cmd.run(bot, message, args);
});

// [SupportBot] Welcome Message

bot.on("guildMemberAdd", (member) => {
  let channel = member.guild.channels.find(channel => channel.name === `${bot.settings.Welcome_Channel}`)

  const WelcomeMsg= new Discord.RichEmbed()
  .setColor(bot.settings.colour)
  .setThumbnail(member.user.avatarURL)
  .setDescription(`:wave: ${member.user.username}\n${bot.settings.Welcome_Message}`)

  channel.send(WelcomeMsg);
});

// [SupportBot] Leave Message

bot.on("guildMemberRemove", (member) => {
  let channel = member.guild.channels.find(channel => channel.name === `${bot.settings.Leave_Channel}`)

  const LeaveMsg= new Discord.RichEmbed()
  .setColor(bot.settings.colour)
  .setThumbnail(member.user.avatarURL)
  .setDescription(`:wave: ${member.user.username}\n${bot.settings.Leave_Message}`)

  channel.send(LeaveMsg);

});

bot.login(bot.settings.token);