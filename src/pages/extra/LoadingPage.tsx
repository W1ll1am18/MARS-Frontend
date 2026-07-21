import './LoadingPage.css'

function LoadingPage() {
    return (
        <div className='lp'>
            <div className='lp-spinner' />
            <div className='lp-message'>Loading...</div>
            <p>Please give us a moment</p>
        </div>
    )
}

export default LoadingPage