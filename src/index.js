import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';



class App extends React.Component{ //umožnuje přidat React App na website bez vytváření App.js
  constructor(props){ // 
    super(props) //volá se props, aby to nebylo v constructoru nedefinované což by dělalo problém
    
    this.input = React.createRef() //v konstrukotru jsem si zadefinoval referenci na element input, tuto referenci připojím na input v render 
    
    
    
    this.state={        //objekt s nějakými vlastnostmi, které pak mohu volat
        newWho:"",
        newWat:"",
        characters: [] // používané pole s načítanými postavami, než jsem začal data načítat z API pomocí fetch, takže momentálně prázdné
    }
  }

  //pokud chceš spustit nějaký code po vzniku komponentu, musí do svého clas přidat novou komponentu 
  componentDidMount = () => { // metoda DidMount, je komponenta ve které se kod spustí v moomentě kdy se komponent připne na DOM (asi vyrendruje na stránku)
    // ten komponent je ten input ke kterému je to dole připnuté v render() jde o lifecycle metodu, exisutuje více druh (dohledat)
    fetch('http://myjson.dit.upm.es/api/bins/5zn3')
    .then(res => res.json())
    .then(json => this.setState({ characters: json }))

  }

  listOfDudes = () => {
    return this.state.characters.map(dude => ( //pro cykly je dobré v reactu používat map() nebo filter() metodu k procházení něčeho místo for cyklů apod.
        
        <li  key={dude.id} className="dude">
          <a className="ctrl" onClick={() => this.removeDude (dude)}>x</a>
          
          <article className={
            dude.cool < 10 ? "faded" : dude.cool > 50 ? "gold" : ""
          }>
            {dude.who}
            <span>{dude.wat}</span>

          </article>
          
            
          <input className='ctrl' type="number" value={dude.cool} onChange={this.handleCool(dude)}/>
          
        </li> //projde pole charakters a jejich vlastnost who: zapisuje do dude a to ukládá do seznamu 
                            // uloženého v constantě dudes 
      
    ))

  }

  

  handleWho = event => {  //arrow function protože, ty si nevytváří vlastní kontext pro this, takže se to this v této arrow funkci odkazuje přímo na komponent (target)
    this.setState({ //nastaví stav komponentu na to co je aktuálně v inputu
      newWho: event.target.value //zíkává hodnotu co je zrovna v cílovém elementu tady v inputu s class-prewiew
    }) 
        
  }

  handleCool = dude => event => {
    const cool = +event.target.value

    this.setState(state => {
      return {
        characters : state.characters.map(item =>
            item ===dude ? { ...dude, cool } : item 
          )
      }
    })


  }  //arrow function protože, ty si nevytváří vlastní kontext pro this, takže se to this v této arrow funkci odkazuje přímo na komponent (target)

  handleWat = event => {  //arrow function protože, ty si nevytváří vlastní kontext pro this, takže se to this v této arrow funkci odkazuje přímo na komponent (target)
    this.setState({ //nastaví stav komponentu na to co je aktuálně v inputu
      newWat: event.target.value //zíkává hodnotu co je zrovna v cílovém elementu tady v inputu s class-prewiew
    }) 
        
  }

  removeDude = dude => {

    this.setState(state => {
      return {
        characters: state.characters.filter(item => item !== dude)
        }
    })

  }

  handleSubmit = event => {  //arrow function protože, ty si nevytváří vlastní kontext pro this, takže se to this v této arrow funkci odkazuje přímo na komponent (target)
    if (event.key === "Enter" && this.state.newWho && this.state.newWat){ // říká, že spustím vše co je v If stisknutím enteru pokud mám něco napsané i v newWat in v newWho
      
      this.setState((state) => {  // u tohoto zápisu je díky funkci zaručena práce vždy s aktuálním stavem pole
      
        const newDude = { //po odeslání submitu (formuláře) se vytvoří v konstantě
          id: Math.max( ...state.characters.map(d => d.id))+1, // nové pole newDude ve kterém se do vlastnostní who a wat zapíše to co jsme ve formuláři odeslali
          who: this.state.newWho, // řádek s id vytáhne id ze všeho co je v state.characters, pomocí map v tom najde idčka. Funkce Math max najde nejvyšší hodnotu id k němu se přičte jednička a to celé se úloží do nového id po potvrzení formuláře
          wat: this.state.newWat,
          cool: 15
        }
        return {
          characters: [...state.characters, newDude]

       }})

      this.resetForm()
    }


          
  }

  resetForm = () => {
    this.setState({
      newWho: "",
      newWat: ""

    })

    this.input.current.focus()

  }


  render(){  //funkce render vykresluje HTML na web page, jejím smyslem je zobrazovat HTML code uvnitř specifického HTML elementu. 

    return ( 
    <div className='App-header'>

        <ul>{this.listOfDudes()}</ul>

        <form className='add-new' onKeyPress={this.handleSubmit}>
          <input
           autoFocus
           ref= {this.input} //připojení reference na DOM element, aby se po odeslání kurzor vracel do prvního políčka  
           value={this.state.newWho} type="text" onChange={this.handleWho} />
          <input value={this.state.newWat} type="text" onChange={this.handleWat} />
        </form>
        <p className='prewiew'>
          {this.state.newWho}
          <br />
            <small>
              {this.state.newWat}
            </small>
        </p>
    </div>
    )
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
