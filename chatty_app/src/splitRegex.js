function splitRegex(text, re){
  let execResult = re.exec(text);
  let currentText = text;
  const pieces = [];
  while(execResult){
    const foundThing = execResult[0];
    const index = execResult.index;
    const beforeIndex = currentText.substr(0, index);
    currentText = currentText.substr(index + foundThing.length);
    pieces.push({match:false, text: beforeIndex});
    pieces.push({match:true, text: foundThing});
    execResult = re.exec(currentText);
  }
  pieces.push({match: false, text: currentText});
  return pieces;
}

export default splitRegex;