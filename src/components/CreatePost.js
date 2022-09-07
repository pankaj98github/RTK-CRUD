import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { createPost } from "../redux/features/PostSlice";
import Spinner from "./Spinner";

const CreatePost = () => {
  const [values, setValues] = useState({ title: "", body: "" });
  const [showPost, setShowPost] = useState(false)
  const {loading, post} = useSelector(state => ({...state.app}));
  const { title, body } = values;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //handle post function
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost({values}));
    setValues({title:"", body:""});
    setShowPost(true);
  };

  //handle createpost function
  const showCreatedPost = () => {
    return (
      <>
        {loading ? (
          <Spinner />
        ) : (
          <div className="card mt-5">
            <div className="card-body">
              <h5 className="card-title">{post[0].title}</h5>
              <p className="card-text">{post[0].body}</p>
            </div>
          </div>
        )}
      </>
    );
  }
  return (
    <div>
      <form>
        <h1 className="text-center mt-5" style={{backgroundColor:"black", color:"white"}}>Create Post</h1>
          <div className="mb-3 mt-5 p-3">
            <input
              type="text"
              value={title}
              onChange={(e) => setValues({ ...values, title: e.target.value })}
              placeholder="Enter post title"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="form-floating">
            <textarea
              className="form-control"
              value={body}
              onChange={(e) => setValues({ ...values, body: e.target.value })}
              placeholder="Leave a comment here"
              id="floatingTextarea"
              defaultValue={""}
            />
            <label htmlFor="floatingTextarea">Add post description</label>
          </div>
          <div className="mt-5 d-flex align-items-end justify-content-end">
            <button onClick={() => navigate("/")} className="btn btn-primary">
              Go to Home
            </button>
            <button type="submit"
            onClick={handleSubmit}
            className="btn btn-success ms-4">
              Submit
            </button>
          </div>
      </form>
      <div className="mt-5">
        {showPost && <div>{showCreatedPost()}</div>}
      </div>
    </div>
  );
};

export default CreatePost;
