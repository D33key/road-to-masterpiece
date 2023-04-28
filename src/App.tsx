import './App.css';
import Post from './components/Post/Post';

function App() {
  return (
      <div className="App">
          <Post title="Example" description="Bla-bla" date={new Date()} />
          <Post title="Example" description="Bla-bla" date={new Date()} />
          <Post title="Example" description="Bla-bla" date={new Date()} />
          <Post
              title="Example"
              description="Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bla Bla-bl"
              date={new Date()}
          />
          <Post title="Example" description="Bla-bla" date={new Date()} />
          <Post title="Example" description="Bla-bla" date={new Date()} />
      </div>
  );
}

export default App;
