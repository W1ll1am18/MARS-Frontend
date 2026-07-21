import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFoundPage.css'
import NotFoundIcon from '../../assets/notFound.svg'

function NotFoundPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <>
            <div className='nf'>
                <img src={NotFoundIcon} />
                <div className='nf-message'>Page does not exist</div>
                <p>Redirecting to home page...</p>
            </div>
        </>
    )
}

export default NotFoundPage