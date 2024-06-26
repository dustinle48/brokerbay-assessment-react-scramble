import { Button, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

/* eslint-disable */
export default function GuessComponent({data,counter,nextSentence}) {
    const [sentence,setSentence] = useState([])
    const [answerArr,setAnswerArr] = useState([])
    const [result,setResult] = useState(false)

    const inputProps = {
        style: { textAlign: 'center' },
        maxLength: 1
    }

    const handleSentence = () => {
        try {
            let arr = data.split(" ")
            setSentence([...arr])
        } catch(e) {
            console.error(e)
        }
    }

    const handleAnswerArr = () => {
        try {
            let answer = data.toLowerCase().split("")
            setAnswerArr([...answer])
        } catch(e) {
            console.error(e)
        }
    }

    const checkGuessing = (event) => {
        let inputFields = document.getElementsByTagName("input")
        let inputFieldsArr = Array.from(inputFields)

        let inputId = event.target.id
        let inputField = inputFields.namedItem(inputId)
        let index = inputFieldsArr.indexOf(inputField)

        if (event.target.value.toLowerCase() === answerArr[index]) {
            inputField.classList.add("right-input")
            if (inputFields[index+1]) inputFields[index+1].focus()
        } else {
            inputField.classList.remove("right-input")
        }

        if (inputFieldsArr.every(input => input.classList.contains("right-input"))) {
            setResult(true)     
        } else {
            setResult(false)
        }
    }

    const clearInputs = () => {
        let inputFields = document.getElementsByTagName("input")
        let inputFieldsArr = Array.from(inputFields)
        inputFieldsArr.forEach(input => {
            input.value = ""
            input.classList.remove("right-input")
        })
    }

    const focusFirstInput = () => {
        let inputFields = document.getElementsByTagName("input")
        if (inputFields[0]) inputFields[0].focus()
    }

    const inputBoxes = (row,index) => {
        let content = []
        let arr = Array.from(row)

        let boxWidth = 12/(row.length+1)
        if (index === sentence.length-1) boxWidth = 12/row.length

        for (let i = 0; i < arr.length; i++) {
            content.push(
                <Grid item xs={boxWidth}>
                    <TextField onChange={event => checkGuessing(event)} inputProps={inputProps} variant='outlined' fullWidth />
                </Grid>
            )
        }
        if (index !== sentence.length-1) {
            content.push(
                <Grid item xs={boxWidth}>
                    <TextField onChange={event => checkGuessing(event)} inputProps={inputProps} variant='outlined' fullWidth className='space-input' />
                </Grid>
            )
        }
        return content
    }

    const inputRows = sentence.map((row,index) =>
        <>
        <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{marginBottom:'1rem'}}>
            {inputBoxes(row,index)}
        </Grid>
        </>
    )

    useEffect(() => {
        handleSentence()
        handleAnswerArr() 
        setResult(false)
        clearInputs()
        focusFirstInput()
    },[data])

    return (
        <>
        <Typography variant='h5' sx={{margin: '2rem 0'}}>
            Guess the sentence! Starting typing
        </Typography>
        <Typography variant='h5' sx={{margin: '2rem 0'}}>
            The yellow blocks are meant for spaces
        </Typography>
        <Typography variant='h4' sx={{marginBottom: '2rem'}}>
            Score: {counter - 1}
        </Typography>
        <div>{inputRows}</div>
        { result &&
        <Button id="next-button" autoFocus size={'large'} onClick={nextSentence} variant='contained' sx={{background:'#388e3c'}}>Next</Button>
        }
        </>
    )
}
