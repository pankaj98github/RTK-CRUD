import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getPost, setEdit, updatePost } from "../redux/features/PostSlice";
import Spinner from "./Spinner";

const Posts = () => {
  const [id, setId] = useState();
  const [textBody, setTextBody] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, post, body, edit } = useSelector((state) => ({ ...state.app }));

  useEffect(() => {
    if(body){
      setTextBody(body);
    }
  },[body])

  //fetch function
  const handleFetchData = (e) => {
    e.preventDefault();
    if (!id) {
      window.alert("Please Provide Post ID");
    } else {
      dispatch(getPost({ id }));
      setId("");
    }
  };

  //delete function
  const handleDelete = ({id}) => {
    dispatch(deletePost({id:post[0].id}))
    window.alert("Post Deleted!")
  }
  return (
    <>
      <div className="row mt-5 d-flex align-items-center justify-content-center">
        <div className="col-md-8">
          <form>
            <div className="mb-3">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label"
                style={{ fontSize: "2.5rem"}}
              >
                Search By ID
              </label>
              <input
                type="number"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <button
              type="submit"
              onClick={handleFetchData}
              className="btn btn-primary"
            >
              Fetch Post
            </button>
            <button
              type="submit"
              onClick={() => navigate("/createPost")}
              className="btn btn-warning ms-4"
            >
              Create Post
            </button>
          </form>
        </div>
      </div>
      <div className="container">
        {loading ? (
          <Spinner />
        ) : (
          <>
            {post.length > 0 && (
              <>
                <div className="card mt-5">
                  <div className="card-body">
                    <h5 className="card-title">{post[0].title}</h5>
                    {edit ? (
                      <>
                        <textarea
                          className="form-control mt-4"
                          value={textBody}
                          onChange={(e) => setTextBody(e.target.value)}
                          id="floatingTextarea"
                          defaultValue={""}
                        />
                        <div className="d-flex align-items-end justify-content-end mt-5">
                          <button
                            className="btn btn-success"
                            onClick={() => {
                              dispatch(
                                updatePost({
                                  id: post[0].id,
                                  title: post[0].title,
                                  body: textBody,
                                })
                              );
                              dispatch(setEdit({ edit: false, body: "" }));
                            }}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-danger ms-4"
                            onClick={() =>
                              dispatch(setEdit({ edit: false, body: "" }))
                            }
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="card-text">{post[0].body}</p>
                      </>
                    )}
                    {!edit && (
                      <div className="d-flex align-items-end justify-content-end">
                        <button
                          className="btn btn-primary"
                          onClick={() =>
                            dispatch(
                              setEdit({ edit: true, body: post[0].body })
                            )
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger ms-4"
                          onClick={handleDelete}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Posts;
