import { useMutation, useQuery } from "@apollo/client";
import { getAllPost } from "./graphQl/query";
import { CREATE_POST, DELETE_POST, UPDATE_POST } from "./graphQl/mutation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_POSTDATA,
  DELETE_POSTDATA,
  FETCH_POSTDATA,
  UPDATE_POSTDATA,
} from "./redux/constants";

function App() {
  const { postsData, loading, error } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [updationId, setUpdationId] = useState(null);

  const { data, refetch } = useQuery(getAllPost);

  const handleAddPost = async () => {
    title && description
      ? dispatch({ type: ADD_POSTDATA, payload: { title, description } })
      : alert("enter something basted");

    await refetch();
    fetchData();
  };

  const handleDeletePost = async (id) => {
    dispatch({ type: DELETE_POSTDATA, payload: id });
    fetchData();

    // await refetch();
    // fetchData();
    dispatch({ type: FETCH_POSTDATA });

  };

  const handleUpdatePost = (data) => {
    setIsUpdate(true);
    setUpdationId(data.id);
    setTitle(data.title);
    setDescription(data.description);
  };

  const handleUpdate = async () => {
    dispatch({
      type: UPDATE_POSTDATA,
      payload: {
        id: updationId,
        title,
        description,
      },
    });

    setIsUpdate(false);
    await refetch();
  };

  function fetchData() {
    dispatch({ type: FETCH_POSTDATA });
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <h2>Loading...</h2>;
  if (error) console.log(error);

  if (data) console.log({ data: data, postData: postsData });

  return (
    <section>
      {data?.getPosts?.map((data) =>
        !(isUpdate && data.id === updationId) ? (
          <div key={data.id}>
            <h1> data-title : {data.title} </h1>
            <h1> Data-Description : {data.description} </h1>
            <button
              onClick={() => {
                handleDeletePost(data.id);
              }}
            >
              Delete
            </button>
            <button
              onClick={() => {
                handleUpdatePost(data);
              }}
            >
              Update
            </button>
            <br />
          </div>
        ) : (
          <aside>
            <input
              type="text"
              defaultValue={data.title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <input
              type="text"
              defaultValue={data.description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <button onClick={handleUpdate}>Update</button>
          </aside>
        )
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddPost();
        }}
      >
        <input
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Enter the title"
        />
        <input
          type="text"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          placeholder="Enter the Description"
        />
        <button type="submit">Add Post </button>
      </form>
    </section>
  );
}

export default App;
