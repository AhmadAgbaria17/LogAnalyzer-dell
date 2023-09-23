import "./App.css";
import AdminHome from "./AdminDashboard/page/AdminHome";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserTable from "./SidebarActions/Users/page/UserTable";
import Logs from "./SidebarActions/Logs/page/Logs";
import Rules from "./SidebarActions/Rules/page/Rules";
import ProcessLogs from "./SidebarActions/Logs/page/ProcessLogs";
import ConfiquratorHome from "./ConfiquratorDashboard/page/ConfiquratorHome";
import ViewerHome from "./ViewerDashboard/page/ViewerHome";
import UploadHome from "./SidebarActions/UploadFile/page/UploadHome";
import ReportsHome from "./SidebarActions/Reports/page/ReportsHome";
import Landpage from "./Login/pages/landpage";
import SignUpPage from "./Login/pages/SignUpPage";
import LoginPage from "./Login/pages/LoginPage";
import NoPage from "./Login/pages/NoPage";
import ResetPassFirstLogin from "./Login/pages/resetPassFirstLogin";
import UnauthorizedAccess from "./Login/pages/UnauthorizedAccess";
import MainPage from "./SidebarActions/AnalyzeFile/page/MainPage";
import AnalyzationPage from "./SidebarActions/AnalyzeFile/page/AnalyzationPage";
import DispatcherHome from "./SidebarActions/Dispatcher/page/DispatcherHome";
import ProtectRoute from "./Login/comp/ProtectedRoutes";
import { AuthProvider } from "react-auth-kit";
import JiraHome from "./SidebarActions/Jira/page/JiraHome";

//<AdminHome openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
function App() {
  return (
    <AuthProvider
      authType={"cookie"}
      authName={"_auth"}
      cookieDomain={window.location.hostname}
      cookieSecure={false}
    >
      <BrowserRouter>
        <Routes>
          {/*     <Route path="/" element={<ReportsHome />} />*/}

          <Route path="/" element={<Landpage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/resetPassFirstLogin/:username"
            element={<ResetPassFirstLogin />}
          />
          <Route path="/unauthenticated" element={<UnauthorizedAccess />} />

          <Route
            path="/admin"
            element={<ProtectRoute PageComp={AdminHome} />}
          />
          <Route
            path="/admin/uploadfile"
            element={<ProtectRoute PageComp={UploadHome} role="admin" />}
          />
          <Route
            path="/admin/analyzefile"
            element={<ProtectRoute PageComp={MainPage} role="admin" />}
          />
          <Route
            path="/admin/analyzefile/analyze"
            element={<ProtectRoute PageComp={AnalyzationPage} role="admin" />}
          />
          <Route
            path="/admin/users"
            element={<ProtectRoute PageComp={UserTable} />}
          />
          <Route
            path="/admin/logs"
            element={<ProtectRoute PageComp={Logs} role="admin" />}
          />
          <Route
            path="/admin/process-logs/:file_name"
            element={<ProtectRoute PageComp={ProcessLogs} role="admin" />}
          />
          <Route
            path="/admin/rules"
            element={<ProtectRoute PageComp={Rules} role="admin" />}
          />
          <Route
            path="/admin/reports"
            element={<ProtectRoute PageComp={ReportsHome} role="admin" />}
          />
          <Route
            path="/admin/dispatcher"
            element={<ProtectRoute PageComp={DispatcherHome} role="admin" />}
          />
          <Route
            path="/admin/jira"
            element={<ProtectRoute PageComp={JiraHome} role="admin" />}
          />

          <Route
            path="/Configurator"
            element={<ProtectRoute PageComp={ConfiquratorHome} />}
          />
          <Route
            path="/Configurator/uploadfile"
            element={<ProtectRoute PageComp={UploadHome} role="Configurator" />}
          />
          <Route
            path="/Configurator/analyzefile"
            element={<ProtectRoute PageComp={MainPage} role="Configurator" />}
          />
          <Route
            path="/Configurator/analyzefile/analyze"
            element={
              <ProtectRoute PageComp={AnalyzationPage} role="Configurator" />
            }
          />
          <Route
            path="/Configurator/logs"
            element={<ProtectRoute PageComp={Logs} role="Configurator" />}
          />
          <Route
            path="/Configurator/process-logs/:file_name"
            element={
              <ProtectRoute PageComp={ProcessLogs} role="Configurator" />
            }
          />
          <Route
            path="/Configurator/rules"
            element={<ProtectRoute PageComp={Rules} role="Configurator" />}
          />
          <Route
            path="/Configurator/reports"
            element={
              <ProtectRoute PageComp={ReportsHome} role="Configurator" />
            }
          />
          <Route
            path="/Configurator/dispatcher"
            element={
              <ProtectRoute PageComp={DispatcherHome} role="Configurator" />
            }
          />

          <Route
            path="/viewer"
            element={<ProtectRoute PageComp={ViewerHome} />}
          />
          <Route
            path="/viewer/reports"
            element={<ProtectRoute PageComp={ReportsHome} role="viewer" />}
          />

          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
