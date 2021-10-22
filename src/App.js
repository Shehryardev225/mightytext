/**
* Main App
*/
import React,{useState} from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Login from './routes/chat/components/Login';
import Home from './routes/chat/components/Home';
import  io  from "socket.io-client";

// css
import './lib/reactifyCss';

// firebase
import './firebase';
const socket=io.connect("http://localhost:8008")
// app component
import App from './container/App';
import ChatList from './routes/chat/index.js';
import { configureStore } from './store';

const MainApp = () => (
	<Provider store={configureStore()}>
		<MuiPickersUtilsProvider utils={MomentUtils}>
			<Router>
				<Switch>
					<Route path="/" component={App} />
				</Switch>
			</Router>
		</MuiPickersUtilsProvider>
	</Provider>
);

// function MainApp()
// {
// 	const [userName, setUserName] = useState("");
// 	const [usersList, addUsers] = useState([]);


// 	const getUsername = (fetched_userName) => {
// 		setUserName(fetched_userName);
	
// 		socket.auth = { fetched_userName };
// 		socket.connect();
// 	  };

// 	  socket.on("users", (users) => {
// 		users.forEach((user) => {
// 		  user.self = user.userID === socket.id;
// 		});
// 		users = users.sort((a, b) => {
// 		  if (a.self) return -1;
// 		  if (b.self) return 1;
// 		  if (a.username < b.username) return -1;
// 		  return a.username > b.username ? 1 : 0;
// 		});
// 		addUsers(users);
// 	  });

// 	  socket.on("user connected", (user) => {
// 		addUsers([...usersList, user]);
// 	  });

// 	  	return (

// 			<div className="MainApp">
// 				<Provider store={configureStore()}>
// 		<MuiPickersUtilsProvider utils={MomentUtils}>
// 			<Router>
// 				<Switch>
// 				{!userName ? (
					  
// 					  <Login submit={(event) => getUsername(event)} />
// 					) : (
					  
// 					  <ChatList user={userName} connectedUsers={usersList} />
				  
			  
// 					)}
// 				</Switch>
// 			</Router>
// 		</MuiPickersUtilsProvider>
// 	</Provider>
				
	  

// 			</div>

// 		  );



// }	

export default MainApp;
