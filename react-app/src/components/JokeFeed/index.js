import { useDispatch, useSelector } from 'react-redux';
import { getJokes } from '../../store/jokes';
import ThreadForm from '../ThreadForm';

export default function JokeFeed() {
    const dispatch = useDispatch();
    dispatch(getJokes);
    const allJokes = useSelector(state => Object.values(state.jokes))

    return (
        <div className="col-start-3 col-end-6 row-start-5 row-end-7 w-full h-full">
            {allJokes.map((post) => {
                const { id, imageURL, joke, jokeType } = post;
                const myDate = new Date(post.users.timestamp)
                return (
                    <div key={id} props={id} className="rounded-lg border-4 border-light-blue-500 border-opacity-50 p-1 m-2">
                        {/* <img src={imageURL} alt=''/> */}
                            <h3>{post.users.username}</h3>
                            <h3>Joke Type: {jokeType}</h3>
                            <h3>{myDate.toLocaleString()}</h3>
                            <h3 className="text-lg">{joke}</h3>
                            <ThreadForm />
                    </div>
                )
            })}
        </div>
    )
}