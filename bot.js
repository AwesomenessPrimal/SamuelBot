const Discord = require('discord.js');
const client = new Discord.Client();
const configJSON = require("./config.json");
const serverJSON = require("./servers.json")
const prefix = configJSON.prefix
const mainServer = configJSON.mainServer
const botOwner = configJSON.botOwner

client.on('ready', () => {
  console.log('I am ready!');
  client.user.setUsername(configJSON.botUsername)
  client.user.setGame(configJSON.prefix + configJSON.botGame)
	
	homeGuild = client.guilds.get(mainServer)
	ownerObject = homeGuild.members.get(botOwner)
	ownerObject.send("Bot online.")
});

client.on('message', message => {
    if (message.author.bot === false) {
        if (message.content.startsWith(prefix + 'ping')) {
            var embed1 = new Discord.RichEmbed()
            .setAuthor("Ping!")
            .setDescription("Pong!")
            .setFooter("Pinged by: " + message.author.username, "https://my.mixtape.moe/hxhpei.png")
            .setColor("#85d828")
            message.channel.sendEmbed(embed1)
        }
    }
});

client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find('name', 'welcome');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  var embed1 = new Discord.RichEmbed()
  .setAuthor("Member Joined", member.guild.iconURL)
  .setDescription("<@" + member.id + "> has joined" + member.guild.name + "! Hai! How are ya?")
  .setThumbnail(member.user.avatarURL)
  channel.sendEmbed(embed1)
})

client.on('guildMemberRemove', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find('name', 'welcome');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  var embed1 = new Discord.RichEmbed()
  .setAuthor("Member Left", member.guild.iconURL)
  .setDescription("<@" + member.id + "> has left" + member.guild.name + "... Gee gee.")
  .setThumbnail(member.user.avatarURL)
  channel.sendEmbed(embed1)
})

client.on('guildCreate', guild => {
  ownerObject.send("I have been added to " + guild.name + ". The server ID is " + guild.id + ". Update the JSON file.")
})

client.on('message', message => {
    if (message.author.bot === false) {
        if (message.content.startsWith(prefix + 'help')) {
            var embed1 = new Discord.RichEmbed()
            .setTitle("Lemme slide into your DM's. 😉")
            .setFooter("Help requested by " + message.author.username, message.author.avatarURL)
            .setColor("#85d828")
            message.channel.sendEmbed(embed1)
            var embed2 = new Discord.RichEmbed()
            .setTitle("Samuelbot's prefix is: "+prefix)
            .setAuthor("Samuelbot's Commands", "https://lh3.googleusercontent.com/xnP11e6sneUSgbGIyOMsaCavvIO9GVU06ZmRmFDZLeRzBzf7fZuM6oLC99XXmNg7ncQ=w300")
            .addField('help', "Shows a list of commands")
            .addField('ping', "Pong")
            .addField('avatar', "Gets the avatar of a tagged user. Defaults to the sender's avatar if no users are tagged. Usage: `"+prefix+"avatar <mention user>`")
            .addField('userinfo', "Lists the basic user info. Usage: `" + prefix + "userinfo <@userinfo>`")
            .addField('hug', 'Gives somebody a hug. Use `me` to get one from the bot. Usage: `'+prefix+'hug <hug target>` or `'+prefix+'hug me`')
            .addField('tacklehug', 'Gives somebody a tackle hug. Use `me` to get one from the bot. Usage: `'+prefix+'hug <hug target>` or `'+prefix+'hug me`')
						.addField('errormsg', 'Generates an error message. Usage: `'+prefix+'errormsg <title>|<message>`')
						.addField('temmize', 'Translates a message to Temmie speak. Usage: `'+prefix+'temmize <message>`')
            .setThumbnail("https://vignette1.wikia.nocookie.net/joke-battles/images/c/cb/Clippy.png")
            .setColor("#85d828")
            message.author.sendEmbed(embed2)
        }
    }
});

