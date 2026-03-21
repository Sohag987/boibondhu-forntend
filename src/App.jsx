import Navbar from './components/navbar/Navbar';

import Single from './components/main/Single';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './components/main/Login';
import Signup from './components/main/Signup';
import Landing from './components/main/Landing';
import SellForm from './components/main/Sellform';
import About from './components/about/About';
import Footer from './components/footer/Footer';
import Allsell from './components/main/Allsell';
import Contact from './components/main/Contact';
import Donate from './components/main/Donatio';
import DonateForm from './components/main/Donateform';   
import SingleFund from './components/main/Singlefund';
import Library from './components/main/Lendall';
import LendForm from './components/main/Lendform';
import BorrowBooks from './components/main/Borrow';
import BorrowDetails from './components/main/Borrowdetails';
import Dashboard from './components/main/Dashboard';

function App() {
   return (
      <BrowserRouter>
         <Navbar />

         <Routes>
            <Route path="/sell" element={<SellForm />} />
            <Route path="/" element={<Landing />} />
            <Route path="/book-for-sell" element={<Allsell />} />
            <Route path="/book-for-sell/:slug" element={<Single />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/donate/list" element={<DonateForm />} />
            <Route path="/donate/:slug" element={<SingleFund />} />
            <Route path="/library" element={<Library />} />
            <Route path="/library/borrow" element={<BorrowBooks />} />
            <Route path="/library/lend" element={<LendForm />} />
            <Route path="/library/:slug" element={<BorrowDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />

         </Routes>
         

        
         
         <Footer />

      </BrowserRouter>
   );
}

export default App;