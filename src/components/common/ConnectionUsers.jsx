
export default function ConnectionUsers({ user, getCurrentUser }) {
    return (

       <div 
         onClick={() => getCurrentUser(user.id)}
         className=" m-2 text-center p-2 border-2 border-gray-600">
          <p className="text-lg font-semibold pt-2">{user.name}</p>
          <p className="pt-5 text-[15px] leading-tight tracking-wider">{user.headline}</p>
        </div>
    );
  }
  