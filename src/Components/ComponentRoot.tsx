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
import ContainerAddElement from '../Containers/ContainerAddElement'
// import ContainerEditElement from '../Containers/ContainerEditElement'

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
                            path={'/addElement'}
                            component={ContainerAddElement}
                        />
                        {/* <Route
                            path={'/editElement'}
                            component={ContainerEditElement}
                        /> */}
                    </Switch>
                </Router>
            </Provider>
        </I18nextProvider>
    )
}

export default ComponentRoot
