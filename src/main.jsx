// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import Form from "./components/Login"
import Aurora from "./Backgrounds/Aurora/Aurora"
// import LogIn from './components/Login_Aurora';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <LogIn/>
//     {/* <App /> */}
//     {/* <Aurora /> */}
//     {/* <Form /> */}
//   </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import LogIn from './components/Login'; 
// ou App se for gerenciar rotas

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <LogIn /> 
//       {/* ou <App /> se você tiver rotas múltiplas */}
//     </BrowserRouter>
//   </React.StrictMode>
// );


import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);