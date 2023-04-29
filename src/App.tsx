import { useEffect, useState } from "react";
import "./App.css";
import AddForm from "./components/AddForm/AddForm";
import Post from "./components/Post/Post";
import { useAppDispatch } from "./hooks/redux-hooks";
import { fetchPost, postActions } from "./redux/slices/postSlice";

interface IPosts {
    id: number;
    title: string;
    description: string;
}

function App() {
    const dispatch = useAppDispatch();

    const [posts, setPosts] = useState<IPosts[]>([]);

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
