import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import A1p1 from './phase/A1p1'
import A1p2 from './phase/A1p2'

const phase = [<A1p1 />, <A1p2 />]

function Start (props) {

  return (
    <View>
      <Button title="Start" onPress={props.begin} />
    </View>
  )
}

export default function SandpaperLetter () {
  const [idx, setIdx] = useState(0)
  const [status, setStatus] = useState(false)

  useEffect(() => {
  }, [])

  function begin () {
    setStatus(true)
    setTimeout(() => {
      setIdx(idx + 1)
    }, 13000)
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