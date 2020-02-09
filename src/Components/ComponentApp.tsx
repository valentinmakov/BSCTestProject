import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {History} from 'history'

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
    history: History,
}

const renderEmptyList = (): React.ReactElement =>
    <div className={styles.activityContainer}>
        <p>List is empty</p>
    </div>

class ComponentApp extends Component<IProps> {
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
                        this.props.language === 'cz'
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
                        <Link to={'/addElement'}>{t('addActivity')}</Link>
                    </p>
                </div>
            </div>
        )
    }

    renderActivity = (activity: IActivity, index: number): React.ReactElement => {
        const t: (text: string) => string = this.props.t

        return (
            <div
                key={activity.id}
                className={styles.activityContainer}
            >
                <button onClick={this.onDeleteButtonClick(activity.id)}>{t('deleteActivity')}</button>
                <p className={styles.activityContent}>
                    <span>{(index + 1).toString()}</span> <span>{activity.title}</span>
                </p>
                <button onClick={this.onAddElementButtonClick(activity)}>{t('editActivity')}</button>
            </div>
        )
    }

    onDeleteButtonClick = (id: number): (() => void) => (): void => {
        this.props.performDeleteActivityRequest(id)
    }

    onAddElementButtonClick = (activity: IActivity): (() => void) => (): void => {
        this.props.history.push('/editElement', activity)
    }

    onLanguageButtonClick = (): void => {
        const nextLang: LanguageType = this.props.language === 'cz'
            ? 'en'
            : 'cz'
        this.props.performChangeLanguage(nextLang)
        this.props.i18n.changeLanguage(nextLang)
    }
}

const TranslatedComponentApp: React.ComponentType = withTranslation()(ComponentApp)

export default TranslatedComponentApp
