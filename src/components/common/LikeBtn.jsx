import React, { useMemo, useState } from "react";
import { AiFillLike,AiOutlineLike } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";
import { getTimeStamp } from '../../helper/useMoment';
import { getLikesByUser, likePost, postComment, getComments } from "../../api/FirestoreApis";


// Always pass in props using {}
export default function LikeButton({userId, postId, currentUser}) {

    const [likesCount, setLikesCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const [showComment,setShowComment] = useState(false);
    const [comment, setComment] = useState('');

    // Created to store comments in
    const [comments, setComments] = useState([]);

    const handleLikes = () => {
        likePost(userId, postId, liked); 
    } 

    const getComment = (event) => {
            setComment(event.target.value);
    }

    const addComment = () => {
        postComment(postId,comment,getTimeStamp('lll'), currentUser?.name);
        setComment("")
    }

    const toggleCommentSection = () => {
        setShowComment(!showComment);
        // Clear the comment input when toggling the comment section
        if (!showComment) {
            setComment('');
        }
    };

    
    // Need this memo to run every time the useri and postid changes
    useMemo(() => {
        getLikesByUser(userId, postId, setLiked, setLikesCount);
        getComments(postId,setComments)
    }, [userId, postId]);

    return (
        <div className="flex flex-col gap-1 pt-2 cursor-pointer text-black">

            <div className="text-slate-500">
                <p className="text-sm">{likesCount} People Liked this Post</p>
            </div>

            <span className="h-[0.5px] w-full bg-slate-300"></span>

           <div className="flex flex-row gap-[10rem] items-center">

                {/* Likes Display */}
                <div className="flex gap-1 items-center" onClick={handleLikes}>
                    <div>
                        {liked ? (<AiFillLike />) : <AiOutlineLike /> }
                    </div>
                    <p className={liked ? "text-blue-600" : "text-slate-800"}>
                        <span className="text-[18px]">{liked ? "Liked" : "Like"}</span>
                    </p>
                </div>

                {/* Comment Section */}
                <div onClick= {() => setShowComment(!showComment)} className="flex gap-1 items-center">
                    <div>
                        <AiOutlineComment className="text-blue-500"/>
                    </div>
                    <p className={showComment ? "text-blue-500" : "text-black"}>
                        <span className="text-[18px]">Comment</span>
                    </p>  
                </div>

           </div>

           {showComment ? (
                <>
                   <input 
                        onChange={getComment} 
                        name ='comment' 
                        placeholder="Add Comment" 
                        value={comment}
                        className="border-solid border-2 h-[3rem] border-slate-400 rounded-full p-[8px] text-[15px] "></input>
                   <button 
                        onClick={addComment} 
                        className="align-bottom border-2 bg-blue-800 w-fit p-[5px] text-[15px] text-white rounded-full px-5">
                        Add Comment
                    </button>
                    
                    {comments.length > 0 ? (
                        comments.map((comment) => {
                            return (
                                <div key={comment.id} className="m-2 bg-slate-200 p-2 rounded-xl border-2 border-slate-300">
                                    <div className="flex flex-row gap-2 items-center">
                                        <p className="text-[15px] font-extrabold whitespace-normal">{comment.name}</p>
                                        <p className="text-[10px] font-medium">{comment.timeStamp}</p>
                                    </div>
                                  
                                    <p className="p-[2px] text-[12px] tracking-tight leading-5">{comment.comment}</p>
                         
                                </div>
                            );
                        })
                    ) : (
                        
                        <> </> // This part is rendered when comment.length is not greater than 0
                    )
                    
                    }


                </>

           ): (
            <>

            </>
           )}
            
                       
        </div>
    );
    
}
