import {Component} from "react"

import { MdDeleteOutline } from "react-icons/md";


import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'


import Cookies from "js-cookie"

import { withRouter } from "react-router-dom"

import  {v4 as uuidV4} from "uuid"

import "./index.css"


const List=(props)=>{
        const {qs,deleting,editing}=props;
        const {id,note}=qs;

        const Delete=()=>{
                deleting(id)
        }

        const edit=()=>{
            editing(id)
        }

        return(
            <li className="list-stile" >
                <div className="list-main">
                        <p className="list-note" >
                            Note Content : {note}
                        </p>
                        <button onClick={edit} className="editing">
                            edit
                        </button>
                        <button onClick={Delete}  className="delete" >
                            <MdDeleteOutline className="icons" />
                        </button>
                </div>
            </li>
        )
        
}




class Home extends Component{

    
    state={
        type:"Create Folder",
      
        folderName:"",
        username:"",
        text:"",
        log:false,
       status:"",
        getFolder:"",
        renderList:[],
        phase:false,
        foldererror:"",
        editexist:false,
        ref:"",
        heading:""
     
    }
    

    userField=(e)=>{
        this.setState({
           folderName:e.target.value,
           status:"",
           log:false,
           phase:false,
            getFolder:""
        })
    }
 


         homeSign=()=>{
        
        const {type,username,folderName,text}=this.state

        const user =Cookies.get("user")

     

     
           

          const s1=folderName
        
           const foldsList=localStorage.getItem(user)

           const data=JSON.parse(foldsList)

    

           const {foldersList}=data

           this.setState({
            list:[...foldersList],
            
           })

           const find=foldersList.find((s)=>(
                    s.name===folderName
           ))

         if(folderName!==""){  

         if(find===undefined){

            const set=[...foldersList,{"name":folderName,"notes":[]}]

            const setData={...data,"foldersList":set}
    
               localStorage.setItem(user,JSON.stringify(setData))

               this.setState({
                status:"succesfully created"
               })

         }
         else{
            this.setState({
                status:"folder already exists"
            })
         }
         
        }

        else{
            this.setState({
                status:"please fill the input field"
            })
        }

         
           
      

    

       this.setState({
        text:"",
        folderName:"",
        phase:false,
        log:false,
        getFolder:""
       })

         
                       
                  

        

      }



      Note=(e)=>{
        this.setState({
            text:e.target.value
        })
      }

      filterFolder=(e)=>{
        this.setState({
            getFolder:e.target.value,
            log:true,
            folderName:"",
            foldererror:"",
            status:""
          
        })
      }

   

     
      adNote=()=>{
        const {getFolder,text}=this.state


        if(getFolder!==""){

      let user=Cookies.get("user")


     
        
        const getStore=localStorage.getItem(user)

        const parseData=JSON.parse(getStore)

       const {foldersList}=parseData

        const filter=foldersList.find((s)=>(
            s.name===getFolder
        ))

        

        if(filter!==undefined){

            const filterList=foldersList.filter((s)=>(
                s.name!==getFolder
            ))


            

            

            if(text!==""){

                const {notes}=filter

                const notesData={
                    "id":uuidV4(),
                    "note":text
                    
                }

                const notesList=[...notes,notesData]

                const setOb={name:getFolder,notes:notesList}

                const finalOb=[...filterList,setOb]

                const readyOb={...parseData,"foldersList":finalOb}

                localStorage.setItem(user,JSON.stringify(readyOb))

                const renderObject=localStorage.getItem(user)

                const parseRender=JSON.parse(renderObject)

                const {foldersList}=parseRender

                const filterOb=foldersList.filter((s)=>(
                    s.name===getFolder
                ))

               const render1=filterOb[0]

          
             

                this.setState({
                    text:"",
                    list:render1.notes,
                    phase:true,
                    heading:getFolder
                   
                })
                

            }

            else{
         
              const user=Cookies.get("user")

                const {getFolder}=this.state;
                
                const getStore=localStorage.getItem(user)
                
                const parseData=JSON.parse(getStore)

                const {foldersList,password}=parseData

             
                const filterFolder=foldersList.filter((s)=>(
                    s.name===getFolder
                ))
                
               this.setState({
                list:filterFolder[0].notes,
                phase:true,
                heading:getFolder
               
               })

              
                

            }

         

         

         
            
        }
        else{
            this.setState({
                foldererror:"folder doesn't exists!"
            })
        }

    }
    else{
        this.setState({
            foldererror:"please fill the input field"
        })
    }
    
    
    }

      textArea=(e)=>{
        this.setState({
            text:e.target.value,
            folderName:""
        })
      }

