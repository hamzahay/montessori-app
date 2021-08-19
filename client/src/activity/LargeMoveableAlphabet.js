import React, { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Animated, View, Text, Button, StyleSheet, useWindowDimensions } from 'react-native'
import { DraxList, DraxProvider, DraxView } from 'react-native-drax'

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export default function LargeMoveableAlphabet () {
  const dimensions = useWindowDimensions()
  const cardPosition = useRef(new Animated.Value(0 - dimensions.width)).current

  const [mount, setMount] = useState(false)
  const [alphabetList, setAlphabetList] = useState([''])
  const [objectIndex, setObjectIndex] = useState(0)
  const [currentAlphabet, setCurrentAlphabet] = useState([''])
  const [index, setIndex] = useState(0)
  const [answer, setAnswer] = useState([])
  const [finish, setFinish] = useState(false)

  useEffect(() => {
    if (mount) {
      setCurrentAlphabet(alphabetList.shift())
      comeIn()
    }
  }, [alphabetList])

  useEffect(() => {
    setMount(true)
    const newArr = []
    while (newArr.length < 5) {
      const random = Math.floor(Math.random() * 26)
      const same = newArr.includes(alphabet[random])
      if (!same) {
        newArr.push(alphabet[random])
      }
    }
    setAlphabetList(newArr)
    console.log(newArr)
    // return setMount(false)
  }, [])

  function comeIn () {
    Animated.spring(cardPosition, {
      toValue: 0,
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

  function reshufle () {
    // add sound that confirm the answer here
    setTimeout(() => {
      setAnswer([])
      setIndex(0)
      comeOut()
      if (objectIndex < alphabetList.length - 1) {
        setTimeout(() => {
          setObjectIndex(objectIndex + 1)
          setCurrentAlphabet(alphabetList[objectIndex])
          comeIn()
        }, 500)
      } else {
        finished()
      }
    }, 1000)
  }

  function finished () {
    console.log('finish')
  }

  return (
    <DraxProvider>
      { !finish ?
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
              setAnswer([])
              setIndex(0)
              console.log('clear')
            }} />
          </View>

          <DraxView style={[styles.viewContainer, { flex: 1, padding: 15, alignItems: 'center' }]} 
            onReceiveDragDrop={({ dragged: { payload } }) => {
              console.log(alphabet[payload.index])
              if (alphabet[payload.index] === currentAlphabet) {
                reshufle()
              } else {
                // if not matched
              }
            }}
          >

            <Animated.View
              style={{
                width: 200,
                height: 200,
                justifyContent: 'center',
                left: 0,
                backgroundColor: 'orange',
                transform: [{ translateX: cardPosition }]
              }}
            >
              <Text style={styles.currentAlphabet}>{ currentAlphabet }</Text>
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
          </View>

        </View>
      : <View></View> }
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
  currentAlphabet: {
    fontSize: 100,
    alignSelf: 'center',
    marginHorizontal: 35,
  },
  textStyle: {
    fontSize: 55,
    alignSelf: 'center',
    marginHorizontal: 15,
  }
})