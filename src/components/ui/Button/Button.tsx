import cl from "./Button.module.css";

interface IButton {
    title: string;
    action?: string;
}

const Button = ({ title, action }: IButton) => {
    return (
        <button className={`${cl.btn} ${action && cl.delete}`}>{title}</button>
    );
};

export default Button;
