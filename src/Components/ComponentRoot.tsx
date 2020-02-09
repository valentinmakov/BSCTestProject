import React from 'react'
import {Provider} from 'react-redux'
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom'
import {I18nextProvider} from 'react-i18next'
import i18n from '../i18n'

import ContainerApp from '../Containers/ContainerApp'
import ContainerAddEvent from '../Containers/ContainerAddEvent'
import ContainerEditElement from '../Containers/ContainerEditEvent'

import {Store} from 'redux'

interface IProps {
    store: Store,
}

const ComponentRoot: React.FunctionComponent<IProps> = (props: IProps): React.ReactElement<IProps> => {
    return (
        <I18nextProvider i18n={i18n}>
            <Provider store={props.store}>
                <Router>
                    <Switch>
                        <Route
                            exact={true}
                            path={'/'}
                            component={ContainerApp}
                        />
                        <Route
                            path={'/addEvent'}
                            component={ContainerAddEvent}
                        />
                        <Route
                            path={'/editEvent'}
                            component={ContainerEditElement}
                        />
                    </Switch>
                </Router>
            </Provider>
        </I18nextProvider>
    )
}

export default ComponentRoot
