import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';



class App extends React.Component{
  constructor(props){ // 
    super(props)   //volá se props, aby to nebylo v constructoru nedefinované což by dělalo problém
    this.state={        //objekt s nějakými vlastnostmi, které pak mohu volat
        dude:"Marceline the Vampire"
    }
  }
  render(){ //funkce render vykresluje HTML na web page, jejím smyslem je zobrazovat HTML code uvnitř specifického HTML elementu.
    return <div className='App-header'>
      <p>
        My good friend <strong className="dude" >{this.state.dude}</strong> is ill.
        <br/> I like <strong className='dude'>{this.state.dude} </strong> smile.
      </p>
    </div>
  }
}
//strict mode je nástroj sloužící ke kontrole potenciálních problémů v aplikaci do kterého se celá App obalí.
ReactDOM.render(
  <React.StrictMode> 
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
// ReactDOM render() posílám vyrendrovat dokument podle jeho id, je to div v HTML souboru s id=root
