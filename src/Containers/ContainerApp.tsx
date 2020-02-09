import {connect} from 'react-redux'
import ComponentApp from '../Components/ComponentApp'
import * as thunks from '../Thunks/thunk'
import {
    IActivity,
    IRootState,
} from '../Models/Models'

interface IOwnProps {
    t: any,
}

export interface IStateProps {
    activityList: IActivity[],
    isFetching: boolean,
}

export interface IDispatchProps {
    performInitialDataRequest: () => void,
    performDeleteActivityRequest: (id: number) => void,
}

const mapStateToProps = (state: IRootState, props: IOwnProps): IStateProps => {
    console.log('container props', props)
    return ({
    activityList: state.reducer.activityList,
    isFetching: state.reducer.isFetching,
})}

const mapDispatchToProps = (dispatch: Function): IDispatchProps => ({
    performInitialDataRequest: (): void => {
        dispatch(thunks.networkCall('', {method: 'GET'}))
    },

    performDeleteActivityRequest: (id: number): void => {
        dispatch(thunks.networkCall(id.toString(), {method: 'DELETE'}))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(ComponentApp)
