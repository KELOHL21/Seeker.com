import { firestore } from '../firebaseConfig';
import { addDoc, collection, onSnapshot, doc, updateDoc, query,where, setDoc, deleteDoc} from 'firebase/firestore';
import { toast } from 'react-toastify';

let dbRef = collection(firestore, 'posts');
let userRef = collection(firestore, 'users');
let likeRef = collection(firestore,'likes');
let commentRef =collection(firestore, 'comments')
let connectionsRef = collection(firestore,'connections')

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

export const getUsers = (setAllUsers) => {
   onSnapshot(userRef,(response) => {
      setAllUsers(response.docs.map((docs) => {
         return {...docs.data(), id: docs.id}
      }));
   });
}

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
         return {...docs.data(), id: docs.id}
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
       toast.success("Profile updated successfully");
     })
     .catch((err) => {
       console.log(err);
     });
 };
 

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

export const likePost = (userId, postId, liked) => {
   try {
       // sets doc using a unique id
       let docLike = doc(likeRef, `${userId}_${postId}`);
       if (liked) {
           deleteDoc(docLike);
       } else {
           setDoc(docLike, {
               userId: userId,
               postId: postId
           });
       }
   } catch (err) {
       console.log(err);
   }
};
 
 export const getLikesByUser = (userId,postId, setLiked, setLikesCount) => {
   try {

      // Matching the two postIds for a accurate
    let likesQuery= query(likeRef, where("postId", "==" , postId))

    onSnapshot(likesQuery, (response) => {
      // likes now contains all ur liked post data from firebase
      let likes = response.docs.map((doc) => doc.data());
      let likesCount = likes?.length;

      // Determining which post was liked by which user
      const isLiked = likes.some((like) => like.userId === userId); 

      setLikesCount(likesCount);
      setLiked(isLiked);
    })
    } catch (err) {
      console.log(err) ;
    }
 }

 export const postComment = (postId, comment, timeStamp, name) => {
   try {
      addDoc(commentRef,{
         postId,
         comment,
         timeStamp,
         name
      })
   } catch (err) {
      console.log(err)
   }
 }

 export const getComments = (postId, setComments) => {
   try {
      let singlePostQuery = query(commentRef, where('postId', '==' ,postId));
      onSnapshot(singlePostQuery, (response)=> {
         const comments = response.docs.map((doc) => {
            return{
               id:doc.id,
               // Spreading the data from the doc
               ...doc.data(),
            }
         });

         setComments(comments);
         
      });
   
   } catch (err) {
      console.log(err)
   }
 };

 export const updatePost = (id,status, postImage) => {
      let updateCurrentPost = doc(dbRef, id );
     
      try {
         updateDoc(updateCurrentPost, { status, postImage });
         toast.success("Post updated succesfully")
      } catch (err) {
         console.log(err)
      }
 }

 export const deletePost = (id) => {
   let deleteCurrentPost = doc(dbRef, id);

   try {
      deleteDoc( deleteCurrentPost,);
      toast.success("Post deleted succesfully")
   } catch (err) {
      console.log(err)
   }
 }

 export const addConnection = (userId, targetId,) => {
   try {
       // sets doc using a unique id
       let addDocConnect = doc(connectionsRef, `${userId}_${targetId}`);

       setDoc(addDocConnect, { userId,targetId });
       
     toast.success("Connected Successfully!")
   } catch (err) {
       console.log(err);
   }
};

export const getConnections = (userId,targetId, setConnection) => {
   try {

      // Matching the two postIds for a accurate
    let connectionsQuery= query(connectionsRef, where("targetId", "==" , targetId))

    onSnapshot(connectionsQuery, (response) => {
      // likes now contains all ur liked post data from firebase
      let connections = response.docs.map((doc) => doc.data());

      // Determining which post was liked by which user
      const isConnection = connections.some((connection) => connection.userId === userId); 

      setConnection(isConnection)
    })
    } catch (err) {
      console.log(err) ;
    }
 }