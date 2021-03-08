import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function ThreadForm(){
    const currentUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const currentJoke = useSelector((state) => state.jokes)

    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState([]);

    const createThreadPost = async (e) => {
        e.preventDefault();
        setErrors([]);
        
        const thread = {
            userId: currentUser.id,
            // jokeId: ,
            comment: comment,
        };

        const sendThread = await dispatch((thread));
    }

    return (
        <div>Thread</div>
    )
}