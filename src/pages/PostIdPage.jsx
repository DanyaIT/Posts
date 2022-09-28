import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetching } from "../hooks/useFetching";
import PostService from "../API/PostService";
import MyLoader from "../Components/UI/Loader/MyLoader";

const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comm, setComm] = useState([]);
  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
  const responce = await PostService.getById(id);
    setPost(responce.data);
  });

  const [fetchCommPostById, CommisLoading, Commerror] = useFetching(async (id) => {
    const responce = await PostService.getCommByID(id);
      setComm(responce.data);
    });
  

  useEffect(() => {
    fetchPostById(params.id);
    fetchCommPostById(params.id);
  }, []);

  return (
    <div>
      <h1>Вы открыли пост номер {params.id}</h1>
      {isLoading ? (
        <MyLoader />
      ) : (
        <div>
          {post.id}. {post.title}
        </div>
      )}
      <h1>Комментарии</h1>
      {CommisLoading
      ? <MyLoader/>
      : <div>
        {comm.map((message)=>
          <div style = {{marginTop:'15px'}}>
            <h5>{message.email}</h5>
            <div>{message.body}</div>
          </div>
        )}
      </div>
      }
    </div>
  );
};

export default PostIdPage;
