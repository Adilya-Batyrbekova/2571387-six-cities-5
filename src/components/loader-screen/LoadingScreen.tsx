import './loading-screen.css';

function LoadingScreen(): JSX.Element {
  return (
    <div className="page-loader">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
}

export default LoadingScreen;