const { React } = require('powercord/webpack'); // We have to import React
const { SwitchItem, Category } = require('powercord/components/settings'); // Here we Import the TextInput Component for later use

//This section is the Page the user sees
module.exports = class settings extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      catboySettings: false
    };
  }

  render() {
    return(
      <div class="catboys">
        
        <SwitchItem
          note='append "(i like catboys btw)" to the end of your messages'
          value={this.props.getSetting('ilikecatboys', false)}
          onChange={() => this.props.toggleSetting('ilikecatboys', true)}
        >
          let everyone know you like catboys owo
        </SwitchItem>
        <SwitchItem
          note='whether to send catboy images through chat or not :3'
          value={this.props.getSetting('throughchat', true)}
          onChange={() => this.props.toggleSetting('throughchat', true)}
        >
          send catboy images through chat when toggled on, or send it through a powercord message only you can see when toggled off u.u
        </SwitchItem>
        <Category
          name='owoify stuff >.<'
          description="i <3 catboys"
          opened={ this.state.catboySettings }
          onChange={() => this.setState({ catboySettings: !this.state.catboySettings })}
        >
        <SwitchItem
          note='owoify your messages'
          value={this.props.getSetting('owoify', false)}
          onChange={() => this.props.toggleSetting('owoify', true)}
        >
          owoify >:3
        </SwitchItem>
        <SwitchItem
          note='automatically add kaomoji/emoticons to the end of messages'
          value={this.props.getSetting('autoadd', false)}
          onChange={() => this.props.toggleSetting('autoadd', true)}
        >
          autoadd ^-^
        </SwitchItem>
        </Category>

      </div>
    )
  }
}