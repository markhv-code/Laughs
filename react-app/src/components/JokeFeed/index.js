import { useDispatch, useSelector } from 'react-redux';
import { getJokes } from '../../store/jokes';

import ThreadForm from '../ThreadForm';

export default function JokeFeed() {
    const dispatch = useDispatch();
    dispatch(getJokes);
    const allJokes = useSelector(state => Object.values(state.jokes));
    const jokeComments = useSelector(state => Object.values(state.threads));
    const allUsers = useSelector(state => Object.values(state.users));



    return (
        <div className="col-start-3 col-end-6 row-start-5 row-end-7 w-full h-full" >
            {allJokes.reverse().map((post) => {
                const { id, joke, jokeType } = post;
                const myDate = new Date(post.timestamp);
                const filteredComments = jokeComments.filter(joke => (joke.jokeId === id));
                return (
                    <div key={id} className="rounded-lg border-4 border-light-blue-500 border-opacity-50 p-1 m-2">
                            <h3 className="ml-1">{post.users.username}</h3>
                            <h3 className="ml-1">Joke Type: {jokeType}</h3>
                            <h3 className="ml-1">{myDate.toLocaleString()}</h3>
                            <h3 className="text-lg ml-1">{joke}</h3>
                            {filteredComments && filteredComments.map(comment => {
                                let user = allUsers.filter(usrObj => (usrObj.id === comment.userId));
                                return (<div key={comment.id} className="text-sm items-center bg-blue-joker my-1 ml-4 pl-1 rounded-lg w-2/5">
                                    {user[0].username}: {comment.comment}
                                </div>)
            })}
                            <ThreadForm id={id} />
                    </div>
                )
            })}
        </div>
    )
}