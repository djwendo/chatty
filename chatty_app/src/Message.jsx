import React, {Component} from 'react';

export default class Message extends Component {

  render() {
    let color = this.props.color;
    let messageContent = this.props.content;
    let findImgUrl = /(https?)\S+(png|jpg|gif|jpeg)/i;

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

    const piecesOfText = splitRegex(messageContent, findImgUrl);
    const renderedPieces = piecesOfText.map((piece, i) => {
      if(piece.match){
        return <span key={'piece_' + i}><img className="image" src={piece.text}/><br/></span>;
      }
      return <span key={'piece_' + i}>{piece.text}<br/></span>;
    });

    return (
      <div className="message">
        <span className="message-username" style={{color: color}}>{this.props.username}</span>
        <span className="message-content">{renderedPieces}</span>
      </div>
    );
  }
}