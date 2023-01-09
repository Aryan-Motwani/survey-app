// import React, { useRef } from "react";
// import { surveyAppRef } from './firebase';
// import {firestore} from './firebase';
// import {addDoc, collection} from '@firebase/firestore';


// export default function Test(){
//     const messageRef = useRef();
//     const ref = collection(firestore, "messages");

    
//     const handleSave = async (e) => {
//         e.preventDefault();
//         console.log(messageRef.current.value);

//         let data = {
//             message: messageRef.current.value,
//         };
//         addDoc(ref, data);
        
//     }

//     return (
//         <div>
//             <form onSubmit={handleSave}>
//                 <input type="text" ref={messageRef} />
//                 <button type="submit">Save</button>
//             </form>
//         </div>
//     )
// }