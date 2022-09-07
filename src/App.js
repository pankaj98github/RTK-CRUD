import { Routes, Route } from "react-router-dom";
import CreatePost from "./components/CreatePost";
import Posts from "./components/Posts";

function App() {
  return (
    <>
      <div className="container">
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/createpost" element={<CreatePost />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
