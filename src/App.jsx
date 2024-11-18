import React, { useState } from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import Header from './components/organism/Header';
import Sidebar from './components/molecules/Sidebar';
import Home from './components/pages/Home';
import MyProjects from './components/pages/MyProjects';
import ProjectDetail from './components/pages/ProjectDetail';
import EpicDetail from './components/pages/EpicDetail';
import StoryDetail from './components/pages/StoryDetail';
import Login from './components/pages/Login'; 
import PageWrapper from './components/PageWrapper'; 
import MyStories from './components/pages/MyStories'; 
import SettingsPage from './components/pages/SettingsPage'; 
import './App.css';

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token')); // Verifica si hay un token en localStorage
  const [title, setTitle] = useState("Gestor de Tareas"); // Estado para el título

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app-container">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} closeSidebar={toggleSidebar} />
      
      <main className="main-content">
        <PageWrapper setTitle={setTitle}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/settings" element={isAuthenticated ? <SettingsPage /> : <Navigate to="/login" />} />
            <Route path="/my-stories" element={isAuthenticated ? <MyStories /> : <Navigate to="/login" />} />
            <Route path="/my-projects" element={isAuthenticated ? <MyProjects /> : <Navigate to="/login" />} />
            <Route path="/my-projects/:projectId" element={isAuthenticated ? <ProjectDetail /> : <Navigate to="/login" />} />
            <Route path="/my-projects/:projectId/epics/:epicId" element={isAuthenticated ? <EpicDetail /> : <Navigate to="/login" />} />
            <Route path="/my-projects/:projectId/epics/:epicId/story/:storyId" element={isAuthenticated ? <StoryDetail /> : <Navigate to="/login" />} />
          </Routes>
        </PageWrapper>
      </main>
    </div>
  );
};

export default App;
