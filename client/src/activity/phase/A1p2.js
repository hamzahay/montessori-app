import React, { useEffect, useRef, useState } from 'react'
import { Animated, View, Image, Text, StyleSheet, useWindowDimensions, Easing, TouchableOpacity, TouchableOpacityBase } from 'react-native'
import Draggable from 'react-native-draggable'
import { DraxList, DraxView, DraxProvider } from 'react-native-drax'
import handImage from '../../../assets/handImage.png'

export default function A1p2 (props) {
  const dimensions = useWindowDimensions()

  const [mount, setMount] = useState(false)
  const answer = props.alphabetList
  const [content, setContent] = useState([])
  const [answerIndex, setAnswerIndex] = useState(0)
  const [nextPhase, setNextPhase] = useState(false)

  const animation = useRef(new Animated.Value(0 - dimensions.height)).current
  const handAnimation = useRef(new Animated.Value(dimensions.height - 170)).current

  useEffect(() => {
    moveHand()
    setAnswerIndex(0)
    let shuffleArr = answer.slice()
    const index = answer.length
    for (let i = 0; i < index ; i++) {
      const randomIndex = Math.floor(Math.random() * (index))
      const temp = shuffleArr[i]
      shuffleArr[i] = shuffleArr[randomIndex]
      shuffleArr[randomIndex] = temp
    }
    console.log(shuffleArr)
    setContent(shuffleArr)
    setMount(true)
  },[])

  useEffect(() => {
    if (mount) {
      startAnimation()
    }
  }, [mount])

  function startAnimation () {
    Animated.spring(animation, {
      toValue: 0,
      speed: 1,
      delay: 200,
      useNativeDriver: true
    }).start()
  }

  function startHandAnimation () {
    Animated.spring(handAnimation, {
      toValue: dimensions.height - 170,
      speed: 1,
      delay: 200,
      useNativeDriver: true
    }).start()
  }

  function moveHand () {
    Animated.spring(handAnimation, {
      toValue: dimensions.height,
      speed: 1,
      delay: 200,
      useNativeDriver: true
    }).start()
  }

  return (
    <DraxProvider>

      <View style={styles.cardContainer}>

        <Animated.View
          style={[
            styles.listContainer,
            { transform: [{ translateY: animation }] }
          ]}
        >
          <DraxList 
            horizontal={true}
            keyExtractor={item => item}
            data={content}
            renderItemContent={({ item }) => (
              <TouchableOpacity
                style={styles.textContainer}
                onPress={() => {
                  if (!nextPhase) {
                    // function for press the letter game
                    if (answer[answerIndex] === item) {
                      // if answer match
                        console.log('pressed', item)
                        console.log('index', answerIndex)
                      if (answerIndex < 2) {
                        setAnswerIndex(answerIndex + 1)
                      } else {
                        // when all letter is answer correctly
                        setAnswerIndex(0)
                        setNextPhase(true)
                        startHandAnimation()
                      }
                    } else {
                      // add "nope try again" sound
                      console.log('not a match', answer[answerIndex])
                    }
                  }
                }}>
                <Text style={styles.textStyle}>{ item }</Text>
              </TouchableOpacity>
            )}
          />
        </Animated.View>

        <DraxView
            style={{
              position: 'absolute',
              borderWidth: 1,
              borderColor: 'red',
              padding: 5,
              // width: 130,
              // height: 130,
              left: dimensions.width - 170,
              top: dimensions.height - 170,
            }}
            onDragEnter={({}) => { console.log('drag in') }}
            onReceiveDragDrop={({ dragged: { payload } }) => {
              if (content[payload.index] === answer[answerIndex]) {
                console.log('its a match')
                if (answerIndex < 2) {
                  setAnswerIndex(answerIndex + 1)
                } else {
                  props.goToNextPhase()
                }
              } else {
                console.log('its not a match')
              }
            }}
            renderContent={({ ViewState }) => {
              if (nextPhase) {
                return (
                  <Image
                    source={handImage}
                    style={{
                      height: 150,
                      width: 150,
                      resizeMode: 'contain',
                    }}
                  />
                )
              }
            }}
          />

      </View>

    </DraxProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
  },
  cardContainer: {
    flex: 1,
    borderWidth: 1,
  },
  handContainer: {
    borderWidth: 1,
    borderColor: 'red',
    width: 170,
    height:  170,
  },
  listContainer: {
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textContainer: {
    backgroundColor: 'orange',
    margin: 5,
    width: 130,
    height:  130,
  },
  textStyle: {
    fontSize: 100,
    alignSelf: 'center',
  }
})