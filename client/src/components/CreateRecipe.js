import React, { Component } from 'react';
import FloatingActionButton from './FloatingActionButton'
import './../CreateRecipe.css'

class CreateRecipe extends Component {
  constructor() {
    super();
    this.state = {
      image: null,
      imagePreview: null
    }
  }

  onfileChange(e) {
    // e.preventDefault();
    console.log(e.target.files[0]);
    this.setState({ image: e.target.files[0] });

    // Show image preview
    var reader = new FileReader();
    reader.onload = (e) => {
      this.setState({imagePreview: e.target.result});
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  render() {
    var placeholderInstructions = 'Die Süßkartoffel und die Möhren schälen und in 2 cm große Würfel schneiden. Den Ingwer schälen und fein würfeln oder raspeln, die Zwiebel und den Knoblauch abziehen und in feine Würfel schneiden.\n\nKokosöl in einer großen Pfanne erhitzen und Zwiebel, Knoblauch und Ingwer darin glasig werden lassen. Die Würfel von Süßkartoffel und Möhren hinzugeben und kurz anbraten. Erst das Currypulver und dann die Currypaste hinzugeben und beides ein wenig mitrösten.\n\nDie Brühe hinzugeben und alles einkochen lassen, sodass sich der Bodensatz von der Pfanne löst. Dann die Kokosmilch hineingeben und mit Salz, Pfeffer und etwas Sojasauce abschmecken.\n\nDas Curry etwa 15 bis 20 Minuten weiter köcheln lassen, bis die Möhren und die Süßkartoffeln gar sind. Währenddessen die Kichererbsen abgießen und abspülen und die Cashews in einer beschichteten Pfanne fettfrei anrösten. Die Kichererbsen und die Cashews erst zum Schluss der Garzeit unter das Curry rühren. Servieren und mit Koriander garnieren.'

    return (
      <div className="CreateRecipe">
        <h1>Create Recipe</h1>

        <p>Name</p>
        <input style={styles.input} type="text" placeholder="Name"/>

        <p>Image</p>
        {!this.state.image || <div v-if="imagePreview" style={{backgroundImage: 'url(' + this.state.imagePreview + ')'}} className="image-preview"></div>}
        <div className="image-upload">
          <p>
            <span></span>
            <span>
              {this.state.image ? this.state.image.name : <span>Drag your image here to begin<br/> or click to browse</span>}
            </span>
          </p>
          <input type="file" ref={input => {this.fileInput = input;}} onChange={this.onfileChange.bind(this)} accept="image/*"/>
        </div>

        <p>Ingredients</p>
        <textarea style={styles.input} rows="10" placeholder="1 TL: Chiasamen&#10;100g: Sojadrink&#10;1 Msp: Zimt"></textarea>

        <p>Instructions</p>
        <textarea rows="20" style={styles.input} placeholder={placeholderInstructions}></textarea>

        <FloatingActionButton type="save"/>
      </div>
    )
  }
}

const styles = {
  input: {
    display: 'block',
    width: '100%',
    border: 'none',
    background: 'rgb(223, 224, 221)',
    padding: '15px',
    margin: '20px 0'
  }
}

export default CreateRecipe;
