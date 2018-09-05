/* Hint sam napravio kao funkciju  koje se poziva klikumo dugmeta, 
trazi 2 ista znaka 'X' ili 'O' i govori na koje sljedece polje treba kliknuti (prvo je 0)...
Hint je u slucaju da je vama ili drugom igracu ostalo jos jedno polje do pobjede, tako
da je odbrana u zadnjem slucaju ili pobjeda u zadnjem slucaju */






import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
 
  
  class Board extends React.Component {
    renderSquare(i) {
      return <Square value={this.props.squares[i]} 
      onClick={() => this.props.onClick(i)}/>;
    }
   
     
  
    render() {
        
    
      return (
        <div>
         
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {

    constructor(props){
      super(props);
      this.state={
       history:[{squares: Array(9).fill(null)}],
       brojac:1,
       field:0
      }
    }
    
      handleClick(i) {
        const history=this.state.history;
        const current=history[history.length-1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
          }
        squares[i] = this.state.brojac % 2 ? 'X' : 'O';
        this.setState({
          history:history.concat([{squares: squares,}]),
        brojac:this.state.brojac+1});
      }
      jumpTo(move){
        const history=this.state.history;
        const current=history[move];
        const squares = current.squares.slice();
      
        this.setState({
          history:history.concat([{squares: squares}]),
        brojac:move});
        
      }
      hint(squares){
        this.setState({
          field:calculateHint(squares)
          });
        
      }
  
          
      
    render() {
       const history= this.state.history.slice(0, this.state.brojac + 1);
        const current=history[history.length-1];
        const winner=calculateWinner(current.squares);
        let status;
      let polje=this.state.field;
        if(winner ){
           status= 'Winner: '+winner;
        }
        else{
            status = 'Next player: ' + (this.props.brojac % 2 ? 'O' : 'X');  
        }
        const moves=history.map((step,move)=>{
          const destination= move ? 
          'Go to move '+move : 'Go to start';
          return (
          <li key={move}>
            <button onClick={()=>this.jumpTo(move)}>{destination}</button>
          </li> 
          );
        });
      return (
        <div className="game">
          <div className="game-board">  
          <button onClick={()=>this.hint(current.squares)}>Hint</button>
          <span>Odigrajte na polje {polje}</span>
            <Board squares={current.squares}
            onClick={(i)=>this.handleClick(i)}/>
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  function calculateHint(squares) {
    const lines = [
      [0, 1], [1,2],
      [3, 4], [4,5],
      [6, 7], [7,8],
      [0, 3], [3,6],
      [1, 4], [4,7],
      [2, 5], [5,8],
      [0, 4], [4,8],
      [2, 4], [4,6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b] = lines[i];
      if (squares[a] && squares[a] === squares[b] ) {
        if(b-a===1 ){

        if((i+1)%2!==0) { 
        if(squares[b+1]==null && (b+1)<9){
         
          return b+1;
        }
      }
        else if (squares[a-1]===null && (a-1)>=0){
          
        return a-1;
        }
       
      }
      if(b-a===3 ){

        if((i+1)%2!==0){
        if(squares[b+3]===null && ((b+3)<9)){
          return b+3;
        }
      }
        else if (squares[a-3]===null && (a-3)>=0){
        return a-3;
        }
      
      }
      if(b-a===2 ){
        if((i+1)%2!==0){
        if(squares[b+2]===null && ((b+2)<9)){
          return b+2;
        }
      }
        else if (squares[a-2]===null && (a-2)>=0){
        return a-2;
        }
      
      }
      if(b-a===4 ){
        if((i+1)%2!==0){
        if(squares[b+4]===null && ((b+4)<9)){
          return b+4;
        }
      }
        else if (squares[a-4]===null && (a-4)>=0){
        return a-4;
        }
      
      }
    }
    }
    return null;
  }
 