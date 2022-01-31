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
    
    function chooseKaomoji() { // math is stolen from Ross-Powercord 0^0
      var uwu = appendList[Math.floor(Math.random()*appendList.length)];
      return uwu
    }

    function logsmth(toLog) {
      console.log("[catboys] " + toLog + " uwu ")
    }

    function replacer(string) {
      let newStwing = string.toLowerCase();
      newStwing = newStwing.replaceAll("the", "teh");
      newStwing = newStwing.replaceAll("hey", "hai");
      newStwing = newStwing.replaceAll("that", "dat");
      newStwing = newStwing.replaceAll("this", "dis");
      newStwing = newStwing.replaceAll("haha", "hehe");
      newStwing = newStwing.replaceAll("lol", "x3"); // could be doing this a better way but anyway x3
      newStwing = newStwing.replaceAll("lmao", "x3");
      newStwing = newStwing.replaceAll("mr", "mistuh");
      newStwing = newStwing.replaceAll("dick", "peepee");
      newStwing = newStwing.replaceAll("stop", "stawp");
      newStwing = newStwing.replaceAll("fuck", "fwick");
      newStwing = newStwing.replaceAll("shit", "crap");
      newStwing = newStwing.replaceAll("le", "wal");
      newStwing = newStwing.replaceAll("l", "w");
      newStwing = newStwing.replaceAll("r", "w");
      
      logsmth("owoified message")
      return newString;
    }

    powercord.api.settings.registerSettings(this.entityID, { // settings UvU
      category: this.entityID,
      label: 'Catboys >///<',
      render: Settings
    })

    powercord.api.commands.registerCommand({ // catboy command >-< (thank you sm for the help Kellen#6670, legume#0173 and Samm-Cheese#9500)
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