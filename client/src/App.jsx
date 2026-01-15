import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const Subjects = lazy(() => import('./pages/Subjects'));
const SubjectDetail = lazy(() => import('./pages/SubjectDetail'));
const Practical = lazy(() => import('./pages/Practical'));
const LessonView = lazy(() => import('./pages/LessonView'));
const AIChat = lazy(() => import('./pages/AIChat'));
const Quiz = lazy(() => import('./pages/Quiz'));

function App() {
  return (
    <Router>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="subjects" element={<Subjects />} />
            <Route path="subjects/:id" element={<SubjectDetail />} />
            <Route path="subjects/:subjectId/:topicId" element={<LessonView />} />
            <Route path="practical" element={<Practical />} />
            <Route path="chat" element={<AIChat />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="profile" element={<div className="p-4">Profile Page (Coming Soon)</div>} />
            <Route path="*" element={<div className="p-4">404 - Not Found</div>} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
