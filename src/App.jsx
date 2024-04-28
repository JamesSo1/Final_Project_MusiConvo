import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import PostGalleryPage from "./pages/PostGalleryPage";
import AddPostPage from "./pages/AddPostPage";
import PostPage from "./pages/PostPage";
import UpdatePostPage from "./pages/UpdatePostPage";
import DeletePostPage from "./pages/DeletePostPage";
import SearchResultPage from "./pages/SearchResultPage";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<PostGalleryPage />} />
        <Route path="/addpost" element={<AddPostPage />} />
        <Route path="/search/:query" element={<SearchResultPage />} />
        <Route path="/deletepost/:id" element={<DeletePostPage />} />
        <Route path="/updatepost/:id" element={<UpdatePostPage />} />
        <Route path="/posts/:id" element={<PostPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
