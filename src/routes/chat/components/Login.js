import React from 'react';

const Login=(props)=>
{
    const handleSubmit = (e) => {
        e.preventDefault();
        const fetched_userName = e.target[0].value;
        console.log("Fetched Name ",fetched_userName);
        props.submit(fetched_userName);
      };

      return(

        <div className="login-container">
      <center>      <h1>Enter Your Username for Chat</h1>
            <form onSubmit={(event)=> handleSubmit(event)}>
        <input placeholder="Enter Your UserName" className="login-form"
        ></input>
            </form></center>
        </div>
      );
}
export default Login;