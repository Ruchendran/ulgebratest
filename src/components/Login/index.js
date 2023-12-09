import {Component} from "react"

import Cookies from "js-cookie"




import "./index.css"


class Login extends  Component{

    state={
        selectType:"Create User",
        username:"",
        password:"",
        error:"",
        list:[]
    }

    input1=(e)=>{
        this.setState({
            username:e.target.value
        })
    }


    input2=(e)=>{
        this.setState({
            password:e.target.value
        })
    }

    uploadUser=()=>{

        this.setState({
            selectType:"Create User",
            username:"",
            password:"",
            error:"",
            login:false
        })
    }

    signUser=()=>{
        this.setState({
            selectType:"Log In",
            username:"",
            password:"",
            error:""
        })
    }
    
    

    submit=(e)=>{
        e.preventDefault()

        const {selectType,username,password}=this.state

       if(username!=="" && password!==""){


        if(selectType==="Create User"){

            const check=localStorage.getItem(username)

            if(check===null){

                const store={
                    "password":password,
                    "foldersList":[]
                   
                   
                }
                localStorage.setItem(username,JSON.stringify(store))

                Cookies.set("user",username,{expires:30})

                const {history}=this.props;
                
                history.replace("/")

                

            }
            else{
                this.setState({
                    error:"user Already exists"
                })
            }

        }
        if(selectType==="Log In"){

            const get=localStorage.getItem(username)

            

            if(get!==null){
                
                const pas=localStorage.getItem(username)
                
                const Data=JSON.parse(pas)

                const {foldersList}=pas
               

                if(Data.password===password){

                            const {history}=this.props;

                            Cookies.set("user",username,{expires:30})

                            history.replace("/")
                }
                else{
                    this.setState({
                        error:"Ur password is wrong"
                    })
                }
            }
            else{
                this.setState({
                    error:"User Doesn't exists!"
                })
            }

        }
    }
    else{
        this.setState({
            error:"please fill the inputs!"
        })
    }
    }

    render(){

        const {selectType,username,password,error,login}=this.state


      

 
          
  

        return(
            
           
            
            <div className="login" >
                
                <form className="form-login" onSubmit={this.submit} >

                    <h1 className="heading" >{selectType}</h1>

                    <div className="sign" >
                        <label htmlFor="s1" className="text" >
                            USERNAME
                        </label>
                        <input  type="text"  id="s1" className="input" placeholder="Enter the username" onChange={this.input1} value={username}  />

                        <label className="text" htmlFor="s2"  >
                            PASSWORD
                        </label> 
                        <input type="password" id="s2" placeholder="Enter the Password" className="input" onChange={this.input2} value={password} />

                        <button className="sign-login" type="submit" > Login </button>
                        
                    </div>
                   
                    <div className="head-login" >
                        
                        <button className="login-final" onClick={this.uploadUser} type="button" >
                            Create User
                        </button>

                        <button className="login-final" onClick={this.signUser} type="button" >
                            Login
                        </button>

                    </div>

                    <p className="fail" >{error}</p>
                    
                    </form>

            </div>
            
        )
    }

}


export default Login