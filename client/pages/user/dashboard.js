import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "./../../components/Layout/index.js";
import UserRoute from "../../components/routes/UserRoute.js";
import CreatePost from "../../components/Post/CreatePost.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostList from "../../components/Post/PostList.js";
import PeopleComp from "@/components/PeopleComp.js";
const dashboard = () => {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [image, setImage] = useState({});
  const [people, setPeople] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [state] = useContext(UserContext);
  const router = useRouter();
  //post handler

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    console.log([...formData]);
    setUploading(true);
    try {
      const { data } = await axios.post("/upload-image", formData);
      // console.log("Image Upload", data);
      setUploading(false);
      setImage({
        url: data.url,
        public_id: data.public_id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //suggest People
  const findPeople = async () => {
    try {
      const { data } = await axios.get("/find-people");
      setPeople(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (state && state.token) {
      fetchUserPosts();
    }
  }, [state && state.token]);

  const fetchUserPosts = async () => {
    try {
      const { data } = await axios.get("/user-post");
      console.log(data);
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/createpost", { content, image });
      // console.log("content",data)
      fetchUserPosts();
      toast.success("Post Created!");
      setImage("");
      setContent("");
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
    console.log(content);
    setContent("");
  };

  const deleteHandler = async (post) => {
    try {
      const answer = window.confirm("Are You Sure ? ");
      if (!answer) return;
      const { data } = await axios.delete(`/delete-post/${post._id}`);
      toast.success("Post Deleted!");
      fetchUserPosts();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <UserRoute>
        <div className="row">
          <div className="col-md-8">
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <CreatePost
              content={content}
              setContent={setContent}
              handlePostSubmit={handlePostSubmit}
              handleImage={handleImage}
              uploading={uploading}
              image={image}
            />
            <br />
            <PostList posts={posts} deleteHandler={deleteHandler} />
          </div>
          <div className="col-md-4">
            {/* <div>{JSON.stringify(people,null,4)}</div> */}
            <PeopleComp people={people}></PeopleComp>
          </div>
        </div>
      </UserRoute>
    </Layout>
  );
};

export default dashboard;
