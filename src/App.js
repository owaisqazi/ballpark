import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Component/Layout/Layout";
// import Home from "./Pages/Home/Home";
import Contact from "./Pages/ContactUs/ContactUs";
import Service from "./Pages/Service/Service";
import Notfound from "./Pages/Notfound";
import ScrollToTop from "./Pages/ScrollToTop";
import Profile from "./Pages/Profile/Profile";
import NewProject from "./Pages/NewProject/NewProject";
import ProjectDrawing from "./Pages/ProjectDrawing/ProjectDrawing";
import CostDrawing from "./Pages/Costdata/CostDrawing";
import ResultDrawing from "./Pages/Costdata/ResultDrawing";
import Ballpark from "./Pages/Ballpark2.0/Ballpark";
import NavigatingPark from "./Pages/NavigatingPark/NavigatingPark";
import StartQuote from "./Pages/StartQuote/StartQuote";
import PostProject from "./Pages/PostProject/PostProject";
import Ballparkpicture from "./Pages/Ballparkpicture/Ballparkpicture";
import ResulteData from "./Pages/ResulteData/ResulteData";
import Offtheshelf from "./Pages/Offtheshelf/Offtheshelf";
import LoginForm from "./Auth/LoginForm";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2000); // 5-second loader
    return () => clearTimeout(timeout); // Cleanup timeout on unmount
  }, []);

  if (loading) {
    return <><div className="bg-white"/></>; // Replace with your custom loader
  }
  return (
    <>
      <BrowserRouter>
        <ScrollToTop /> {/* Add the ScrollToTop component here */}
        <Routes>
          {token ? (
            <>
              <Route
                path="/"
                element={
                  <Layout>
                    <Service />
                  </Layout>
                }
              />
              <Route
                path="/profile"
                element={
                  <Layout>
                    <Profile />
                  </Layout>
                }
              />
              <Route
                path="/new-project"
                element={
                  <Layout>
                    <NewProject />
                  </Layout>
                }
              />
              <Route
                path="/project-drawing"
                element={
                  <Layout>
                    <ProjectDrawing />
                  </Layout>
                }
              />
              <Route
                path="/post-project"
                element={
                  <Layout>
                    <PostProject />
                  </Layout>
                }
              />
              <Route
                path="/Ballpark-picture"
                element={
                  <Layout>
                    <Ballparkpicture />
                  </Layout>
                }
              />
              <Route
                path="/off-the-shelf"
                element={
                  <Layout>
                    <Offtheshelf />
                  </Layout>
                }
              />
              <Route
                path="/start-quote"
                element={
                  <Layout>
                    <StartQuote />
                  </Layout>
                }
              />
              <Route
                path="/result-drawing"
                element={
                  <Layout>
                    <ResultDrawing />
                  </Layout>
                }
              />
              <Route
                path="/resulte-data"
                element={
                  <Layout>
                    <ResulteData />
                  </Layout>
                }
              />
              <Route
                path="/cost-drawing"
                element={
                  <Layout>
                    <CostDrawing />
                  </Layout>
                }
              />
              <Route path="*" element={<Notfound />} />
              <Route
                path="/contact"
                element={
                  <Layout>
                    <Contact />
                  </Layout>
                }
              />
              <Route
                path="/ballpark"
                element={
                  <Layout>
                    <Ballpark />
                  </Layout>
                }
              />
              <Route
                path="/navigating-park"
                element={
                  <Layout>
                    <NavigatingPark />
                  </Layout>
                }
              />
            </>
          ) : (
            <Route
              path="/login"
              element={
                  <LoginForm/>
              }
            />
          )}
                         {/* <Route
              path="/home2"
              element={
                <Layout>
                  <Home/>
                </Layout>
              } */}
            {/* /> */}
          <Route
            path="/contact"
            element={
              <Layout>
                <Contact />
              </Layout>
            }
          />
          <Route
            path="/ballpark"
            element={
              <Layout>
                <Ballpark />
              </Layout>
            }
          />
          <Route
            path="/navigating-park"
            element={
              <Layout>
                <NavigatingPark />
              </Layout>
            }
          />
          <Route path="/*" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
