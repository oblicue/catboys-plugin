const { Plugin } = require("powercord/entities");
const { inject, uninject } = require('powercord/injector');
const { getModule, React, messages } = require('powercord/webpack');
const Settings = require("./components/settings.jsx"); // settings uwu
const https = require('https')



module.exports = class Catboys extends Plugin {
  
  async genCatBoy() {
    https.get('https://api.catboys.com/img', (res) => {
      res.on('data', function (d) {
        let catboyurl = JSON.parse(d)["url"]
        return catboyurl.toString()
      })

      res.on('end', function (err) {
      if (err) return 'error generating catboy 0^0'; // error ;-;
      console.log('end')
      });
    })   
  }

  async startPlugin() {
    const appendList = Array("OvO", "^-^", "OwO", "UwU", "x3", ":3", ">:3", "ʕ •ᴥ•ʔ", "^ω^", "(＾ｕ＾)", "(￣ω￣)", "(*￣▽￣)", "(＾◡＾)", "(☆ω☆)")
    
    function chooseKaomoji() { // stolen from Ross-Powercord 0^0
      var uwu = appendList[Math.floor(Math.random()*appendList.length)];
      return uwu
    }

    function logsmth(toLog) {
      console.log("[catboys] " + toLog + " uwu ")
    }

    function replacer(string) {
      let newString = string.toLowerCase();
      newString = newString.replaceAll("the", "teh");
      newString = newString.replaceAll("hey", "hai");
      newString = newString.replaceAll("that", "dat");
      newString = newString.replaceAll("this", "dis");
      newString = newString.replaceAll("haha", "hehe");
      newString = newString.replaceAll("lol", "x3"); // could be doing this a better way but anyway x3
      newString = newString.replaceAll("lmao", "x3");
      newString = newString.replaceAll("mr", "mistuh");
      newString = newString.replaceAll("dick", "peepee");
      newString = newString.replaceAll("stop", "stawp");
      newString = newString.replaceAll("fuck", "fwick");
      newString = newString.replaceAll("shit", "crap");
      newString = newString.replaceAll("le", "wal");
      newString = newString.replaceAll("l", "w");
      newString = newString.replaceAll("r", "w");
      
      logsmth("owoified message")
      return newString;
    }

    powercord.api.settings.registerSettings(this.entityID, { // settings UvU
      category: this.entityID,
      label: 'Catboys >///<',
      render: Settings
    })

    powercord.api.commands.registerCommand({ // catboy command >-<
      command: 'catboy',
      description: 'catboys uwu',
      usage: '.catboy',
      executor: async (args) => {
        var s = await fetch('https://api.catboys.com/img')
        var res = await s.json();
        if (!s.ok) return;
        return {
          send: powercord.pluginManager.get('catboys').settings.get('throughchat'),
          result: "generated catboy " + res.url
        }
      }
    });

    inject('changemessages', messages, 'sendMessage', (args) => {
      if(powercord.pluginManager.get('catboys').settings.get('autoadd') == true) {
        let uwu = args[1].content.concat(" " + chooseKaomoji())
        args[1].content = uwu
      }
      return args;
    }, true);

    inject('appendcatboy', messages, 'sendMessage', (args) => {
      if(powercord.pluginManager.get('catboys').settings.get('ilikecatboys') == true) {
        args[1].content = args[1].content + " (i like catboys btw)"
      }
      return args
    }, true);

    inject('owoify', messages, 'sendMessage', (args) => {
      if(powercord.pluginManager.get('catboys').settings.get('owoify') == true) {
        args[1].content = replacer(args[1].content)
        return args; 
      }
      return args;
    }, true);

    powercord.api.commands.registerCommand({ // generate sayings u.u
      command: 'saying',
      description: 'generate catboy saying >.<',
      usage: '.saying',
      executor: async (args) => {
        var s = await fetch('https://api.catboys.com/catboy') // fetch from api >=<
        var res = await s.json();
        if (!s.ok) return;
        return {
          send: true,
          result: res.response
        }
      }
    });
  }

  pluginWillUnload() { // unregister TwT
    uninject("changemessages");
    uninject("owoify");
    uninject("appendcatboy")
    powercord.api.commands.unregisterCommand('catboy');
    powercord.api.commands.unregisterCommand('saying');
    powercord.api.settings.unregisterSettings(this.entityID);
  }
}