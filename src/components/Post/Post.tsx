import { useState } from "react";
import Button from "../ui/Button/Button";
import cl from "./Post.module.css";

interface IPost {
    title: string;
    description: string;
    date: Date;
}

const Post = (props: IPost) => {
    const date: string = props.date.toLocaleString();
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState<string>(props.description);

    const handleEditing = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setDescription(props.description);
        setIsEditing(false);
    };

    const handleSave = () => {
        // TODO: ADD HERE UPDATE FOR API !!!
        setIsEditing(false);
    };

    return (
        <div className={cl.wrapper}>
            <h2 className={cl.title}>{props.title}</h2>
            {isEditing ? (
                <div>
                    <textarea
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        className={cl.description}
                    />
                    <div className={cl.postEdition}>
                        <div className={cl.btnWrapper}>
                            <Button title="Save" action={handleSave} />
                            <Button
                                title="Cancel"
                                action={handleCancel}
                                type="danger"
                            />
                        </div>
                        <p className={cl.date}>{date}</p>
                    </div>
                </div>
            ) : (
                <>
                    <div className={cl.description}>{description}</div>
                    <div className={cl.postEdition}>
                        <div className={cl.btnWrapper}>
                            <Button title="Edit" action={handleEditing} />
                            <Button title="Delete" type="danger" />
                        </div>
                        <p className={cl.date}>{date}</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default Post;
