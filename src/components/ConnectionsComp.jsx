import { useEffect, useState } from "react"
import { addConnection, getUsers } from "../api/FirestoreApis"
import ConnectionUsers from "./common/ConnectionUsers";

export default function ConnectionsComp({ id, currentUser }){

    const [users,setUsers] = useState([]);
    const getCurrentUser = (id) => {

        addConnection(currentUser.id, id)

    }

    useEffect(()=> {
        getUsers(setUsers)
    },[])

    return (
        <div key={id} className="grid grid-cols-2 h-auto gap-2"> 
           {users.map((user) => {
             return <ConnectionUsers key={user.id}  user={user} getCurrentUser={getCurrentUser}/>
           })}    
        </div>
    )
}