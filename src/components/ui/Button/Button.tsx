import cl from "./Button.module.css";

interface IButton {
    title: string;
    type?: string;
    action?: () => void;
}

const Button = ({ title, type, action }: IButton) => {
    return (
        <button onClick={action} className={`${cl.btn} ${type && cl.delete}`}>
            {title}
        </button>
    );
};

export default Button;
