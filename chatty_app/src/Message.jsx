import React, {Component} from 'react';
import splitRegex from './splitRegex';

export default class Message extends Component {

  render() {
    let color = this.props.color;
    let messageContent = this.props.content;
    let findImgUrl = /(https?)\S+(png|jpg|gif|jpeg)/i;

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