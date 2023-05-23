import React , {useEffect, useState} from 'react';
import HomeComp from '../components/HomeComp';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/common/Loader';

const HomePage = ({currentUser}) => {

   const [loading,setLoading] = useState(false);

   let navigate = useNavigate();
    // Checks user authentification once page is loaded
   useEffect(() => {
         onAuthStateChanged(auth, (res) => {
              // Checking whether a user is signed in or not
            if(!res?.accessToken){
               navigate('/')
              }else{
               setLoading(false);
             };
         })
   },[])
   return loading ? <Loader /> : <HomeComp currentUser={currentUser} />
}

export default HomePage