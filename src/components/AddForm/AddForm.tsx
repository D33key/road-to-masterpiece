import { useState } from "react";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { addNewPost } from "../../redux/slices/postSlice";
import cl from "./AddForm.module.css";

const AddForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const dispatch = useAppDispatch();

    const handleAddButton = ({
        title,
        description,
    }: {
        title: string;
        description: string;
    }) => {
        dispatch(addNewPost({ title, description }));
        setDescription("");
        setTitle("");
    };

    return (
        <form className={cl.form}>
            <label htmlFor="title">Title</label>
            <input
                name="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="description">Description</label>
            <textarea
                name="description"
                rows={10}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button
                className={cl.btn}
                onClick={(e) => {
                    e.preventDefault();
                    handleAddButton({ title, description });
                }}
            >
                Add
            </button>
        </form>
    );
};

export default AddForm;
