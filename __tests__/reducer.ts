import {initialState, reducer} from '../src/Reducers/Reducer'
import * as actionTypes from '../src/Actions/ActionTypes'

const action = {
    type: actionTypes.REQUEST_START,
}

const expectedResult = {
    ...initialState,
    isFetching: true,
}

test('reqestData action toggles isFetching property to true', () => {
    expect(reducer(initialState, action)).toStrictEqual(expectedResult)
})