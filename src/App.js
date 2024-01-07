import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import CreatePost from "./pages/post/CreatePost";
import Header from "./components/Header/Header";
import Register from "./pages/auth/register/Register";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import SinglePost from "./pages/post/SinglePost";
import EditPost from "./pages/post/EditPost";
import MyPosts from "./pages/post/MyPosts";
import AllPosts from "./pages/post/AllPosts";
import NotFound from "./pages/Not-Found/NotFound";
function App() {
  const queryClient = new QueryClient();

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ToastContainer />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/single-post/:postid" element={<SinglePost />} />
            <Route path="/edit-post/:postid" element={<EditPost />} />
            <Route path="/userposts" element={<MyPosts />} />
            <Route path="/posts" element={<AllPosts />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;

//6597ef863d2aa2b0e04fd7ab
