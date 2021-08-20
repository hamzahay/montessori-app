import React, { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Animated, View, Text, Button, StyleSheet, useWindowDimensions } from 'react-native'
import { DraxList, DraxProvider, DraxView } from 'react-native-drax'

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export default function ObjectMoveableAlphabet () {
  const dimensions = useWindowDimensions()
  const cardPosition = useRef(new Animated.Value(0 - dimensions.width)).current

  const object = useSelector(state => state.activity.activity3)
  const [mount, setMount] = useState(false)
  const [objectList, setObjectList] = useState([''])
  const [objectIndex, setObjectIndex] = useState(0)
  const [currentObject, setCurrentObject] = useState([''])
  const [index, setIndex] = useState(0)
  const [answer, setAnswer] = useState([])
  const [finish, setFinish] = useState(false)

  useEffect(() => {
    if (mount) {
      setCurrentObject(objectList.shift())
      comeIn()
    }
  }, [objectList])

  useEffect(() => {
    setMount(true)
    const newArr = []
    while (newArr.length < 6) {
      const random = Math.floor(Math.random() * 20)
      const same = newArr.includes(object[random])
      if (!same) {
        newArr.push(object[random])
      }
    }
    setObjectList(newArr)
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
      if (objectIndex < objectList.length - 1) {
        setTimeout(() => {
          setObjectIndex(objectIndex + 1)
          setCurrentObject(objectList[objectIndex])
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

          {/* <View
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
              // setCurrentObject({ ...currentObject, index: 0 })
              console.log('clear')
            }} />
          </View> */}

          <View style={{ flexDirection: 'row' }}>

            <DraxView style={[styles.viewContainer, { flex: 1, padding: 5, alignItems: 'center' }]} 
              onReceiveDragDrop={({ dragged: { payload } }) => {
                if (alphabet[payload.index] === currentObject[index]){
                  if (answer.length > 1) {
                    setIndex(index + 1)
                    const newList = answer.slice()
                    newList.push(alphabet[payload.index])
                    setAnswer(newList)
                    reshufle()
                  } else {
                    setIndex(index + 1)
                    const newList = answer.slice()
                    newList.push(alphabet[payload.index])
                    setAnswer(newList)
                  }
                }
              }}
            >

              <Animated.View
                style={{
                  width: 200,
                  height: 200,
                  justifyContent: 'center',
                  // top: dimensions.height / 9 ,
                  left: 0,
                  backgroundColor: 'orange',
                  transform: [{ translateX: cardPosition }]
                }}
              >
                <Text style={styles.currentObject}>{ currentObject.join('') }</Text>
              </Animated.View>

            </DraxView>

            <View style={{ alignSelf: 'center', flexDirection: 'row', flex: 1, paddingHorizontal: 5 }}>
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

          </View>

          <View style={[styles.listContainer]}>
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
    paddingTop: 5,
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