import React from 'react'
import ReactDOM from 'react-dom'
// import {I18nextProvider} from 'react-i18next'
// import i18n from './i18n'
import Root from './Components/ComponentRoot'
import store from './Store/store'

ReactDOM.render(
    (
        // <I18nextProvider i18n={i18n}>
            <Root store={store}/>
        // </I18nextProvider>
    ),
    document.getElementById('index'),
)
