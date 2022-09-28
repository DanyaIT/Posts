import React, { useEffect, useRef} from "react";
import '../styles/style.css';
import {usePosts} from '../hooks/usePosts';
import {useFetching} from '../hooks/useFetching'
import PostService from '../API/PostService';
import {getPageCount} from '../utils/pages';
import MyButton from '../Components/UI/button/MyButton';
import MyModal from '../Components/UI/MyModal/MyModal';
import PostForm from '../Components/PostForm';
import PostFilter from '../Components/PostFilter';
import MyLoader from '../Components/UI/Loader/MyLoader';
import PostList from '../Components/PostList';
import Pagination from '../Components/UI/pagination/Pagination';
import { useObserver } from "../hooks/useObserver";
import MySelect from "../Components/UI/select/MySelect";

function Posts() {
  const [posts, setPosts] = React.useState([]);
  const [filter, setFilter] = React.useState({ sort: "", query: "" });
  const [modal, setModal] = React.useState(false);
  const [totalPages, setTotalPages] = React.useState(0);
  const [limit, setLimit] = React.useState(10);
  const [pages, setPages] = React.useState(1);
  const serchedAndSortedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();


  const [fetchPosts, isPostLoading, PostError] = useFetching(
    async (limit, pages) => {
      const responce = await PostService.getAll(limit, pages);
      setPosts([...posts, ...responce.data]);
      const totalCount = responce.headers["x-total-count"];
      setTotalPages(getPageCount(totalCount, limit));
    }
  );

useObserver(lastElement, pages<totalPages, isPostLoading, ()=>{
  setPages(pages + 1)
} )
  

  useEffect(() => {
    fetchPosts(limit, pages);
  }, [pages,limit]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const changePage = (pages) => {
    setPages(pages);
  
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className="App">
      <MyButton style={{ marginTop: "20px" }} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: "15px 0px" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      <MySelect
      value={limit}
      defaultValue = {'Количесвто элементов на странице'}
      onChange = {(value)=> setLimit(value)}
      options = {[
        {value: 5, name: '5'},
        {value: 10, name: '10'},
        {value: 25, name: '25'},
        {value: -1, name: 'Показать все'},
      ]}
      />
      {PostError && <h1>Произошла ошибка {PostError}</h1>}
      <PostList
          remove={removePost}
          posts={serchedAndSortedPosts}
          title="Посты по JS"
        />
        <div ref = {lastElement}/>
      {isPostLoading &&     
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}><MyLoader /></div>
      }
      <Pagination
        pages={pages}
        totalPages={totalPages}
        changePage={changePage}
      />
    </div>
  );
}
export default Posts;
