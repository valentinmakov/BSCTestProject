import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import * as styles from '../Styles/app.styl'
import {
    IDispatchProps,
    IStateProps,
} from '../Containers/ContainerApp'
import {
    withTranslation,
    WithTranslation,
} from 'react-i18next'

import {
    IActivity,
    LanguageType,
} from '../Models/Models'

interface IProps extends IDispatchProps, IStateProps, WithTranslation {
}

interface IState {
    language: LanguageType,
}

const renderEmptyList = (): React.ReactElement =>
    <div className={styles.activityContainer}>
        <p>List is empty</p>
    </div>

class ComponentApp extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            language: 'cz',
        }
    }

    componentDidMount() {
        if (this.props.activityList === null && !this.props.isFetching)
            this.props.performInitialDataRequest()
    }

    render() {
        const t: (text: string) => string = this.props.t

        return (
            <div className={styles.mainApp}>
                <button onClick={this.onLanguageButtonClick}>
                    {
                        this.state.language === 'cz'
                            ? 'English'
                            : 'Čeština'
                    }
                </button>
                <h1 className={styles.mainAppHeader}>{t('activityList')}</h1>
                <div className={styles.activityListContainer}>
                    {
                        this.props.activityList && this.props.activityList.length > 0
                            ? this.props.activityList.map(this.renderActivity)
                            : renderEmptyList()
                    }
                </div>
                <div className={styles.linkListContainer}>
                    <p className={styles.linkContainer}>
                        <Link to={'/addElement'}>Add activity</Link>
                    </p>
                </div>
            </div>
        )
    }

    renderActivity = (activity: IActivity, index: number): React.ReactElement => {
        return (
            <div
                key={activity.id}
                className={styles.activityContainer}
            >
                <button onClick={this.onDeleteButtonClick(activity.id)}>Delete activity</button>
                <p className={styles.activityContent}>
                    <span>{(index + 1).toString()}</span> <span>{activity.title}</span>
                </p>
            </div>
        )
    }

    onDeleteButtonClick = (id: number): (() => void) => (): void => {
        this.props.performDeleteActivityRequest(id)
    }

    onLanguageButtonClick = (): void => {
        const nextLang: LanguageType = this.state.language === 'cz'
            ? 'en'
            : 'cz'
        this.setState({language: nextLang})
        this.props.i18n.changeLanguage(nextLang)
    }
}

const TranslatedComponentApp: React.ComponentType = withTranslation()(ComponentApp)

export default TranslatedComponentApp
