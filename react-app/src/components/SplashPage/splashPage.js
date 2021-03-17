import SignUpFormModal from '../auth/SignUpFormModal';
import LoginFormModal from '../auth/LoginFormModal';
import { NavLink } from 'react-router-dom';
import { useModalAndAuthContext } from '../../context/ModalAndAuth';

export default function SplashPage() {
    return (
        <>
            <nav className='bg-red-joker h-20 grid grid-flow-col grid-cols-10 grid-rows-1'>
                <div className="h-1/2">
                    <img className='' alt="Laughs App logo" src='https://pairyopet.s3-us-west-1.amazonaws.com/pyp-logo-cropped.png'></img>
                    Laughs
                </div>
                <button className="h-1/2 text-xl text-center outline-black mt-4 pt-1 col-start-9 col-end-10 hover:bg-red-400">
                        <LoginFormModal />
                </button>
                <button className="h-1/2 text-xl text-center outline-black mt-4 pt-1 col-start-10 col-end-10 hover:bg-red-400">
                        <SignUpFormModal />
                </button>
            </nav>
            <div className="grid grid-flow-col grid-cols-4 grid-rows-4">
                    <h1 className="text-4xl col-start-1 col-end-2 row-start-1 row-end-2 p-1 m-1">Sharing jokes around the world</h1>
                    <h2 className="text-lg col-start-1 col-end-2 row-start-2 row-end-3 p-1 m-1">Use Laughs and all its features for free, forever!</h2>
                    <div className="col-start-2 col-end-5 row-start-1 row-end-4">
                        <img className="rounded-lg md:w-1/2" alt="Laughing Man" src='https://pairyopet.s3-us-west-1.amazonaws.com/laughing-man-holding-pen-in-meeting.jpg'></img>
                    </div>
            </div>
 
        </>
    )
}