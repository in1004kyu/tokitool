Blockly.Blocks['text_inkyu'] = {
  init: function() {
    this.setColour(0);
    this.appendValueInput('VALUE')
        .setCheck('String')
        .appendField('length of');
    //this.setOutput(true, 'Number');
    this.setPreviousStatement(true, '1');
    this.setNextStatement(true, '1');
    this.setTooltip('Returns number of letters in the provided text.');
   // this.setHelpUrl('http://www.w3schools.com/jsref/jsref_length_string.asp');
    this.setHelpUrl('http://mtoki.com');
  }
};

Blockly.Blocks['text_inkyu2'] = {
  init: function() {
    this.setColour(0);
    this.appendValueInput('VALUE')
        .setCheck('String')
        .appendField('length of');
    //this.setOutput(true, 'Number');
    this.setPreviousStatement(true, '2');
    this.setNextStatement(true, '2');
    this.setTooltip('Returns number of letters in the provided text.');
   // this.setHelpUrl('http://www.w3schools.com/jsref/jsref_length_string.asp');
    this.setHelpUrl('http://mtoki.com');
  }
};

