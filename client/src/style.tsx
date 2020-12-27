import styled from 'styled-components'

export const FormElement = styled.div`
    & label {
        display: block;
        margin-bottom: 10px;
    }

    & input {
        display: block;
        width: 100%;
        border: 0;
        padding: 10px;
    }

    margin-bottom: 20px;
`

export const Button = styled.button`
    background: var(--primary-color);
    color: white;
    border: 0;
    display: block;
    width: 100%;
    padding: 15px;
    cursor: pointer;

    &:hover {
        background: var(--primary-color-dark);
    }
`