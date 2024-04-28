import { supabase } from "../client";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../App.css";

function UpdatePostPage() {
  const [originalTitle, setOriginalTitle] = useState(null);
  const [originalSubtext, setOriginalSubtext] = useState(null);
  const [originalImgUrl, setOriginalImgUrl] = useState(null);
  const [originalVideoUrl, setOriginalVideoUrl] = useState(null);
  const [postPasswordGuess, setPostPasswordGuess] = useState("");

  const [title, setTitle] = useState(null);
  const [subtext, setSubtext] = useState(null);
  const [postPassword, setPostPassword] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);

  const { id } = useParams();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubtextChange = (e) => {
    setSubtext(e.target.value);
  };

  const handleImgUrlChange = (e) => {
    setImgUrl(e.target.value);
  };

  const handlePostPasswordChange = (e) => {
    setPostPassword(e.target.value);
  };

  const handleVideoUrlChange = (e) => {
    setVideoUrl(e.target.value);
  };

  const handlePostPasswordGuessChange = (e) => {
    setPostPasswordGuess(e.target.value);
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from("Posts")
          .select()
          .eq("id", id)
          .single();

        if (error) {
          console.error("Error fetching post:", error.message);
        } else {
          setOriginalTitle(data.title);
          setOriginalSubtext(data.subtext);
          setOriginalImgUrl(data.imgUrl);
          setOriginalVideoUrl(data.videoUrl);
        }
      } catch (err) {
        console.error("Error during fetch:", err.message);
      }
    };

    fetchPost();
  }, [id]);

  const updatePost = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("Posts")
      .select()
      .eq("id", id)
      .eq("postPassword", postPasswordGuess)
      .single();
    // Return true if the post with the given ID and password exists
    if (data !== null) {
      if (title == "") {
        alert("You need to have a title!");
        return;
      }
      if (postPassword == "") {
        alert("You need to have a post password!");
        return;
      }

      if (title != null) {
        await supabase
          .from("Posts")
          .update({
            title: title,
          })
          .eq("id", id);
      }
      if (subtext != null) {
        await supabase
          .from("Posts")
          .update({
            subtext: subtext,
          })
          .eq("id", id);
      }
      if (postPassword != null) {
        await supabase
          .from("Posts")
          .update({
            postPassword: postPassword,
          })
          .eq("id", id);
      }
      if (imgUrl != null) {
        await supabase
          .from("Posts")
          .update({
            imgUrl: imgUrl,
          })
          .eq("id", id);
      }
      if (videoUrl != null) {
        await supabase
          .from("Posts")
          .update({
            videoUrl: videoUrl,
          })
          .eq("id", id);
      }
      alert("Post successfully updated!");
      window.location = "/";
    } else {
      alert("Wrong Password! Try again!");
    }
  };

  return (
    <>
      <div className="old-post-characteristics">
        <h2>Title:</h2> {originalTitle}
        <br />
        <h2>Subtext:</h2>
        {originalSubtext}
        <br />
        <h2>Img Url:</h2> {originalImgUrl}
        <br />
        <h2>Video Url:</h2> {originalVideoUrl}
      </div>
      <br />
      <br />
      <hr></hr>
      <form>
        <h3>Enter new post details:</h3>
        <label htmlFor="title">Title: </label>
        <br />
        <input
          placeholder="Enter new title..."
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
          placeholder="Enter new subtext..."
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
          placeholder="Enter new password..."
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
          placeholder="Enter new image URL..."
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
          placeholder="Enter new video URL..."
          type="text"
          id="videoUrl"
          name="videoUrl"
          value={videoUrl}
          onChange={handleVideoUrlChange}
        />
        <br />
        <br />
        <h3>
          To finish updating the post titled, "{originalTitle}", enter the
          original post passowrd:{" "}
        </h3>
        <label htmlFor="postPasswordGuess">
          <b>Post Password:</b>
        </label>
        <br />
        <input
          className="post-password-guess-input"
          type="password"
          id="postPasswordGuess"
          name="postPasswordGuess"
          value={postPasswordGuess}
          onChange={handlePostPasswordGuessChange}
        />
        <input
          className="post-password-guess-submit"
          type="submit"
          value="Update Post"
          onClick={updatePost}
        />
      </form>
      <br />
      <br />
      <Link to={`/posts/${id}`}>Go Back To Post</Link>
      <br />
      <br />
    </>
  );
}
export default UpdatePostPage;
