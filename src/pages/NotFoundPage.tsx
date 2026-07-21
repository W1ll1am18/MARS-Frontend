import { Link } from 'react-router-dom'

const NotFoundPage = () => {
    return (
        <>
            <div>NotFoundPage</div>
            <Link to={"/"}>
                <button>Go back home</button>
            </Link>
        </>
    )
}

export default NotFoundPage