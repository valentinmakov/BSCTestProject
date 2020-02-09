import {connect} from 'react-redux'
import ComponentAddElement from '../Components/ComponentAddElement'
import * as thunks from '../Thunks/thunk'
import * as util from '../common/util'

import {
    IActivity,
    IRootState,
} from '../Models/Models'

export interface IStateProps {
    activityList: IActivity[],
    isSending: boolean,
}

export interface IDispatchProps {
    performAddElementRequest: (elementTitle: string, activityList: IActivity[], goBack: () => void) => void,
}

const mapStateToProps = (state: IRootState): IStateProps => ({
    activityList: state.reducer.activityList,
    isSending: state.reducer.isFetching,
})

const mapDispatchToProps = (dispatch: Function): IDispatchProps => ({
    performAddElementRequest: (elementTitle: string, activityList: IActivity[], goBack: () => void): void => {
        dispatch(thunks.performAddElementRequest(
            util.getAddElementRequestOptions(elementTitle, activityList),
            goBack,
        ))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(ComponentAddElement)
