import {initialState, reducer} from '../src/Reducers/reducer'
import * as actionTypes from '../src/Actions/actionTypes'

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