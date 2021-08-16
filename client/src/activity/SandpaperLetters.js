import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import A1p1 from './phase/A1p1'
import A1p2 from './phase/A1p2'
import A1p3 from './phase/A1p3'

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

function Start (props) {

  return (
    <View>
      <Button title="Start" onPress={props.begin} />
    </View>
  )
}

export default function SandpaperLetter () {
  const [idx, setIdx] = useState(0)
  const [alphabetList, setAlphabetList] = useState([])
  const [status, setStatus] = useState(false)
  const [mount, setMount] = useState(false)
  const [interval, setInterval] = useState(null)

  const phase = [<A1p1 alphabet={alphabetList} />, <A1p2 />, <A1p3 />]

  useEffect(() => {
    const newArr = []
    while (newArr.length < 6) {
      const random = Math.floor(Math.random() * 26)
      const same = newArr.includes(alphabet[random])
      if (!same) {
        newArr.push(alphabet[random])
      }
    }
    setAlphabetList(newArr)
    setMount(true)
  }, [idx])

  useEffect(() => {
    if (mount) {
      // console.log('start')
      // let count = 0
      // if (!status) {
      //   clearInterval(interval)
      // }
      // const interval = setInterval(() => {
      //   count = count + 1
      //   console.log('interval', count)
      //   if (count === 3) {
      //     setStatus(false)
      //   }
      // }, 13000)
    }
  }, [status])

  function begin () {
    setStatus(true)
  }

  return (
    <View style={styles.container}>
      { status ? phase[idx] : <Start begin={begin} /> }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})