client.on('message', message => {
    try {
        if (message.author.bot === false) {
            if (message.content.startsWith(prefix + 'avatar')) {
                var finduser = message.content
                var usertarget = finduser.replace(prefix + 'avatar', "")
                console.log(usertarget)
                if (usertarget === prefix+'avatar') {
                    var avatarget = message.author
                    var embed1 = new Discord.RichEmbed()
                    .setTitle(avatarget.username + "'s Avatar")
                    .setImage(avatarget.avatarURL)
                    .setURL(avatarget.avatarURL)
                    .setColor("#46475B")
                    message.channel.sendEmbed(embed1)
                } else {
                    var avatarget = message.mentions.users.first()
                    var embed1 = new Discord.RichEmbed()
                    .setTitle(avatarget.username + "'s Avatar")
                    .setImage(avatarget.avatarURL)
                    .setURL(avatarget.avatarURL)
                    .setColor("#46475B")
                    message.channel.sendEmbed(embed1)
                }
            }
        }
    }

    catch(error) {
        message.channel.sendMessage("You have used this command incorrectly. Please do `" + prefix + "help` to see how to use commands.")
    }
});

client.on('message', message => {
    try {
        if (message.author.bot === false) {
            if (message.content.startsWith(prefix + 'userinfo')) {
                var finduser = message.content
                var usertarget = finduser.replace(prefix + 'userinfo', "")
                console.log(usertarget)
                if (usertarget === '') {
                    var userinfo = message.author
                    var embed1 = new Discord.RichEmbed()
                    .setTitle(userinfo.username + "'s Advanced User Info")
                    .setThumbnail(userinfo.avatarURL)
                    .addField("Client ID", userinfo.id)
                    .addField("Username", userinfo.username)
                    .addField("Tag", userinfo.tag)
                    .addField("Bot User", userinfo.bot)
                    .addField("Joined Discord On", userinfo.createdAt)
                    .addField("Status", userinfo.presence.status)
                    message.channel.sendEmbed(embed1)
                } else {
                    var userinfo = message.mentions.users.first()
                    var embed1 = new Discord.RichEmbed()
                    .setTitle(userinfo.username + "'s Advanced User Info")
                    .setThumbnail(userinfo.avatarURL)
                    .addField("Client ID", userinfo.id)
                    .addField("Username", userinfo.username)
                    .addField("Tag", userinfo.tag)
                    .addField("Bot User", userinfo.bot)
                    .addField("Joined Discord On", userinfo.createdAt)
                    .addField("Status", userinfo.presence.status)
                    message.channel.sendEmbed(embed1)
                }
            }
        }
    }
    catch(error) {
        message.channel.sendMessage("Please specify a valid user. Please do `" + prefix + "help` to see how to use commands.")
    } 
});

/*client.on('message', message => {
    try {
        if (message.author.bot === false) {
            if (message.content.startsWith(prefix + 'quote')) { //Handle Multiple Discord Tags
                var input = message.content
                var midput = input.replace(prefix + 'quote "', "")
                var output = midput.split('"')
                var author = output[1]
                if (message.content.includes("@")) {
                    var speaker = message.mentions.users.first()
                    console.log(speaker);
                    var embed3 = new Discord.RichEmbed()
                    .setAuthor(speaker.username, speaker.avatarURL)
                    .setDescription(output[0])
                    message.channel.sendEmbed(embed3)
                } else if (author === "") {
                    var embed3 = new Discord.RichEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL)
                    .setDescription(output[0])
                    message.channel.sendEmbed(embed3)
                } else {
                    var embed3 = new Discord.RichEmbed()
                    .setFooter("Quote By: "+author)
                    .setDescription(output[0])
                    message.channel.sendEmbed(embed3)
                }
            }
        }
    }
    catch(error) {
        message.channel.sendMessage("You have used this command incorrectly. Please do `" + prefix + "help` to see how to use commands.")
    }
});
*/

client.on('message', message => {
    try {
        if (message.author.bot === false) {
            if (message.content.startsWith(prefix + 'errormsg')) {
                var commandmsg = message.content
                var parse1 = commandmsg.replace(prefix + 'errormsg ', "")
                var parse2 = parse1.split(' ').join('+');
                var parse3 = parse2.split("|")
                console.log(parse2)
                var msgTitle = parse3[0]
                var msgText = parse3[1]
                var embed1 = new Discord.RichEmbed()
                .setImage("http://atom.smasher.org/error/xp.png.php?icon=Error3&style=xp&title="+ msgTitle + "&url=&text=" + msgText + "&b1=&b2=Ok&b3=")
                message.channel.sendEmbed(embed1)
                }
            }
    }

    catch(error) {
        console.log(error)
        message.channel.sendMessage("You have used this command incorrectly. Please do `" + prefix + "help` to see how to use commands.")
    }
});

