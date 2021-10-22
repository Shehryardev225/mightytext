/**
 * Chat Area Component
 */
import React, { Component } from 'react';
import MessageBlock from './MessageBlock';
import { FormGroup, Input } from 'reactstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withRouter } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import  io  from "socket.io-client";
import ReactScrollFeed from 'react-scrollable-feed';
import users from 'Assets/data/chat-app/users';
// actions
import { sendMessageToUser } from 'Actions';

// app layouts
import { getAppLayout } from 'Helpers/helpers';

const socket=io.connect("http://localhost:8008")
class ChatArea extends Component {

	state = {
		msg: "", 
		chat: [],
		user: 0 ,
		anchorEl: null,
		chatOptions: [
			'Mute Notifications',
			'Block',
			'Clear Chat',
			'Send Contact'
		]
	}

	


	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	chatOptionsHandler = event => {
		this.setState({ anchorEl: event.currentTarget });
	}

	// componentDidMount() {
	// 	socket.on("chat", (msg) => {
	// 	  this.setState({
			
	// 		chat: [...this.state.chat, {msg}]
		   
	// 	  });
	// 	  console.log("Msg",this.state.chat)
	// 	});
	//   }

	  onTextChange = e => {
		this.setState({ msg: e.target.value });
	  };


	  onMessageSubmit = () => {
		
		console.log("All users are ",users);
		socket.emit("chat", {
			content:this.state.msg,
			to:socket.id

		});


		let data = {
			user: this.props.selectedUser,
			id:	this.props.selectedUser.id,
			message: this.state.msg,
			isAdmin: true,
			time: 'Just Now'
		}
		const isAdmin=true;
		console.log("User is ",data.user)
		console.log("User Id ",data.id)
		this.props.sendMessageToUser(data);
		console.log("Chat Mesage is ",data.message);

		this.setState({
			
		chat: [...this.state.chat, data.message],
		user: [data.id,this.props.selectedUser.first_name, isAdmin]  
				  });
		console.log("Chat is... ",this.state.chat);
		console.log("SelectedUser.id is ",this.state.user)
	
			this.setState({ msg: "" });
		
			
		// return (
		// 	<div>{this.renderChat()}</div>
		// )
	};
	

	
	renderChat(userid) {
		
		const {chat}=this.state;
		const {user}=this.state;
	console.log("Id is ",this.state.id);
	console.log("user id is ",userid);	
	const id=this.state.id;
	const count=chat.length;
	console.log("Total Msg are ",count)
	console.log("User New id is ",users)

		
	    return(
		<div ref={this.chatContainer} className="Chat">
		<ReactScrollFeed>	
		{
		
		chat.map((payload, idx) => (
		
			
			<MessageBlock
			
			even={payload.isAdmin}
			key={idx}
			data={payload}
			/>
		))
	  }
	  </ReactScrollFeed>
		</div>
		
		)
	}
	

	


	// onSubmitMessage(event) {
	// 	event.preventDefault();
	// 	if (this.state.message !== '') {
	// 		let data = {
	// 			user: this.props.selectedUser,
	// 			message: this.state.message,
	// 			isAdmin: true,
	// 			time: 'Just Now'
	// 		}
	// 		this.props.sendMessageToUser(data);
	// 		this.setState({ message: '' });
		
	// 	}
	// }

	getScrollHeight() {
		const { location } = this.props;
		const appLayout = getAppLayout(location)
		if (this.props.fullHeight) {
			return 'calc(100vh - 226px)';
		} else {
			switch (appLayout) {
				case 'app':
					return 'calc(100vh - 198px)';
				case 'agency':
					return 'calc(100vh - 387px)';
				case 'boxed':
					return 'calc(100vh - 387px)';
				case 'horizontal':
					return 'calc(100vh - 250px)';
				default:
					break;
			}
		}
	}
	


