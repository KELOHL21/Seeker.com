import { useEffect, useState } from "react";
import { addConnection, getUsers, } from "../api/FirestoreApis";
import ConnectionUsers from "./common/ConnectionUsers";

export default function ConnectionsComp({ currentUser }) {
    const [users, setUsers] = useState([]);

    const getCurrentUser = (id) => {
        addConnection(currentUser.id, id);      
    };

    useEffect(() => {
        getUsers(setUsers);
    }, []);

    return (
        <div className="grid grid-cols-2 h-auto gap-2"> 
            {users.map((user) => {
                return user.id === currentUser.id ? null : (
                    <ConnectionUsers key={user.id} currentUser={currentUser} user={user} getCurrentUser={getCurrentUser} />
                );
            })}    
        </div>
    );
}
