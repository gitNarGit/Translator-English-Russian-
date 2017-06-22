import React, {Component} from 'react';
import './style.css';

export default class Translate extends Component{

  constructor(){
    super();
    this.state = {
      tableWords: []
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
        this.setState({tableWords: [...this.state.tableWords,
          {
            goToTranslate: toTranslate,
            translateWord: response[0].meanings[0].translation
          }
        ]})
      })
    }
  }

  render(){

   let getData = this.state.tableWords.map((item, index) => {
    return (<tr key = {index}>
              <td>{item.goToTranslate}</td>
              <td>{item.translateWord}</td>
            </tr>)
   })

    return(
      <div>
        <input ref = "inp" className = "inpWriter" placeholder = "Write your english word..."/>
        <button onClick = {this.wordsCome} className = "clickBtn">Translate</button>
        <table>
          <thead>
            <tr>
              <td>English</td>
              <td>Russian</td>
            </tr>
          </thead>
          <tbody>
            {getData}
          </tbody>
        </table>
        <div>{this.state.translateWord}</div>
      </div>
    )
  }
}