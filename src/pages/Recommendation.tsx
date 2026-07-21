import './Recommendation.css'
import ComingSoonIcon from '../assets/comingSoon.svg'

const Recommendation = () => {
    return (
        <>
            <div className='r'>
                <img src={ComingSoonIcon}/>
                <div className='r-message'>Coming soon in a future update!</div>
            </div>
        </>
    )
}

export default Recommendation