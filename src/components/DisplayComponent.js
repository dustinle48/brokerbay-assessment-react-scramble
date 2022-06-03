import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

export default function DisplayComponent({data}) {
  const [scrambledWords,setScrambledWords] = useState("")

  const scrambleData = () => {
    try {
      let arr = data.split(" ")
      arr.forEach((word,index) => {
        if (word.length > 3) {
          arr[index] = scrambleWord(word)
        }
      })
      setScrambledWords(arr.join(" "))
    } catch(e) {
      console.error(e)
    }
  }

  const scrambleWord = (word) => {
    let arr = Array.from(word)
    let slicedArr = arr.slice(1,arr.length-1)

    for (let i = 1; i < word.length - 1; i++) {
      let num = Math.floor(Math.random() * (slicedArr.length))
      arr[i] = slicedArr[num]
      slicedArr.splice(num,1)
    }
    return arr.join('')
  }

  useEffect(() => {
    scrambleData() // eslint-disable-next-line
  },[data])

  return (
    <>
    <Typography id='scrambled-word' variant='h3' color={'#3E6B9B'}>
      {scrambledWords}
    </Typography>
    </>
  )
}
