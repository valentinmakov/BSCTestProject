import {connect} from 'react-redux'
import ComponentApp from '../Components/ComponentApp'
import * as thunks from '../Thunks/thunk'
import {
    IActivity,
    IRootState,
    LanguageType,
} from '../Models/Models'

export interface IStateProps {
    activityList: IActivity[],
    isFetching: boolean,
    language: LanguageType,
}

export interface IDispatchProps {
    performInitialDataRequest: () => void,
    performDeleteActivityRequest: (id: number) => void,
    performChangeLanguage: (language: LanguageType) => void,
}

const mapStateToProps = (state: IRootState): IStateProps => ({
    activityList: state.reducer.activityList,
    isFetching: state.reducer.isFetching,
    language: state.reducer.language,
})

const mapDispatchToProps = (dispatch: Function): IDispatchProps => ({
    performInitialDataRequest: (): void => {
        dispatch(thunks.performInitialDataRequest())
    },

    performDeleteActivityRequest: (id: number): void => {
        dispatch(thunks.performDeleteActivityRequest(id.toString()))
    },

    performChangeLanguage: (language: LanguageType): void => {
        dispatch(thunks.performChangeLanguage(language))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(ComponentApp)
