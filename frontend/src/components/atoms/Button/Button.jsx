import "./Button.css";

const Button = ({text, isLoading, btnClick}) => {
  return (
    <button className={!isLoading? 'btn btn-primary': 'btn btn-loading'} onClick={btnClick}>
      { !isLoading ? <span>{text || 'Button'}</span> : <span className="loader"></span>}
    </button>
  );
};

export default Button;
