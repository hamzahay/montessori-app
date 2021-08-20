import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Book from '../components/Book'
import { setCurrentShelf } from '../store/action'

export default function  ShelfDetail ({ route, navigation }) {
  const dispatch = useDispatch()
  const [books, setBooks] = useState([])
  const { shelf } = route.params
  const allBooks = useSelector(state => state.shelf.books)

  useEffect(() => {
    const shelfBooks = allBooks.filter(activity => activity.shelf == shelf)
    if (shelfBooks[0].book) {
      setBooks(shelfBooks[0].book)
      dispatch(setCurrentShelf(shelfBooks))
    }
  }, [allBooks])

  function toLibrary () {
    navigation.navigate('Library')
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.top}>
          <Button title="Library" onPress={() => toLibrary()} />
        </View>
        <View style={styles.bookContainer}>
          { books ? books.map((book, index) => <Book key={index} book={book} navigation={navigation} books={books} activityIndex={index} />) : <View></View> }
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    padding: 25,
  },
  innerContainer: {
    flex: 1,
    borderWidth: 1,
  },
  top: {
    flexDirection: 'row',
    padding: 5
  },
  bookContainer: {
    flex: 1,
    padding: 25,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  }
})