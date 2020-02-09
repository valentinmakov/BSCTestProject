import React from 'react'
import {History} from 'history'

import {
    IDispatchProps,
    IStateProps,
} from '../Containers/ContainerAddElement'

interface IProps extends IDispatchProps, IStateProps {
    history: History,
}

interface IState {
    newActivityTitle: string,
}

class ComponentAddElement extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            newActivityTitle: '',
        }
    }

    render() {
        return (
            <div>
                <input
                    type={'text'}
                    onChange={this.onTextType}
                />
                <input
                    type={'submit'}
                    onClick={this.onTextSubmit}
                />
            </div>
        )
    }

    onTextType = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({newActivityTitle: event.target.value})
    }

    onTextSubmit = (): void => {
        this.props.performAddElementRequest(
            this.state.newActivityTitle,
            this.props.activityList,
            this.props.history.goBack,
        )
    }

}

export default ComponentAddElement
