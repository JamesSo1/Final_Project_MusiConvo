import { supabase } from "../client";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function AddPostPage() {
  const [title, setTitle] = useState(null);
  const [subtext, setSubtext] = useState(null);
  const [postPassword, setPostPassword] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubtextChange = (e) => {
    setSubtext(e.target.value);
  };

  const handlePostPasswordChange = (e) => {
    setPostPassword(e.target.value);
  };

  const handleImgUrlChange = (e) => {
    setImgUrl(e.target.value);
  };

  const handleVideoUrlChange = (e) => {
    setVideoUrl(e.target.value);
  };

  const createPost = async (e) => {
    e.preventDefault();
    if (title == null) {
      alert("Please enter a title!");
      return;
    }
    if (postPassword == null) {
      alert(
        "Please create a post password so you can edit or delete your post in the future!"
      );
      return;
    }

    await supabase
      .from("Posts")
      .insert({
        title: title,
        subtext: subtext,
        imgUrl: imgUrl,
        videoUrl: videoUrl,
        postPassword: postPassword,
      })
      .select();

    alert("Post successfully made!");
    window.location = "/";
  };
  return (
    <>
      <h2>
        Remember to make a post password to be able to update or delete your
        posts in the future!
      </h2>
      <form>
        <label htmlFor="name">Title: </label>
        <br />
        <input
          placeholder="Enter title..."
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleTitleChange}
        />
        <br />
        <br />

        <label htmlFor="subtext">Subtext: </label>
        <br />
        <textarea
          placeholder="Enter subtext..."
          id="subtext"
          name="subtext"
          value={subtext}
          onChange={handleSubtextChange}
          rows={4}
          cols={50}
        />
        <br />
        <br />

        <label htmlFor="postPassword">Post Password: </label>
        <br />
        <input
          placeholder="Enter post password..."
          type="text"
          id="postPassword"
          name="postPassword"
          value={postPassword}
          onChange={handlePostPasswordChange}
        />
        <br />
        <br />

        <label htmlFor="imgUrl">Image URL: </label>
        <br />
        <input
          placeholder="Enter an image URL..."
          type="text"
          id="imgUrl"
          name="imgUrl"
          value={imgUrl}
          onChange={handleImgUrlChange}
        />
        <br />
        <br />

        <label htmlFor="videoUrl">Video URL: </label>
        <br />
        <input
          placeholder="Enter A YouTube URL..."
          type="text"
          id="videoUrl"
          name="videoUrl"
          value={videoUrl}
          onChange={handleVideoUrlChange}
        />
        <br />
        <br />

        <input type="submit" value="Make Post" onClick={createPost} />
      </form>
      <br />
      <br />
      <Link to={"/"}>Go Back To Post Gallery</Link>
    </>
  );
}

export default AddPostPage;
