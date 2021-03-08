import JokeForm from '../JokeForm/JokeForm'
import JokeFeed from '../JokeFeed/index'

export default function HomeFeed(){
    return (
        <>
        {/* <NavBar/> */}
            <div className="grid grid-flow-col grid-cols-7 grid-rows-7 gap-3">
                <JokeForm />
                <JokeFeed />
            </div>
        </>
    )
}