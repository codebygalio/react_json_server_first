import React from "react";
// import logo from "logo.svg";
import 'antd/dist/antd.less'

import "./App.css";
// import { Login } from "screens/Login";

import { useAuth } from "context/auth-context";
import { AuthenticatedApp } from "authenticated-app";
import { UnauthenticatedApp } from "unauthenicated-app";
// import TryUseArray from "screens/project-list/try-use-array"
// import { ProjectListScreen } from "screens/projests";


function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      {user? <AuthenticatedApp/> : <UnauthenticatedApp />}
      {/* <ProjectListScreen /> */}
      {/* <TryUseArray /> */}
      {/* <Login /> */}
    </div>
  );
}

export default App;
