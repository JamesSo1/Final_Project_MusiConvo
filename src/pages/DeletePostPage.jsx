import { supabase } from "../client";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../App.css";

function DeletePostPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [postPasswordGuess, setPostPasswordGuess] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("Posts")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching post:", error.message);
      } else {
        setTitle(data.title);
      }
    };

    fetchPost();
  }, [id]);

  const checkGuess = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("Posts")
      .select()
      .eq("id", id)
      .eq("postPassword", postPasswordGuess)
      .single();
    // Return true if the post with the given ID and password exists
    if (data !== null) {
      await supabase.from("Posts").delete().eq("id", id);
      window.location = "/";
    } else {
      alert("Wrong Password! Try again!");
    }

    if (error) {
      console.error("Error fetching post:", error.message);
    }
  };

  const handlePostPasswordGuessChange = (e) => {
    setPostPasswordGuess(e.target.value);
  };

  return (
    <>
      <h1>To delete the post titled, "{title}", enter the post password</h1>
      <h2>(Note: Once deleted, the post will be gone forever!)</h2>
      <label htmlFor="postPasswordGuess">
        <b>Post Password:</b>
      </label>
      <form>
        <input
          className="post-password-guess-input"
          placeholder="Enter password here..."
          type="password"
          id="postPasswordGuess"
          name="postPasswordGuess"
          value={postPasswordGuess}
          onChange={handlePostPasswordGuessChange}
        />
        <input
          className="post-password-guess-submit"
          type="submit"
          value="Delete Post"
          onClick={checkGuess}
        />
      </form>
      <br />
      <Link to={`/posts/${id}`}>Go Back To Post</Link>
    </>
  );
}

export default DeletePostPage;
