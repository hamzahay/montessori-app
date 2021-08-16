import React, { useRef, useEffect } from 'react'
import { Animated ,View, Text, StyleSheet, Button, useWindowDimensions, Easing } from 'react-native'

export default function A1p2 (props) {
  const dimensions = useWindowDimensions()
  const alphabetList = ['A', 'B', 'C']

  const item1 = useRef(new Animated.Value(0 - dimensions.height)).current
  const item2 = useRef(new Animated.Value(0 - dimensions.height)).current
  const item3 = useRef(new Animated.Value(0 - dimensions.height)).current

  useEffect(() => {
    Animated.stagger(200, [
      Animated.timing(item1, {
        toValue: 0,
        delay: 200,
        duration: 1000,
        easing: Easing.bounce,
        useNativeDriver: true
      }),
      Animated.timing(item2, {
        toValue: 0,
        delay: 200,
        duration: 1000,
        easing: Easing.bounce,
        useNativeDriver: true
      }),

      Animated.timing(item3, {
        toValue: 0,
        delay: 200,
        duration: 1000,
        easing: Easing.bounce,
        useNativeDriver: true
      }),
    ]).start()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Animated.View
          style={{
            margin: 15,
            width: 100,
            height: 100,
            backgroundColor: 'orange',
            transform: [{ translateY: item1 }],
            opacity: item1.interpolate({
              inputRange: [0 - dimensions.height, dimensions.height * 0.15],
              outputRange: [0, 1]
            }),
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center'
          }}
        >
          <Text style={styles.textStyle}>A</Text>
        </Animated.View>
        <Animated.View
          style={{
            margin: 15,
            width: 100,
            height: 100,
            backgroundColor: 'orange',
            transform: [{ translateY: item2 }],
            opacity: item2.interpolate({
              inputRange: [0 - dimensions.height, dimensions.height * 0.15],
              outputRange: [0, 1]
            }),
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center'
          }}
        >
          <Text style={styles.textStyle}>B</Text>
        </Animated.View>
        <Animated.View
          style={{
            margin: 15,
            width: 100,
            height: 100,
            backgroundColor: 'orange',
            transform: [{ translateY: item3 }],
            opacity: item3.interpolate({
              inputRange: [0 - dimensions.height, dimensions.height * 0.15],
              outputRange: [0, 1]
            }),
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center'
          }}
        >
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
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center'
  },
  textStyle: {
    fontSize: 100,
    alignSelf: 'center',
  }
})