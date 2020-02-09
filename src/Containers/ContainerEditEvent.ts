import {connect} from 'react-redux'
import ComponentEditElement from '../Components/ComponentEditEvent'
import * as thunks from '../Thunks/Thunks'
import * as util from '../common/util'

import {
    IRootState,
} from '../Models/Models'

export interface IStateProps {
    isSending: boolean,
}

export interface IDispatchProps {
    performEditElementRequest: (elementId: number, eventTitle: string, goBack: () => void) => void,
}

const mapStateToProps = (state: IRootState): IStateProps => ({
    isSending: state.reducer.isFetching,
})

const mapDispatchToProps = (dispatch: Function): IDispatchProps => ({
    performEditElementRequest: (elementId: number, eventTitle: string, goBack: () => void): void => {
        dispatch(thunks.performEditElementRequest(
            elementId,
            util.getEditElementRequestOptions(elementId, eventTitle),
            goBack,
        ))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(ComponentEditElement)
