import React, { createContext } from 'react';

const UtilContext = createContext({});

export class UtilContextProvider extends React.Component {

	state = {
		showCreatePostModal: false,
		user: {},
	}

	toggleCreatePostModal = () => {
		this.setState({
			showCreatePostModal: !this.state.showCreatePostModal
		})
	}

	setCurrentUser = (user) => {
		this.setState({ user })
	}

	render() {
		return (
			<UtilContext.Provider
				value={{
					state: this.state,
					setCurrentUser: this.setCurrentUser,
					toggleCreatePostModal: this.toggleCreatePostModal
				}}
			>
				{this.props.children}
			</UtilContext.Provider>
		);
	}

}

export const UtilContextConsumer = UtilContext.Consumer;