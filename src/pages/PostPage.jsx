import { supabase } from "../client";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../App.css";

function PostPage() {
  const { id } = useParams();
  const [createdAt, setCreatedAt] = useState("");
  const [title, setTitle] = useState("");
  const [subtext, setSubtext] = useState(null);
  const [upvoteCount, setUpvoteCount] = useState(0);
  const [downvoteCount, setDownvoteCount] = useState(0);
  const [imgUrl, setImgUrl] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const upvoteButtonClassName = isLiked ? "upvoted-button" : "upvote-button";
  const downvoteButtonClassName = isDisliked
    ? "downvoted-button"
    : "downvote-button";

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
          setCreatedAt(data.createdAt);
          setTitle(data.title);
          setSubtext(data.subtext);
          setUpvoteCount(data.upvoteCount);
          setDownvoteCount(data.downvoteCount);
          setImgUrl(data.imgUrl);
          setComments(data.comments);
          if (data.videoUrl != null) {
            //Convert the normal YouTube URL into an embedded YouTube URL
            const videoId = data.videoUrl.split("v=")[1];
            console.log(data.videoUrl);
            const embedUrl = `https://www.youtube.com/embed/${videoId}`;
            console.log(embedUrl);
            setVideoUrl(embedUrl);
          }
        }
      } catch (err) {
        console.error("Error during fetch:", err.message);
      }
    };

    fetchPost();
  }, [id]);

  const updateUpvoteCount = async () => {
    //This first if makes sure that the "like" and "dislike" options are mutually exclusive
    if (isDisliked) {
      setIsDisliked(false);
      await supabase
        .from("Posts")
        .update({ downvoteCount: downvoteCount - 1 })
        .eq("id", id);

      setDownvoteCount((prevCount) => prevCount - 1);
    }
    if (!isLiked) {
      await supabase
        .from("Posts")
        .update({ upvoteCount: upvoteCount + 1 })
        .eq("id", id);

      setUpvoteCount((prevCount) => prevCount + 1);

      setIsLiked(true);
    } else {
      await supabase
        .from("Posts")
        .update({ upvoteCount: upvoteCount - 1 })
        .eq("id", id);

      setUpvoteCount((prevCount) => prevCount - 1);

      setIsLiked(false);
    }
  };

  const updateDownvoteCount = async () => {
    //This first if makes sure that the "like" and "dislike" options are mutually exclusive
    if (isLiked) {
      setIsLiked(false);
      await supabase
        .from("Posts")
        .update({ upvoteCount: upvoteCount - 1 })
        .eq("id", id);

      setUpvoteCount((prevCount) => prevCount - 1);
    }
    if (!isDisliked) {
      await supabase
        .from("Posts")
        .update({ downvoteCount: downvoteCount + 1 })
        .eq("id", id);

      setDownvoteCount((prevCount) => prevCount + 1);

      setIsDisliked(true);
    } else {
      await supabase
        .from("Posts")
        .update({ downvoteCount: downvoteCount - 1 })
        .eq("id", id);

      setDownvoteCount((prevCount) => prevCount - 1);

      setIsDisliked(false);
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const createComment = async (e) => {
    e.preventDefault();

    if (comment.length == 0) {
      alert("Please enter a comment");
      return;
    }

    let existingComments;

    if (comments != null) {
      existingComments = [...comments];
    } else {
      existingComments = [];
    }

    existingComments.push(comment);

    setComments(existingComments);

    const { data, error } = await supabase
      .from("Posts")
      .update({ comments: existingComments })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error updating data:", error.message);
    } else {
      console.log("Data updated successfully:", data);
      setComment("");
    }
  };

  return (
    <>
      <div className="page-post-title">
        <b>{title}</b>
      </div>
      <p>{subtext}</p>
      {imgUrl && <img className="post-img" src={imgUrl} alt="Post picture" />}
      <br />
      {videoUrl && (
        <iframe
          className="post-vid"
          width="560"
          height="315"
          src={videoUrl}
          title="YouTube video player"
          allowFullScreen
        ></iframe>
      )}
      <div className="post-vote-counts">
        <span className="post-upvote-count">
          <b>{upvoteCount}</b> upvotes
        </span>{" "}
        <span className="post-downvote-count">
          <b>{downvoteCount}</b> downvotes
        </span>
      </div>
      <button
        className={upvoteButtonClassName}
        onClick={() => updateUpvoteCount()}
      >
        Upvote
      </button>
      <button
        className={downvoteButtonClassName}
        onClick={() => updateDownvoteCount()}
      >
        Downvote
      </button>
      <br />
      <br />
      <Link to={`/updatepost/${id}`}>
        <button className="update-post-button">Update Post</button>
      </Link>
      <Link to={`/deletepost/${id}`}>
        <button className="delete-post-button">Delete Post</button>
      </Link>
      <div className="comments-section-label">Comments:</div>
      <div className="comments-container">
        <ul className="comments-section">
          {comments &&
            comments.map((comment, index) => (
              <li key={index} className="comment">
                {comment}
              </li>
            ))}
        </ul>
        <form className="comment-form">
          <input
            className="comment-textbox"
            type="text"
            placeholder="Leave a comment..."
            value={comment}
            onChange={handleCommentChange}
          ></input>
          <input
            className="comment-submit-btn"
            type="submit"
            value="Submit"
            onClick={createComment}
          />
        </form>
      </div>
    </>
  );
}

export default PostPage;
