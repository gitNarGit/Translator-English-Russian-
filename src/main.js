import React, {Component} from 'react';
import './style.css';

export default class Translate extends Component{

  constructor(){
    super();
    this.state = {
      translateWord: ""
    }
  }

  wordsCome = () => {

    let toTranslate = this.refs.inp.value;

     if(toTranslate.length > 0){
      fetch(`http://dictionary.skyeng.ru/api/v2/search-word-translation?text=${toTranslate}`)
      .then((response) => {
        if(response.ok === true){
          return response.json();
        }
      }).then((response) => {
      
        this.setState({translateWord: response[0].meanings[0].translation});
      })
    }
  }

  render(){
    return(
      <div>
        <input ref = "inp"/>
        <button onClick = {this.wordsCome}>Translate</button>
        <div>{this.state.translateWord}</div>
      </div>
    )
  }
}