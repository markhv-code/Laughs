import { useDispatch, useSelector } from 'react-redux';
import { getJokes } from '../../store/jokes';
import ThreadForm from '../ThreadForm';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function JokeFeed() {
    const dispatch = useDispatch();
    dispatch(getJokes);
    const allJokes = useSelector(state => Object.values(state.jokes));
    const jokeComments = useSelector(state => Object.values(state.threads));
    // const jokeComments = comments.length ? comments : [];
    // console.log("----------jokeComments-------", jokeComments);
    const fetchMoreData = () => {
    if (allJokes.length >= 50) {
      this.setState({ hasMore: false });
      return;
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(Array.from({ length: 20 }))
      });
    }, 500);
  };

    return (
        <div className="col-start-3 col-end-6 row-start-5 row-end-7 w-full h-full" >
            <InfiniteScroll
                dataLength={allJokes.length}
                next={fetchMoreData}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>All caught up!</b>
                    </p>
                }
            >  
                {allJokes.map((post) => {
                    const { id, imageURL, joke, jokeType } = post;
                    const myDate = new Date(post.users.timestamp);
                    const filteredComments = jokeComments.filter(joke => (joke.jokeId === id));
                    // console.log("-----------filtered-----", filteredComments);
                    return (
                        <div key={id} className="rounded-lg border-4 border-light-blue-500 border-opacity-50 p-1 m-2">
                                <h3>{post.users.username}</h3>
                                <h3>Joke Type: {jokeType}</h3>
                                <h3>{myDate.toLocaleString()}</h3>
                                <h3 className="text-lg">{joke}</h3>
                                {filteredComments && filteredComments.map(comment => (
                                    <div key={comment.id} className="text-sm text-center">
                                        {comment.comment}
                                    </div>
                                ))}
                                <ThreadForm id={id} />
                        </div>
                    )
                })}
            </InfiniteScroll> 
        </div>
    )
}