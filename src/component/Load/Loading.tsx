import './Loading.css';

function LoadingSpinner() {
    return (
        <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Chargement...</p>
        </div>
    );
}

export default LoadingSpinner;