import { useEffect } from "react";
import "./App.css";
import AddForm from "./components/AddForm/AddForm";
import Post from "./components/Post/Post";
import { useAppDispatch, useAppSelector } from "./hooks/redux-hooks";
import { fetchPost } from "./redux/slices/postSlice";

interface IPosts {
    id: number;
    title: string;
    description: string;
}

function App() {
    const posts = useAppSelector(state => state.post.posts);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchPost());
    }, [dispatch]);

    return (
        <div className="App">
            <div className="addForm">
                <AddForm />
            </div>
            <div className="posts">
                {posts.map((post) => (
                    <Post
                        id={post.id.toString()}
                        key={post.title}
                        title={post.title}
                        description={post.description}
                        date={new Date()}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
