
import AddProduct from "./components/AddProduct";

import {Routes , Route} from 'react-router-dom'
import Home from "./components/Home";
import EditProduct from "./components/EditProduct";
import 'react-toastify/dist/ReactToastify.css';
import Cart from "./components/Cart";

function App() {
  return (
    <>
     <Routes>
     
      <Route path='/' element={<Home />} />
      <Route path='/add' element={<AddProduct />} />
      <Route path='/edit/:id' element={<EditProduct />} />
      <Route path='/cart' element={<Cart />} />
    
    </Routes>
  
    
    </>
  );
}

export default App;
