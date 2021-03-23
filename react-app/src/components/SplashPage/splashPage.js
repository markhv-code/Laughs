import SignUpFormModal from "../auth/SignUpFormModal";
import LoginFormModal from "../auth/LoginFormModal";
import Footer from "../Footer/Footer"

export default function SplashPage() {
  return (
    <div className="bg-guy-pattern bg-cover">
      <nav className="bg-gradient-to-r from-blue-joker via-red-joker to-green-joker h-20 grid grid-flow-col grid-cols-10 grid-rows-1 gap-x-3">
        <div className="col-start-5 col-end-5">
          <img
            style={{ height: "99%", width: "auto",}}
            alt="Laughs App logo"
            src="https://pairyopet.s3-us-west-1.amazonaws.com/pyp-logo-cropped.png"
          ></img>
        </div>
        <div className="col-start-6 col-end-6 text-4xl mt-5 pt-1">Laughs</div>
        <div className="h-1/2 text-xl text-center outline-black mt-4 pt-1 mr-4 col-start-9 col-end-10 hover:bg-white">
          <LoginFormModal />
        </div>
        <div className="h-1/2 text-xl text-center outline-black mt-4 pt-1 mr-4 col-start-10 col-end-10 hover:bg-white">
          <SignUpFormModal />
        </div>
      </nav>
      <div className="h-full grid grid-flow-col grid-cols-4 grid-rows-4">
        <h1 className="text-4xl col-start-1 col-end-2 row-start-1 row-end-2 p-1 m-1">
          Sharing jokes around the world
        </h1>
        <h2 className="text-lg col-start-1 col-end-2 row-start-2 row-end-3 p-1 m-1">
          Use Laughs and all its features for free, forever!
        </h2>
        <div className="col-start-2 col-end-5 row-start-1 row-end-4">
          {/* <img
            className="rounded-lg md:w-1/2"
            alt="Laughing Man"
            src="https://pairyopet.s3-us-west-1.amazonaws.com/laughing-man-holding-pen-in-meeting.jpg"
          ></img> */}
        </div>
      </div>
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
}
