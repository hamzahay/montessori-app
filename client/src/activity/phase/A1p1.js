import React, { useEffect, useState, useRef, } from 'react'
import { Animated, View, Button, Text, StyleSheet, useWindowDimensions, Easing } from 'react-native'

export default function A1p1 ({ navigation }) {
  const dimensions = useWindowDimensions()
  const [toggleStart, setToggleStart] = useState(false)
  const bounce1 = useRef(new Animated.Value(0 - dimensions.height)).current
  const bounce2 = useRef(new Animated.Value(0 - dimensions.height)).current
  const bounce3 = useRef(new Animated.Value(0 - dimensions.height)).current

  useEffect(() => {
    animation()
  }, [])

  function animation () {
    Animated.sequence([
      Animated.timing(bounce1, {
        toValue: 0,
        delay: 200,
        duration: 1000,
        easing: Easing.bounce,
        useNativeDriver: true
      }),
      Animated.timing(bounce1, {
        toValue: 0 - dimensions.height,
        delay: 2000,
        duration: 1000,
        easing: Easing.bounce,
        useNativeDriver: true
      }),
      Animated.timing(bounce2, {
        toValue: 0,
        delay: 200,
        duration: 1000,
        easing: Easing.bounce,
        useNativeDriver: true
      }),
      Animated.timing(bounce2, {
        toValue: 0 - dimensions.height,
        delay: 2000,
        duration: 1000,
        easing: Easing.bounce,
        useNativeDriver: true
      }),
      Animated.timing(bounce3, {
        toValue: 0,
        delay: 200,
        duration: 1000,
        easing: Easing.bounce,
        useNativeDriver: true
      }),
      Animated.timing(bounce3, {
        toValue: 0 - dimensions.height,
        delay: 2000,
        duration: 1000,
        easing: Easing.bounce,
        useNativeDriver: true
      }),
    ]).start()
  }

  return (
    <View style={styles.container}>
      <View style={styles.activityContainer}>
        <Animated.View style={{
          position: 'absolute',
          left: dimensions.width / 2 - 125,
          width: 300,
          height: 300,
          backgroundColor: 'orange',
          transform: [{ translateY: bounce1 }],
          opacity: bounce1.interpolate({
            inputRange: [-250, 0],
            outputRange: [0, 1]
          }),
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
          <Text style={styles.textStyle}>A</Text>
        </Animated.View>
        <Animated.View style={{
          position: 'absolute',
          left: dimensions.width / 2 - 125,
          width: 300,
          height: 300,
          backgroundColor: 'orange',
          transform: [{ translateY: bounce2 }],
          opacity: bounce2.interpolate({
            inputRange: [-250, 0],
            outputRange: [0, 1]
          }),
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
          <Text style={styles.textStyle}>B</Text>
        </Animated.View>
        <Animated.View style={{
          position: 'absolute',
          left: dimensions.width / 2 - 125,
          width: 300,
          height: 300,
          backgroundColor: 'orange',
          transform: [{ translateY: bounce3 }],
          opacity: bounce3.interpolate({
            inputRange: [-250, 0],
            outputRange: [0, 1]
          }),
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
          <Text style={styles.textStyle}>C</Text>
        </Animated.View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
  },
  activityContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 300,
    alignSelf: 'center',
  }
})