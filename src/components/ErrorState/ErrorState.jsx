import "./ErrorState.css";

const ErrorState = ({ message }) => {
  return (
    <div className="error-container">
      <h2>Something went wrong</h2>
      <p>{message}</p>
    </div>
  );
};

export default ErrorState;
