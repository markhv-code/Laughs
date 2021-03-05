import JokeForm from '../JokeForm/JokeForm'

export default function HomeFeed(){
    return (
        <>
        {/* <NavBar/> */}
            <div className="grid grid-flow-col grid-cols-7 grid-rows-6 gap-3">
                <JokeForm />
            </div>
        </>
    )
}