import { firestore } from '../firebaseConfig';
import { addDoc, collection, onSnapshot, doc, updateDoc, query,where, setDoc} from 'firebase/firestore';
import { toast } from 'react-toastify';

let dbRef = collection(firestore, 'posts');
let userRef = collection(firestore, 'users');
let likeRef = collection(firestore,'likes')

export const PostStatus = (object) =>{

      addDoc(dbRef, object)
      .then(() => {
         toast.success("Post added succesfully")
      }).catch((err)=> {
         console.log(err);
      })
};

export const getStatus = (setAllStatus) => {
   onSnapshot(dbRef,(response) => {
      setAllStatus(response.docs.map((docs) => {
         return {...docs.data(), id: docs.id}
      }));
   });
};

export const postuserData = (object) => {
   addDoc(userRef, object)
   .then(() => {})
   .catch((err) => {
      console.log(err);
   });
}

// Fitlering data to get current user
export const getCurrentUsers = (setCurrentUser) => {
   onSnapshot(userRef,(response) => {
      setCurrentUser(response.docs.map((docs) => {
         return {...docs.data(), userID: docs.id}
      }).filter((item) => {
         // So that current user display name will show
         return item.email === localStorage.getItem("userEmail");
      })[0]
      );
   });
}

export const editProfile = (userID, payload) => {
   // Getting the current user by ID
   let userToEdit = doc(userRef, userID);

   // Updating doc
   updateDoc(userToEdit, payload)
   .then(() => {
      toast.success("Profile updated succesfully")
   })
   .catch((err) => {
      console.log(err);
   });

}

export  const getSinglePost = (setAllStatus, id) => {
   // Making sure the the ids are the same so that the posts can be filtered out when the usersName  is clicked and displayed
      const singlePostQuery = query(dbRef, where("userID", "==", id));
      onSnapshot(singlePostQuery, (response) => {
         setAllStatus(
            response.docs.map((docs) => {
               return {... docs.data(), id: docs.id};
            })
         );
      });
};

export  const getSingleUser = (setCurrentUser, email) => {
   // Making sure the the emails are the same so that it can be filtered out when the usersName  is clicked and displayed
      const singleUserQuery = query(userRef, where('email', '==',email ));
      onSnapshot(singleUserQuery, (response) => {
         setCurrentUser(
            response.docs.map((docs) => {
               return {... docs.data(), id: docs.id};
            })[0]
         );
      });
};

export const likePost = (userId, postId) => {
   try {
     // sets doc using unique id
     let docLike = doc(likeRef, `${userId}_${postId}`);
     setDoc(docLike, {
       userId: userId,
       postId: postId
     });
     console.log(postId);
   } catch (err) {
     return err;
   }
 };
