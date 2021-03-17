
const Footer = () => {

    return (
        <div className='py-1 absolute bottom-0 w-full h-16 text-xl bg-gradient-to-r from-blue-joker via-red-joker to-green-joker grid grid-flow-col grid-cols-10 grid-rows-1 gap-x-3'>
            <div className="col-start-5 col-end-5">
                <a  className="pt-4 round-xl hover:shadow-2xl" href='https://github.com/markhv-code/pair-yo-pet'>Github Repo</a>
            </div>
            <div className="col-start-9 col-end-10">
                <div className='footer-div__person mark'>
                    <a className='pt-4 hover:shadow-2xl' href='https://github.com/markhv-code'>MV</a>
                </div>
                <div>
                    <a className='hover:shadow-2xl' href='https://www.linkedin.com/in/mark-valdez-a50507108/'>MV</a>
                </div>
            </div>

        </div>
    )
}

export default Footer;