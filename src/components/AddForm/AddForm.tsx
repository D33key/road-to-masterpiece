import cl from "./AddForm.module.css";

const AddForm = () => {
    return (
        <form className={cl.form}>
            <label htmlFor="title">Title</label>
            <input name="title" type="text" />
            <label htmlFor="description">Description</label>
            <textarea name="description" rows={10}/>
            <button className={cl.btn}>Add</button>
        </form>
    );
};

export default AddForm;


