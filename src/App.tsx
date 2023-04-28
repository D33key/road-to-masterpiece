import { useEffect, useState } from "react";
import "./App.css";
import AddForm from "./components/AddForm/AddForm";
import Post from "./components/Post/Post";

interface IPosts {
    id: number;
    title: string;
    description: string;
}

async function fetchPost(): Promise<IPosts[]> {
    const response = await fetch("http://localhost:3001/posts");
    const data = await response.json();

    return data;
}

function App() {
    const [posts, setPosts] = useState<IPosts[]>([]);

    useEffect(() => {
        const data = fetchPost();
        data.then((post) => {
            setPosts(post);
        });
    }, []);

    return (
        <div className="App">
            <div className="addForm">
                <AddForm />
            </div>
            <div className="posts">
                {posts.map((post) => (
                    <Post key={post.title} title={post.title} description={post.description} date={new Date()}/>
                ))}
            </div>
        </div>
    );
}

export default App;
