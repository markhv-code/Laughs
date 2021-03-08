import { useDispatch, useSelector } from 'react-redux';
import { getJokes } from '../../store/jokes';

export default function JokeFeed() {
    const dispatch = useDispatch();
    dispatch(getJokes);
    const allJokes = useSelector(state => state.jokes)

    return (
        <div>
            <h1>Hello World</h1>
        </div>
    )
}