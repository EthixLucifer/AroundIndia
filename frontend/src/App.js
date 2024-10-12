// import './App.css';
// import { Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Homepage from './components/Homepage';
// import Footer from './components/Footer';
// import User from './components/User';
// import Politician from './components/Politician';
// import Admin from './components/Admin'

// function App() {
//   return (
//     <div className="App m-4 mb-0 mt-0 h-screen flex flex-col bg-slate-100 rounded-md text">
//       <Navbar />

//       {/* Define Routes here */}
//       <Routes>
//         <Route path="/" element={<Homepage />} />
//         <Route path="/user" element={<User />} />
//         <Route path="/politician" element={<Politician />} />
//         <Route path="/admin" element={<Admin />} />
//       </Routes>

//       <Footer />
//     </div>
//   );
// }

// export default App;

import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Footer from './components/Footer';
import User from './components/User';
import Politician from './components/Politician';
import Admin from './components/Admin';

function App() {
  return (
    <div className="App min-h-screen flex flex-col bg-cover bg-left-bottom" style={{ backgroundImage: "url('/bg.jpg')" }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/user" element={<User />} />
        <Route path="/politician" element={<Politician />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
