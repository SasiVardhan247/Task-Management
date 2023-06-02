import { BrowserRouter,Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Task from "./pages/Task";
import NotFound from "./pages/NotFound";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="task/add" element = {<Task />} />
          <Route path="task/:taskId" element={<Task />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );

}

export default App;