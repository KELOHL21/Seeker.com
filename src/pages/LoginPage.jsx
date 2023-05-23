import React , {useEffect, useState} from 'react'
import LoginComp from "../components/LoginComp";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/common/Loader';



const LoginPage = () => {

  const [loading,setLoading] = useState(true);

  let navigate = useNavigate();

    useEffect(() => {
      onAuthStateChanged(auth, (res) => {
        if(res?.accessToken){
          navigate("/home")
        }else{
          setLoading(false);
        };
      });
  },[]);

  return loading ? <Loader /> : <LoginComp />
}

export default LoginPage