client.on('message', message => {
    try {
        if (message.author.bot === false) {
            if (message.content.startsWith(prefix + 'hug')) { //Handle Multiple Discord Tags
                var input = message.content
                var output = input.replace(prefix + 'hug ', "")
                if (output.includes("@")) {
                    var hugger = message.author
                    var hugged = message.mentions.users.first()
                    console.log(hugged.avatarURL);
                    var embed3 = new Discord.RichEmbed()
                    .setAuthor("Hug from "+ hugger.username, hugger.avatarURL)
                    .setDescription("<@" + hugger.id + "> hugged <@" + hugged.id + ">.")
                    .setThumbnail(hugged.avatarURL)
                    message.channel.sendEmbed(embed3)
                } else if (output === "me") {
                    var hugged = message.author
                    console.log(hugged.avatarURL)
                    var embed3 = new Discord.RichEmbed()
                    .setAuthor("Hug from "+ client.user.username, client.user.avatarURL)
                    .setDescription("<@"+ client.user.id + "> hugged <@" + hugged.id + ">.")
                    .setThumbnail(hugged.avatarURL)
                    message.channel.sendEmbed(embed3)
                } else {
                    var hugger = message.author
                    var embed3 = new Discord.RichEmbed()
                    .setAuthor("Hug from "+ hugger.username, hugger.avatarURL)
                    .setDescription("<@" + hugger.id + "> hugged " + output)
                    message.channel.sendEmbed(embed3)
                }
            }
        }
    }
    catch(error) {
        console.log(error)
        message.channel.sendMessage("You have used this command incorrectly. Please do `" + prefix + "help` to see how to use commands.")
    }
});

client.on('message', message => {
    try {
        if (message.author.bot === false) {
            if (message.content.startsWith(prefix + 'tacklehug')) { //Handle Multiple Discord Tags
                var input = message.content
                var output = input.replace(prefix + 'tacklehug ', "")
                if (output.includes("@")) {
                    var hugger = message.author
                    var hugged = message.mentions.users.first()
                    console.log(hugged.avatarURL);
                    var embed3 = new Discord.RichEmbed()
                    .setAuthor("Tackle hug from "+ hugger.username, hugger.avatarURL)
                    .setDescription("<@" + hugger.id + "> tackle hugged <@" + hugged.id + ">.")
                    .setThumbnail(hugged.avatarURL)
                    message.channel.sendEmbed(embed3)
                } else if (output === "me") {
                    var hugged = message.author
                    console.log(hugged.avatarURL)
                    var embed3 = new Discord.RichEmbed()
                    .setAuthor("Tackle hug from "+ client.user.username, client.user.avatarURL)
                    .setDescription("<@"+ client.user.id + "> tackle hugged <@" + hugged.id + ">.")
                    .setThumbnail(hugged.avatarURL)
                    message.channel.sendEmbed(embed3)
                } else {
                    var hugger = message.author
                    var embed3 = new Discord.RichEmbed()
                    .setAuthor("Tackle hug from "+ hugger.username, hugger.avatarURL)
                    .setDescription("<@" + hugger.id + "> tackle hugged " + output)
                    message.channel.sendEmbed(embed3)
                }
            }
        }
    }
    catch(error) {
        console.log(error)
        message.channel.sendMessage("You have used this command incorrectly. Please do `" + prefix + "help` to see how to use commands.")
    }
});

client.on('message', message => {
    try {
        if (message.author.bot === false) {
            if (message.content.startsWith(prefix + 'temmize ')) {
                var targetmsg = message.content
                var victim = targetmsg.replace(prefix + 'temmize ', "")
                const temmize = require('./temmize.js'); //This was not made by me. The original author of this is dragonfire535, the creator of XiaoBot
                const thingToTranslate = victim;
		            const temmized = temmize(thingToTranslate);
								var embed3 = new Discord.RichEmbed()
								.setThumbnail("https://i.pinimg.com/originals/4c/90/34/4c9034c1e962ff088ae9fa9b32676a8f.png")
								.setDescription(temmized)
								.setFooter("Temmize script originally made by dragonfire535 for XiaoBot.", "https://cdn.discordapp.com/app-icons/278305350804045834/2de7c7277827c374eb7d314135ae301c.jpg")
								message.channel.sendEmbed(embed3)
                }
            }
        }

    catch(error) {
        message.channel.sendMessage("You have used this command incorrectly. Please do `" + prefix + "help` to see how to use commands.")
        console.log(error)
    }
});

client.login(configJSON.token);