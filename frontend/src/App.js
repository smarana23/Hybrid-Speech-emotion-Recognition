// import { HashRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import RecordEmotion from "./pages/RecordEmotion";
// import Dashboard from "./pages/Dashboard";
// import History from "./pages/History";
// import { EmotionProvider } from "./context/EmotionContext";
// function App() {
//   return (
//     <EmotionProvider>
//       {" "}
//       <HashRouter>
//         {" "}
//         <Navbar />{" "}
//         <Routes>
//           {" "}
//           <Route path="/" element={<Home />} />{" "}
//           <Route path="/record" element={<RecordEmotion />} />{" "}
//           <Route path="/dashboard" element={<Dashboard />} />{" "}
//           <Route path="/history" element={<History />} />{" "}
//         </Routes>{" "}
//       </HashRouter>{" "}
//     </EmotionProvider>
//   );
// }
// export default App;



import { HashRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RecordEmotion from "./pages/RecordEmotion";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "./Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import { EmotionProvider } from "./context/EmotionContext";

function App() {


  return (
    <EmotionProvider>
      <HashRouter>

        {/* ✅ Navbar only AFTER login */}
        

        <Routes>

          {/* 🔥 First page = Signup */}
          <Route path="/" element={<Signup />} />
<Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />

<Route
  path="/home"
  element={
    <ProtectedRoute>
      <Layout>
        <Home />
      </Layout>
    </ProtectedRoute>
  }
/>

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Layout>
        <Dashboard />
      </Layout>
    </ProtectedRoute>
  }
/>

<Route
  path="/record"
  element={
    <ProtectedRoute>
      <Layout>
        <RecordEmotion />
      </Layout>
    </ProtectedRoute>
  }
/>

<Route
  path="/history"
  element={
    <ProtectedRoute>
      <Layout>
        <History />
      </Layout>
    </ProtectedRoute>
  }/>

        </Routes>
      </HashRouter>
    </EmotionProvider>
  );
}

export default App;