      renderDelete=(id)=>{


      const user=Cookies.get("user")

        const {getFolder}=this.state;

        const getStore=localStorage.getItem(user)

        

        const parseData=JSON.parse(getStore)

        const {foldersList}=parseData;

    


        const filterFolder=foldersList.filter((s)=>(
            s.name===getFolder
        ))

        const filterList=foldersList.filter((s)=>(
            s.name!==getFolder
           ))


       const filterOb=filterFolder[0].notes;

      const notesList=filterOb.filter((s)=>(
        s.id!==id
      ))
      
      const folderData={
        "name":getFolder,
        "notes":notesList
      }

      
     

      const settingData=[...filterList,folderData]
      const setup={...parseData,"foldersList":settingData}

      localStorage.setItem(user,JSON.stringify(setup))

      const updatedGet=localStorage.getItem(user)

      const updatedParse=JSON.parse(updatedGet)

      const updateList=updatedParse.foldersList

      const folderRender=updateList.filter((s)=>(
        s.name===getFolder
      ))
     const listRender=folderRender[0].notes

     this.setState({
        list:listRender
     })
    
      



    



        
      }

      renderedit=(id)=>{
        const user=Cookies.get("user");
        const {getFolder,text}=this.state
        const getStore=localStorage.getItem(user)

        const parseData=JSON.parse(getStore)

        const {foldersList}=parseData;

        const filterFolder=foldersList.map((s)=>{

            if(s.name===getFolder){
                
                const {notes}=s;

                const dataNote=notes.filter((f)=>(
                    f.id===id
                ))
                
             const test=dataNote[0].note

             this.setState({
                text:test,
                editexist:true,
                ref:id
             })
                
                
            }
        }
            
            )

      }

      goingToedit=()=>{

        const {ref,getFolder,text}=this.state;

        const user=Cookies.get("user")

        const getStore=localStorage.getItem(user)

        const parseData=JSON.parse(getStore)

        const {foldersList}=parseData;

 
        const filterFolder=foldersList.filter((s)=>(
            s.name===getFolder
        ))

        const filterList=foldersList.filter((s)=>(
            s.name!==getFolder
        ))

       const nestedNote=filterFolder[0]
       
       const update=nestedNote.notes.filter((s)=>{

        
        if(s.id===ref){
                   s.note=text
        }
        
      })

    const setData={...parseData,"foldersList":foldersList}

 

    localStorage.setItem(user,JSON.stringify(setData))

    const getData=localStorage.getItem(user)

    const parsing=JSON.parse(getData)

    const listing=parsing.foldersList;

    const filtering=listing.filter((s)=>(
        s.name===getFolder
    ))

    this.setState({
        list:filtering[0].notes,
        text:"",
        ref:"",
        editexist:false
    })

 
      }


      logOut=()=>{
        const  {history}=this.props;

        history.replace("/login")
        Cookies.remove("user")
        
     

      

       
      
      }

      clearAccount=()=>{
        const user=Cookies.get("user")

        const {history}=this.props;

        

        history.replace("/login")

        Cookies.remove("user")

        localStorage.removeItem(user)
      }

    render(){

     

        const {type,folderName,text,log,list,status,getFolder,phase,foldererror,editexist,heading}=this.state

   
        const Name=Cookies.get("user")
 
         

            


           
        


        return(

                <div className="home-main" >

                    <div className="home-headersin" >
                            
                            <div className="home-header" >
                                <lablel className="text" >
                                    {type}
                                </lablel>
                                <input  placeholder="enter the folder name" className="input" type="text" onChange={this.userField} value={folderName} />

                                <button className="sign-login" onClick={this.homeSign} >Click</button>
                            
                                {status!=="" ? <p className="success" >{status}</p>:""}

                            </div>

                            <div className="user-main" >
                            <button onClick={this.logOut} className="logout" > Log Out</button>

                            <Popup trigger={<button className="user-home" >{Name[0].toUpperCase()}</button>} >
                                    <button className="delete-account" onClick={this.clearAccount} >Delete Account</button>
                                    <button className="sm-logout" onClick={this.logOut} >Logout</button>
                            </Popup>

                            

                            </div>

                    </div>

                            <hr className="line" />
                        <div className="home-note" >
                            <input value={getFolder} placeholder="folder name to add note" className="fol" onChange={this.filterFolder}  /> 
                            <button className="notes-click" onClick={this.adNote} >Add Note</button>
                           
                        </div>
                        <p className="fail1" >{foldererror}</p>
                            
                       {log?
                       

                       <div className="text-main" > <textarea value={text} placeholder="enter the note # click add note button #" onChange={this.textArea} className="text-area" cols={40} rows={4} />
                       
                                    {editexist?<button onClick={this.goingToedit} className="sign-login1" type="button"  >Click Here to edit</button>:""}
                       </div>

                       
                       
                       :""}

                       
                        {phase? <>
                        <ol className="o-lists" >
                                <h1 className="heading" >{heading}</h1>
                        {list.map((s)=>(
                            <List key={s.id} qs={s} deleting={this.renderDelete} editing={this.renderedit} />
                        ))}
                        </ol>
                        </> :""}
                </div>
        )
    }
}

export default Home