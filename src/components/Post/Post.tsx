import Button from "../ui/Button/Button";
import cl from "./Post.module.css";

interface IPost {
    title: string;
    description: string;
    date: Date;
}

const Post = (props: IPost) => {
    const date = props.date.toLocaleString();

    return (
        <div className={cl.wrapper}>
            <h2 className={cl.title}>{props.title}</h2>
            <p className={cl.description}>{props.description}</p>
            <div className={cl.postEdition}>
                <div className={cl.btnWrapper}>
                    <Button title="Edit" />
                    <Button title="Delete" action="delete" />
                </div>
                <p className={cl.date}>{date}</p>
            </div>
        </div>
    );
};

export default Post;
