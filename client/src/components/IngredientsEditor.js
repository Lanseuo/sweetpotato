import React, { Component } from 'react';
import Radium from 'radium';
import uuid from 'js-uuid';
import styleUtils from './../styleUtils';

class IngredientsEditor extends Component {
    constructor(props) {
        // Add initial ids to ingredients
        props.ingredients.forEach(ingredient => {
            ingredient.id = uuid.v4()
        })
        props.onChange(props.ingredients);

        super(props);
    }

    addNewIngredient() {
        this.props.onChange([
            ...this.props.ingredients,
            {
                id: uuid.v4(),
                amount: '',
                ingredient: ''
            }
        ]);
    }

    deleteIngredient(id) {
        this.props.onChange(
            this.props.ingredients.filter(ingredient => ingredient.id != id)
        );
    }

    handleInputChange(id, type, event) {
        this.props.ingredients.forEach(ingredient => {
            if (ingredient.id == id) {
                ingredient[type] = event.target.value;
            }
        })
        this.props.onChange(this.props.ingredients);

    }

    render() {
        return (
            <div className="IngredientsEditor" style={styles.container}>
                {this.props.ingredients.map(ingredient => (
                    <div style={styles.oneIngredient}>
                        <input
                            type="text"
                            style={styles.input}
                            placeholder="amount"
                            value={ingredient.amount}
                            onChange={event => this.handleInputChange(ingredient.id, 'amount', event)} />
                        <input
                            type="text"
                            style={{ ...styles.input, ...styles.secondInput }}
                            placeholder="value"
                            value={ingredient.ingredient}
                            onChange={event => this.handleInputChange(ingredient.id, 'ingredient', event)} />
                        <svg style={styles.deleteButton} key={ingredient.id} onClick={() => this.deleteIngredient(ingredient.id)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            <path d="M0 0h24v24H0z" fill="none" />
                        </svg>

                    </div>
                ))}
                <button style={styles.addButton} onClick={this.addNewIngredient.bind(this)}>+</button>
            </div>
        )
    }
}

const styles = {
    input: {
        display: 'block',
        width: '100%',
        border: 'none',
        background: styleUtils.color.grayInput,
        padding: '15px',
        margin: '5px 0'
    },

    oneIngredient: {
        display: 'grid',
        gridTemplateColumns: '1fr 4fr',
        gridGap: 5,
        position: 'relative'
    },

    secondInput: {
        paddingRight: 50
    },

    addButton: {
        backgroundColor: styleUtils.color.grayInput,
        border: 0,
        padding: '3px 35px',
        fontSize: '2em',
        cursor: 'pointer'
    },

    deleteButton: {
        position: 'absolute',
        right: 15,
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        ':hover': {
            fill: 'red'
        }
    }
}

export default Radium(IngredientsEditor);