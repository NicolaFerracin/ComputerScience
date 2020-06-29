const Utils = {
  identifierRegExp: /[A-Za-z_]\w*/g,
  opRegExp: /\+|-|\*|\\|\/|&|\||<|>|=/g,
  typeRegExp: /int|char|boolean|[A-Za-z_]\w*/g,
  termRegExp: /\d+|".+"|[A-Za-z_]\w*|\(|-|~/g,
  statementsRegExp: /let|if|while|do|return/g,
  subroutineDecRegExp: /constructor|function|method/g,
  isJackFileFilter: file => file.endsWith('.jack'),
  entitiesMapping: {
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '&': '&amp;'
  }
};

module.exports = Utils;
