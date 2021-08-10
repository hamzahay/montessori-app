import React, { useRef, useState, useEffect } from 'react'
import { Animated, View, Text, Button, StyleSheet, useWindowDimensions } from 'react-native'
import Draggable from 'react-native-draggable'
import { DraxList, DraxProvider, DraxView } from 'react-native-drax'

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export default function ObjectMoveableAlphabet () {
  const dimensions = useWindowDimensions()
  const cardPosition = useRef(new Animated.Value(0 - dimensions.width)).current

  const [mount, setMount] = useState(false)
  const [currentObject, setCurrentObject] = useState({ index: 0, letter: ['C', 'O', 'W'] })
  const [answer, setAnswer] = useState([])

  useEffect(() => {
    comeIn()
  }, [])

  useEffect(() => {
    if (mount && answer.length === 3) {
      setTimeout(() => {
        setAnswer([])
        setCurrentObject({ ...currentObject, index: 0 })
        comeOut()
      }, 1000)
    } else {
      setMount(true)
    }
  }, [answer])

  function comeIn () {
    Animated.spring(cardPosition, {
      toValue: dimensions.width / 4 - 100,
      friction: 7,
      delay: 1000,
      useNativeDriver: true
    }).start()
  }

  function comeOut () {
    Animated.spring(cardPosition, {
      toValue: 0 - dimensions.width,
      speed: 1,
      delay: 200,
      useNativeDriver: true
    }).start()
  }

  return (
    <DraxProvider>
      <View style={styles.container}>

        <View
          style={{
            position: 'absolute',
            justifyContent: 'space-evenly'
          }}
        >
          <Button title="Start" onPress={() => comeIn()} />
          <Button title="End" onPress={() => comeOut()} />
          <Button title="Clear" onPress={() => {
            setMount(false)
            setAnswer(setAnswer([]))
            setCurrentObject({ ...currentObject, index: 0 })
            console.log('clear')
          }} />
        </View>

        <DraxView style={[styles.viewContainer, { width: dimensions.width / 2 }]} 
          onReceiveDragDrop={({ dragged: { payload } }) => {
            if (alphabet[payload.index] === currentObject.letter[currentObject.index]){
              setCurrentObject({ ...currentObject, index: currentObject.index + 1 })
              const newList = answer.slice()
              newList.push(alphabet[payload.index])
              setAnswer(newList)
            }
          }}
        >

          <Animated.View
            style={{
              width: 200,
              height: 200,
              justifyContent: 'center',
              // top: dimensions.height / 9 ,
              backgroundColor: 'orange',
              transform: [{ translateX: cardPosition }]
            }}
          >
            <Text style={styles.currentObject}>{ currentObject.letter.map(letter => letter) }</Text>
          </Animated.View>

          <View style={{ alignSelf: 'center', borderWidth: 1, flexDirection: 'row' }}>
            <DraxList
              horizontal={true}
              keyExtractor={item => item}
              data={answer}
              renderItemContent={({ item }) => (
                <View style={styles.textContainer}>
                  <Text style={styles.textStyle}>{ item }</Text>
                </View>
              )}
            />
          </View>

        </DraxView>

        <View style={styles.listContainer}>
          <DraxList
            horizontal={true}
            keyExtractor={item => item}
            data={alphabet}
            renderItemContent={({ item }) => (
              <View style={styles.textContainer}>
                <Text style={styles.textStyle}>{ item }</Text>
              </View>
            )}
          />
        {/* { panConfig.map((config, index) => <Moveable
          key={index}
          panConfig={config}
          answer={answer}
          setAnswer={setAnswer}
          currentObject={currentObject}
          setCurrentObject={setCurrentObject}
        />) } */}
        </View>

      </View>
    </DraxProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  listContainer: {
    justifyContent: 'center',
  },
  textContainer: {
    margin: 5,
    width: 75,
    height:  75,
    borderRadius: 5,
    backgroundColor: 'orange'
  },
  viewContainer: {
    paddingTop: 15,
    borderWidth: 1,
    alignSelf: 'center',
  },
  currentObject: {
    fontSize: 55,
    alignSelf: 'center',
    marginHorizontal: 35,
  },
  textStyle: {
    fontSize: 55,
    alignSelf: 'center',
    marginHorizontal: 15,
  }
})