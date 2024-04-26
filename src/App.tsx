import React from "react";
// import logo from "logo.svg";
import 'antd/dist/antd.less'

import "./App.css";
// import { Login } from "screens/Login";

import { useAuth } from "context/auth-context";
import { AuthenticatedApp } from "authenticated-app";
import { UnauthenticatedApp } from "unauthenicated-app";
// import { ErrorBoundary } from "components/error-boundary";
import { FullPageErrorFallback } from "components/lib";
// import TryUseArray from "screens/project-list/try-use-array"
// import { ProjectListScreen } from "screens/projests";


function App() {
  const { user } = useAuth()
  return (
    <div className="App">
    {/* <ErrorBoundary fallbackRender={FullPageErrorFallback}> */}
    {user? <AuthenticatedApp/> : <UnauthenticatedApp />}
    {/* </ErrorBoundary> */}
      
      {/* <ProjectListScreen /> */}
      {/* <TryUseArray /> */}
      {/* <Login /> */}
    </div>
  );
}

export default App;
