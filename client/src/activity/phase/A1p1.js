import React, { useEffect, useState, useRef, } from 'react'
import { Animated, View, Button, Text, StyleSheet, useWindowDimensions, Easing } from 'react-native'

// phase for when teacher introduce the letter one by one
// match the duration of the animation with the audio

export default function A1p1 (props) {
  const dimensions = useWindowDimensions()
  const alphabetList = props.alphabetList
  const [index, setIndex] = useState(0)
  const [loop, setLoop] = useState(false)
  const [mount, setMount] = useState(false)

  const bounce = useRef(new Animated.Value(0 - dimensions.height)).current

  useEffect( () => {
    animation()
    setMount(true)
  }, [])

  useEffect(() => {
    if (mount) {
      animation()
    }
  }, [index])

  function animation () {
    Animated.sequence([
      Animated.timing(bounce, {
        toValue: 0,
        delay: 200,
        duration: 1000,
        easing: Easing.bounce,
        useNativeDriver: true
      }),
      Animated.timing(bounce, {
        toValue: 0 - dimensions.height,
        delay: 2000,
        duration: 1000,
        easing: Easing.bounce,
        useNativeDriver: true
      }),
    ]).start(() => {
      restartAnimation()
    })
  }

  function restartAnimation () {
    if (index < 2) {
      setIndex(index + 1)
    } else {
      props.goToNextPhase()
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.activityContainer}>
        <Animated.View style={{
          width: 300,
          height: 300,
          backgroundColor: 'orange',
          transform: [{ translateY: bounce }],
          opacity: bounce.interpolate({
            inputRange: [-250, 0],
            outputRange: [0, 1]
          }),
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
          <Text style={styles.textStyle}>{ alphabetList[index] }</Text>
        </Animated.View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: {
    fontSize: 300,
    alignSelf: 'center',
  }
})