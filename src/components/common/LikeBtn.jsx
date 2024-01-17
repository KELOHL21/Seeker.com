import React, { useMemo, useState } from "react";
import { AiFillLike,AiOutlineLike } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";
import { getTimeStamp } from '../../helper/useMoment';
import { getLikesByUser, likePost, postComment, getComments } from "../../api/FirestoreApis";


// Always pass in props using {}
export default function LikeButton({userId, postId}) {

    const [likesCount, setLikesCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const [showComment,setShowComment] = useState(false);
    const [comment, setComment] = useState('')

    const handleLikes = () => {
        likePost(userId, postId, liked); 
    } 
    const getComment = (event) => {
            setComment(event.target.value);
    }

    const addComment = () => {
        postComment(postId,comment,getTimeStamp('lll'))
        // .then(() => {
        //     setComment('')
        // })
    }
    
    // Need this memo to run every time the useri and postid changes
    useMemo(() => {
        getLikesByUser(userId, postId, setLiked, setLikesCount);
        getComments(postId)
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
                <div onClick= {() => setShowComment(true)} className="flex gap-1 items-center">
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
                   <input onChange={getComment} 
                        name ='comment' 
                        placeholder="Add Comment" 
                        value={comment}
                        className="border-solid border-2 h-[3rem] border-slate-400 rounded-full p-[8px] text-[15px] "></input>
                   <button 
                        onClick={addComment} 
                        className="align-bottom border-2 bg-blue-800 w-fit p-[5px] text-[15px] text-white rounded-full px-5">
                        Add Comment
                    </button>
                </>
           ): (
            <>

            </>
           )}
            
            
                       
        </div>
    );
}