	render() {
		const { selectedUser, admin_photo_url } = this.props;
		if (selectedUser === null) {
			
			return (
				<div className="chat-box-main">
					<div className="text-center">
						<i className="zmdi zmdi-comments font-3x mb-2"></i>
						<Button className="d-none sidebar-toggler" onClick={this.props.onMenuIconPress}>Select user</Button>
					</div>
				</div>
			);
		}
		console.log("Selected User",selectedUser.id);

		const userid =selectedUser.id;
		socket.on("chat",({content,from})=>
		{
			console.log("Connected Users")
		});
		
		const { chatOptions, anchorEl } = this.state;
		return (
			<div className="chat-main-body">
				<div className="chat-head">
					<div className="d-flex justify-content-between align-items-center">
						<div className="media align-items-center">
							<IconButton
								className="mr-3 chat-sidebar-toggler d-none"
								color="inherit"
								aria-label="open drawer"
								onClick={this.props.onMenuIconPress}
							>
								<MenuIcon />
							</IconButton>
							<div className="mr-10">
								<img
									src={selectedUser.photo_url}
									alt="user profile"
									className="rounded-circle"
									width="40"
									height="40"
								/>
							</div>
							<div className="media-body mt-1">
								<h5 className="mb-0">{selectedUser.first_name}&nbsp;{selectedUser.last_name}</h5>
								<span className="font-xs text-muted">{selectedUser.status}</span>
							</div>
						</div>
						<div>
							<IconButton className="bg-primary text-white video-icon">
								<i className="zmdi zmdi-videocam"></i>
							</IconButton>
							<IconButton className="bg-primary text-white">
								<i className="zmdi zmdi-attachment-alt"></i>
							</IconButton>
							<IconButton
								aria-owns={anchorEl ? 'simple-menu' : null}
								aria-haspopup="true"
								onClick={this.chatOptionsHandler}
							>
								<i className="zmdi zmdi-more-vert"></i>
							</IconButton>
							<Menu
								id="simple-menu"
								anchorEl={anchorEl}
								open={Boolean(anchorEl)}
								onClose={this.handleClose}
							>
								{chatOptions.map((option, key) => (
									<MenuItem key={key} onClick={this.handleClose}>{option}</MenuItem>
								))}
							</Menu>
						</div>
					</div>
				</div>
				<Scrollbars
					className="rct-scroll"
					autoHide
					ref="chatScroll"
					style={{ height: this.getScrollHeight() }}
				>
					<div className="chat-body p-30">
						{
							this.renderChat(userid)
							// (()=>
							// {
							// 	console.log("Selected user is ",selectedUser)
									
								
							
							// })
							
				
			 
						// selectedUser.previousChats.map((previousChat, key) => (
							
						// 	<MessageBlock
						// 		even={!previousChat.id}
						// 		key={key}
						// 		selectedUserPhotoUrl={selectedUser.photo_url}
						// 		data={previousChat}
						// 		adminPhotoUrl={admin_photo_url}
						// 	/>
							
						// ))
					}
					</div>
				</Scrollbars>
				<div className="chat-footer d-flex px-4 align-items-center py-3">
					<form onSubmit={(event) => this.onSubmitMessage(event)} className="mr-3 w-100">
						<FormGroup className="mb-0">
							<Input
								name="message"
								type="text"
								id="search-msg"
								placeholder="Type your message"
							
								onChange={e => this.onTextChange(e)} 
								value={this.state.msg}	c
								lassName="msg-input"
							/>
						</FormGroup>
					</form>
					<Button
					variant="contained"
					color="primary"
					onClick={this.onMessageSubmit}
					className="submit-btn bg-primary"
					>
						Send
						<i className="zmdi zmdi-mail-send ml-2"></i>
					</Button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ chatAppReducer }) => {
	return chatAppReducer;
}

export default withRouter(connect(mapStateToProps, {
	sendMessageToUser
})(ChatArea));
