import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../client";
import "../App.css";

function PostCard({ id, createdAt, title, upvoteCount, downvoteCount }) {
  const dateObject = new Date(createdAt);
  const date = dateObject.toISOString().split("T")[0];
  const time = dateObject.toTimeString().split(" ")[0];

  return (
    <Link to={`/posts/${id}`}>
      <div className="card">
        <div className="post-time">
          Created on {date} at {time}
        </div>
        <div className="post-info">
          <b className="card-post-title">{title}</b>
          <br />
          <br />
          <Link to={`/deletepost/${id}`}>
            <button className="delete-post-button">Delete Post</button>
          </Link>
          <Link to={`/updatepost/${id}`}>
            <button className="update-post-button">Update Post</button>
          </Link>
        </div>
        <div className="votes">
          <span className="upvote-count">
            <b>{upvoteCount}</b> upvotes
          </span>
          <span className="downvote-count">
            <b>{downvoteCount}</b> downvotes
          </span>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
