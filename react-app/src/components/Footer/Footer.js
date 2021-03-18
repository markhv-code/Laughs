
const Footer = () => {

    return (
        <div className='py-1 w-full h-16 text-xl bg-gradient-to-r from-blue-joker via-red-joker to-green-joker grid grid-flow-col grid-cols-10 grid-rows-1 gap-x-3'>
            <p>&#169; Mark Valdez</p>
            <div className="col-start-5 col-end-5">
                <a  className="pt-4 hover:shadow-2xl" href='https://github.com/markhv-code/pair-yo-pet'>Github Repo</a>
            </div>
            <div className='col-start-8 col-end-8'>
                <a className='pt-4 hover:shadow-2xl' href='https://github.com/markhv-code'>Github Profile</a>
            </div>
            <div className='col-start-9 col-end-9'>
                    <a className='pt-4 hover:shadow-2xl' href='https://www.linkedin.com/in/mark-valdez-a50507108/'>Linkedin</a>
            </div>
        </div>
    )
}

export default Footer;