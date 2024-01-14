import React from "react";
import { SlLike } from "react-icons/sl";
import { likePost } from "../../api/FirestoreApis";

export default function LikeButton(userId, postId, ) {

    const handleLikes = () => {
            likePost(userId, postId)
            console.log(postId)
    }

    return (
        <div onClick={handleLikes} className="flex items-center gap-1 pt-2 cursor-pointer">
           <SlLike />
           <p className="text-[12px] font-bold">Like</p>
        </div>
    )
}
