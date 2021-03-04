import SignUpFormModal from '../auth/SignUpFormModal';
import LoginFormModal from '../auth/LoginFormModal';
import { useModalAndAuthContext } from '../../context/ModalAndAuth';

export default function SplashPage() {
    return (
        <>
            <div>
                <img className="object-contain" alt="Laughs App logo" src="/images/pyp-logo-cropped.png"></img>
            </div>
            <div>
                <div className="absolute top-0 right-0 p-2 m-2">
                    <LoginFormModal/>
                </div>
                <div className="absolute top-5 right-0 p-2 m-2">
                    <SignUpFormModal/>
                </div>
            </div>
            <div className="grid grid-flow-col grid-cols-4 grid-rows-4">
                <h1 className="text-4xl col-start-1 col-end-2 row-start-1 row-end-2 p-1 m-1">Sharing jokes around the world</h1>
                <h2 className="text-lg col-start-1 col-end-2 row-start-2 row-end-3 p-1 m-1">Use Laughs and all its features for free, forever!</h2>
                <div className="col-start-2 col-end-5 row-start-1 row-end-4">
                    <img className="rounded-lg md:w-1/2" alt="Laughing Man" src="/images/laughing-man-holding-pen-in-meeting.jpg"></img>
                </div>
            </div>
            
        </>
    )
}