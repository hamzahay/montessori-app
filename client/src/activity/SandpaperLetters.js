import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import A1p1 from './phase/A1p1'
import A1p2 from './phase/A1p2'
import A1p3 from './phase/A1p3'

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

function Start (props) {

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <Button title="Start" onPress={props.begin} />
    </View>
  )
}

export default function SandpaperLetter () {
  const [idx, setIdx] = useState(0)
  const [alphabetList, setAlphabetList] = useState(['a', 'b', 'c'])
  const [status, setStatus] = useState(false)
  const [mount, setMount] = useState(false)
  const [interval, setInterval] = useState(null)
  const [currentPhase, setCurrentPhase] = useState(0)

  useEffect(() => {
    const newArr = []
    while (newArr.length < 3) {
      const random = Math.floor(Math.random() * 26)
      const same = newArr.includes(alphabet[random])
      if (!same) {
        newArr.push(alphabet[random])
      }
    }
    setAlphabetList(newArr)
    setMount(true)
  }, [])

  function begin () {
    // setStatus(true)
    setCurrentPhase(1)
  }

  function goToNextPhase () {
    setTimeout(() => {
      setCurrentPhase(currentPhase + 1)
    }, 500)
  }

  return (
    <View style={styles.container}>
      { currentPhase === 0 ? <Start begin={begin} /> : <View></View> }
      { mount && currentPhase === 1 ? <A1p1 alphabetList={alphabetList} goToNextPhase={goToNextPhase} /> : <View></View> }
      { mount && currentPhase === 2 ? <A1p2 alphabetList={alphabetList} goToNextPhase={goToNextPhase} /> : <View></View> }
      { mount && currentPhase === 3 ? <A1p3 alphabetList={alphabetList} goToNextPhase={goToNextPhase} /> : <View></View> }
      { mount && currentPhase === 4 ? <Text>Finished</Text> : <View></View> }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})