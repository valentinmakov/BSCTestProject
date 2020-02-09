import {connect} from 'react-redux'
import ComponentAddEvent from '../Components/ComponentAddEvent'
import * as thunks from '../Thunks/Thunks'
import * as util from '../common/util'

import {
    IEvent,
    IRootState,
} from '../Models/Models'

export interface IStateProps {
    eventList: IEvent[],
    isSending: boolean,
}

export interface IDispatchProps {
    performAddEventRequest: (eventTitle: string, eventList: IEvent[], goBack: () => void) => void,
}

const mapStateToProps = (state: IRootState): IStateProps => ({
    eventList: state.reducer.eventList,
    isSending: state.reducer.isFetching,
})

const mapDispatchToProps = (dispatch: Function): IDispatchProps => ({
    performAddEventRequest: (eventTitle: string, eventList: IEvent[], goBack: () => void): void => {
        dispatch(thunks.performAddEventRequest(
            util.getAddEventRequestOptions(eventTitle, eventList),
            goBack,
        ))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(ComponentAddEvent)
