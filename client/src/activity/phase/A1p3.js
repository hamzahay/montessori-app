import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
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
  const alphabetList = props.alphabetList
  const allGestures = useSelector(state => state.activity.activity1)
  const [alphabetIndex, setAlphabetIndex] = useState(0)
  const [currentGesture, setCurrentGesture] = useState({})
  const [gestureTracker, setGestureTracker] = useState({})
  const [gestureSum, setGestureSum] = useState(0)
  // const [newGesture, setNewGesture] = useState([])
  const [mount, setMount] = useState(false)

  useEffect(() => {
    console.log(gestureTracker)
  }, [gestureTracker])

  useEffect(() => {
    console.log('call gesture handler')
    getGesture()
  }, [alphabetIndex])

  function getGesture () {
    console.log('getGesture')
    console.log('alphabetIndex', alphabetIndex)
    console.log('gestureSum', gestureSum)
    const newGesture = allGestures.filter(gesture => gesture.letter === alphabetList[alphabetIndex])
    aGesture = newGesture[0].gesture
    console.log('1')
    getGestureDetail()
    console.log('4')
  }

  function getGestureDetail () {
    console.log('2')
    console.log('aGesture1', aGesture)
    delete aGesture.dummy
    delete aGesture.dummy2
    delete aGesture.dummy3
    delete aGesture.dummy4
    console.log('aGesture2', aGesture)
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
    console.log('3')
    console.log('length', length)
    console.log('tracker', tracker)
    setGestureSum(length)
    setGestureTracker(tracker)
  }

  return (
    <View style={styles.container}>

      <View style={styles.letterBox}>
        <Text style={styles.textStyle}>{ alphabetList[alphabetIndex] }</Text>
      </View>

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
            console.log('length', gestureSum)
            const newObj = { ...gestureTracker }
            newObj[gesture] = true
            setGestureTracker(newObj)
            setGestureSum(gestureSum - 1)
          } else {
            console.log('its already tracked')
          }
        } }
        onPanRelease={() => {
          console.log('pan release')
          if (gestureSum === 0) {
            if (alphabetIndex >= 2) {
              props.goToNextPhase()
            } else {
              setTimeout(() => {
                setAlphabetIndex(alphabetIndex + 1)
              }, 300)
            }
          }
        }}
        gestures={aGesture}
        slopRadius={35}
      >
        {({ coordinate }) => (
          <View style={{ position: "relative", width: "100%", height: "100%" }}>
            
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