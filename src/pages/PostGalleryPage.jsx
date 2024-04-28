import { useEffect, useState } from "react";
import { supabase } from "../client";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import "../App.css";

function PostGalleryPage() {
  const [posts, setPosts] = useState([]);
  const [sort, setSort] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from("Posts")
          .select("")
          .order("createdAt", { ascending: false });

        if (error) {
          console.error("Error fetching posts:", error.message);
        } else {
          setPosts(data);
        }
      } catch (err) {
        console.error("Error during fetch:", err.message);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    let fetchPosts;
    if (sort == "most recent") {
      fetchPosts = async () => {
        try {
          const { data, error } = await supabase
            .from("Posts")
            .select("")
            .order("createdAt", { ascending: false });

          if (error) {
            console.error("Error fetching posts:", error.message);
          } else {
            setPosts(data);
          }
        } catch (err) {
          console.error("Error during fetch:", err.message);
        }
      };
    } else {
      fetchPosts = async () => {
        try {
          const { data, error } = await supabase
            .from("Posts")
            .select("")
            .order("upvoteCount", { ascending: false });

          if (error) {
            console.error("Error fetching posts:", error.message);
          } else {
            setPosts(data);
          }
        } catch (err) {
          console.error("Error during fetch:", err.message);
        }
      };
    }

    fetchPosts();
  }, [sort]);

  return (
    <div>
      <button
        className="most-recent-btn"
        onClick={() => setSort("most recent")}
      >
        Most Recent
      </button>
      <button className="most-liked-btn" onClick={() => setSort("most liked")}>
        Most Liked
      </button>
      <h2>See what the music lovers are talking about!</h2>
      <div className="post-container">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            createdAt={post.createdAt}
            title={post.title}
            upvoteCount={post.upvoteCount}
            downvoteCount={post.downvoteCount}
          />
        ))}
      </div>
    </div>
  );
}

export default PostGalleryPage;
