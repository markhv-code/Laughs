import { useDispatch, useSelector } from 'react-redux';
import { getJokes } from '../../store/jokes';

export default function JokeFeed() {
    const dispatch = useDispatch();
    dispatch(getJokes);
    const allJokes = useSelector(state => Object.values(state.jokes))

    return (
        <div>
            {allJokes.map((post) => {
                const { id, imageURL, joke } = post;
                return (
                    <div key={id}>
                        {/* <img src={imageURL} alt=''/> */}
                        <div>
                            <h3>{post.users.username}</h3>
                            <h3>{joke}</h3>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}