import React, { useState, useEffect, useRef, useReducer } from 'react'
import { useSelector } from 'react-redux'
import { Animated, View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import GestureDetector, {
  GestureRecorder,
  GesturePath,
  Cursor
} from 'react-native-gesture-detector'

let aGesture = {
  dummy: [],
  dummy2: [],
  dummy3: [],
  dummy4: []
}

export default function A1p3 (props) {
  const dimensions = useWindowDimensions()
  const alphabetList = props.alphabetList
  const allGestures = useSelector(state => state.activity.activity1)
  const [alphabetIndex, setAlphabetIndex] = useState(0)
  const [currentGesture, setCurrentGesture] = useState({})
  const [gestureTracker, setGestureTracker] = useState({})
  const [gestureSum, setGestureSum] = useState(0)
  // const [newGesture, setNewGesture] = useState([])
  const [mount, setMount] = useState(false)

  const animation = useRef(new Animated.Value(0 - dimensions.height)).current

  useEffect(() => {
  }, [gestureTracker])

  useEffect(() => {
    getGesture()
    setTimeout(() => {
      comeIn()
    }, 300)
  }, [alphabetIndex])

  function getGesture () {
    const newGesture = allGestures.filter(gesture => gesture.letter === alphabetList[alphabetIndex])
    aGesture = newGesture[0].gesture
    getGestureDetail()
  }

  function getGestureDetail () {
    delete aGesture.dummy
    delete aGesture.dummy2
    delete aGesture.dummy3
    delete aGesture.dummy4
    let length = 0
    let tracker = {}
    for (key in aGesture) {
      tracker[key] = false 
      length++
    }
    if (length < 2) {
      aGesture['dummy'] = []
      aGesture['dummy2'] = []
      aGesture['dummy3'] = []
    } else if (length < 3) {
      aGesture['dummy'] = []
      aGesture['dummy2'] = []
    } else if (length < 4) {
      aGesture['dummy'] = []
    }
    setGestureSum(length)
    setGestureTracker(tracker)
  }

  function comeIn () {
    Animated.spring(animation, {
      toValue: 0,
      delay: 200,
      speed: 1,
      useNativeDriver: true
    }).start()
  }

  function comeOut () {
    Animated.spring(animation, {
      toValue: 0 - dimensions.height,
      delay: 200,
      speed: 1,
      useNativeDriver: true
    }).start()
  }

  return (
    <View style={styles.container}>

      <Animated.View style={[
        styles.letterBox,
        { transform: [{ translateY: animation }] }
      ]}>
        <Text style={styles.textStyle}>{ alphabetList[alphabetIndex] }</Text>
      </Animated.View>

      {/* 
        the commented code bellow is used to add more gesture path
        to add more gesture, comment GestureDetector and uncomment GestureRecorder
        change the Text above to letter that want to be traced
        and start tracing and the result will out on console
      */}

      {/* <GestureRecorder onPanRelease={(gesture) => console.log(gesture)}>
        {({ gesture, offset }) => (
          <View style={{ position: "relative", width: "100%", height: "100%" }}>
            <GesturePath path={gesture} color="green" slopRadius={35} />
          </View>
        )}
      </GestureRecorder> */}

      <GestureDetector
        onGestureFinish={(gesture) => {
          console.log(`Gesture "${gesture}"`)
          if (!gestureTracker[gesture]) {
            console.log('get tracked')
            const newObj = { ...gestureTracker }
            newObj[gesture] = true
            setGestureTracker(newObj)
            setGestureSum(gestureSum - 1)
          } else {
            console.log('its already tracked')
          }
        } }
        onPanRelease={() => {
          if (gestureSum === 0) {
            if (alphabetIndex >= 2) {
              props.goToNextPhase()
            } else {
              setTimeout(() => {
                comeOut()
                setTimeout(() => {
                  setAlphabetIndex(alphabetIndex + 1)
                }, 500)
              }, 300)
            }
          }
        }}
        gestures={aGesture}
        slopRadius={35}
      >
        {({ coordinate }) => (
          <View style={{
            position: "relative",
            width: "100%",
            height: "100%"
          }}>
            
            {coordinate && <Cursor {...coordinate} />}
          </View>
        )}
      </GestureDetector>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  letterBox: {
    position: 'absolute',
    height: 250,
    width: 250,
    backgroundColor: 'orange',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  textStyle: {
    fontSize: 250,
    alignSelf: 'center'
  }
})