import React, { Component } from 'react';
import api, { apiURL } from './../api';
import FloatingActionButton from './FloatingActionButton'
import './../CreateRecipe.css'

class CreateRecipe extends Component {
  constructor() {
    super();
    this.state = {
      image: null,
      imagePreview: null,
      nameInput: '',
      timeInput: '',
      servesInput: '',
      ingredientsInput: '',
      instructionsInput: ''
    }
  }

  componentWillMount() {
    let id = this.props.match.params.id;

    api().get('recipes/' + id)
      .then(response => {
        var ingredientsInput = ''
        for (var i in response.data.ingredients) {
          // not last instruction
          if (parseInt(i) + 1 !== response.data.ingredients.length) {
            ingredientsInput += response.data.ingredients[i].amount + ': ' + response.data.ingredients[i].ingredient + '\n'
          } else {
            ingredientsInput += response.data.ingredients[i].amount + ': ' + response.data.ingredients[i].ingredient
          }
        }

        var instructionsInput = ''
        for (var i in response.data.instructions) {
          // not last instruction
          if (parseInt(i) + 1 !== response.data.instructions.length) {
            instructionsInput += response.data.instructions[i] + '\n\n'
          } else {
            instructionsInput += response.data.instructions[i]
          }
        }

        this.setState({
          nameInput: response.data.name,
          imagePreview: apiURL + response.data.image,
          timeInput: response.data.time,
          servesInput: response.data.serves,
          ingredientsInput,
          instructionsInput
        })
      })
      .catch(e => {
        console.error(e);
      })
  }

  onfileChange(e) {
    this.setState({ image: e.target.files[0] });

    // Show image preview
    var reader = new FileReader();
    reader.onload = (e) => {
      this.setState({imagePreview: e.target.result});
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  submit() {
    var formData = new FormData();
    formData.append('name', this.state.nameInput);
    formData.append('time', this.state.timeInput);
    formData.append('serves', this.state.servesInput);
    formData.append('ingredients', this.state.ingredientsInput);
    formData.append('instructions', this.state.instructionsInput);

    // If photo has been set
    if (this.state.image) {
      formData.append('image', this.state.image, this.state.image.name)
    }

    api().put('recipes/' + this.props.match.params.id, formData, { headers: { 'content-type': 'multipart/form-data' } })
      .then(response => {
        this.props.history.push('/' + String(response.data.id))
      })
      .catch(e => {
        console.log(e.response.data.error);
      })
  }

  render() {
    var placeholderInstructions = 'Die Süßkartoffel und die Möhren schälen und in 2 cm große Würfel schneiden. Den Ingwer schälen und fein würfeln oder raspeln, die Zwiebel und den Knoblauch abziehen und in feine Würfel schneiden.\n\nKokosöl in einer großen Pfanne erhitzen und Zwiebel, Knoblauch und Ingwer darin glasig werden lassen. Die Würfel von Süßkartoffel und Möhren hinzugeben und kurz anbraten. Erst das Currypulver und dann die Currypaste hinzugeben und beides ein wenig mitrösten.\n\nDie Brühe hinzugeben und alles einkochen lassen, sodass sich der Bodensatz von der Pfanne löst. Dann die Kokosmilch hineingeben und mit Salz, Pfeffer und etwas Sojasauce abschmecken.\n\nDas Curry etwa 15 bis 20 Minuten weiter köcheln lassen, bis die Möhren und die Süßkartoffeln gar sind. Währenddessen die Kichererbsen abgießen und abspülen und die Cashews in einer beschichteten Pfanne fettfrei anrösten. Die Kichererbsen und die Cashews erst zum Schluss der Garzeit unter das Curry rühren. Servieren und mit Koriander garnieren.'

    return (
      <div className="CreateRecipe">
        <h1>Create Recipe</h1>

        <p>Name</p>
        <input value={this.state.nameInput} onChange={(event) => this.setState({nameInput: event.target.value})} style={styles.input} type="text" placeholder="Name"/>

        <p>Image</p>
        {!this.state.imagePreview || <div v-if="imagePreview" style={{backgroundImage: 'url(' + this.state.imagePreview + ')'}} className="image-preview"></div>}
        <div className="image-upload">
          <p>
            <span></span>
            <span>
              {this.state.image ? this.state.image.name : <span>Drag your image here to begin<br/> or click to browse</span>}
            </span>
          </p>
          <input type="file" ref={input => {this.fileInput = input;}} onChange={this.onfileChange.bind(this)} accept="image/*"/>
        </div>

        <p>Time (in minutes)</p>
        <input
          value={this.state.timeInput}
          onChange={(event) => this.setState({timeInput: event.target.value})}
          style={styles.input}
          type="number"
          min="0"
          placeholder="Time (in minutes)"/>

        <p>Serves</p>
        <input
          value={this.state.servesInput}
          onChange={(event) => this.setState({servesInput: event.target.value})}
          style={styles.input}
          type="number"
          min="0"
          placeholder="Serves"/>

        <p>Ingredients</p>
        <textarea
          value={this.state.ingredientsInput}
          onChange={(event) => this.setState({ingredientsInput: event.target.value})}
          style={styles.input}
          rows="10"
          placeholder="1 TL: Chiasamen&#10;100g: Sojadrink&#10;1 Msp: Zimt"></textarea>

        <p>Instructions</p>
        <textarea
          value={this.state.instructionsInput}
          onChange={(event) => this.setState({instructionsInput: event.target.value})}
          rows="20"
          style={styles.input}
          placeholder={placeholderInstructions}></textarea>

        <FloatingActionButton onClick={this.submit.bind(this)} type="save"/>
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
