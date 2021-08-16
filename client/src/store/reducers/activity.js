
const initialState = {
  activity3: [
    ['P', 'I', 'G'],
    ['D', 'O', 'G'],
    ['C', 'A', 'T'],
    ['H', 'A', 'T'],
    ['C', 'A', 'P'],
    ['B', 'A', 'G'],
    ['R', 'U', 'G'],
    ['B', 'U', 'G'],
    ['P', 'E', 'N'],
    ['P', 'I', 'N'],
    ['B', 'O', 'X'],
    ['F', 'A', 'N'],
    ['S', 'U', 'N'],
    ['P', 'O', 'T'],
    ['P', 'A', 'N'],
    ['R', 'A', 'T'],
    ['M', 'A', 'P'],
    ['B', 'A', 'T'],
    ['L', 'O', 'G'],
    ['P', 'E', 'G']
  ]
}

export default function activityReducer (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    default:
      return state
  }
}