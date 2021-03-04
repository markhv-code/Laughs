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
            <h1 className="text-4xl">Sign up for your free Laughs account</h1>
                <h2 className="text-lg">Use Laughs and all its features for free, forever!</h2>
        </>
    )
}