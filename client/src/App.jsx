import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import { logo } from "./assets";
import { Home, CreatePost } from "./page"; // Ensure correct imports

const App = () => (
  <BrowserRouter>
    <Routes>

      {/* Routes with navigation */}
      <Route
        path="/*"
        element={
          <>
            {/* Navigation Bar */}
            <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4] shadow-sm">
              {/* Logo */}
              <Link to="/">
                <img src={logo} alt="logo" className="w-30 object-fill ms-auto h-auto -m-3" />
              </Link>

              {/* Create Post Button */}
              <Link
                to="/create-post"
                className="flex items-center bg-gradient-to-r from-[#6469ff] to-[#ff6b6b] text-white px-6 py-2 rounded-lg font-medium hover:from-[#5559ff] hover:to-[#ff5c5c] transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span className="mr-2">+</span> Create Post
              </Link>
            </header>

            {/* Main Content */}
            <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create-post" element={<CreatePost />} />
              </Routes>
            </main>
          </>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default App;
