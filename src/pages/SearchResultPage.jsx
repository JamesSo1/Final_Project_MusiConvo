import { useEffect, useState } from "react";
import { supabase } from "../client";
import { useParams, Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import "../App.css";

function SearchResultPage() {
  const [posts, setPosts] = useState([]);
  const [sort, setSort] = useState("");
  const { query } = useParams();

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
          const filteredPosts = data.filter((post) =>
            post.title.toLowerCase().includes(query.toLowerCase())
          );
          setPosts(filteredPosts);
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
        const { data, error } = await supabase
          .from("Posts")
          .select("")
          .order("createdAt", { ascending: false });

        if (error) {
          console.error("Error fetching posts:", error.message);
        } else {
          const filteredPosts = data.filter((post) =>
            post.title.toLowerCase().includes(query.toLowerCase())
          );
          setPosts(filteredPosts);
        }
      };
    } else {
      fetchPosts = async () => {
        const { data, error } = await supabase
          .from("Posts")
          .select("")
          .order("upvoteCount", { ascending: false });

        if (error) {
          console.error("Error fetching posts:", error.message);
        } else {
          const filteredPosts = data.filter((post) =>
            post.title.toLowerCase().includes(query.toLowerCase())
          );
          setPosts(filteredPosts);
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
      <h2>See what people are talking about!</h2>
      <div className="post-container">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              createdAt={post.createdAt}
              title={post.title}
              upvoteCount={post.upvoteCount}
              downvoteCount={post.downvoteCount}
            />
          ))
        ) : (
          <h3>Doesn't seem to be any results...</h3>
        )}
      </div>
    </div>
  );
}

export default SearchResultPage;
