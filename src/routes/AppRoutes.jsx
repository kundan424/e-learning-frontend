import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import MyCoursesPage from '../pages/MyCoursesPage'
import CourseDetailsPage from '../pages/CourseDetailsPage'
import InstructorDashboard from '../pages/InstructorDashboard'
import ProtectedRoute from './ProtectedRoute'
import RoleProtectedRoute from './RoleProtectedRoute'
import LessonPage from '../pages/LessonPage'
import AnnouncementPage from '../pages/AnnouncementPage'
import QuestionDetailsPage from '../pages/QuestionDetailsPage'
import CourseEditorPage from '../pages/CourseEditorPage'
import MessagesPage from '../pages/MessagesPage'
import LandingLayout from '../components/LandingLayout'
import AllCoursesPage from '../pages/AllCoursesPage'

const AppRoutes = () => {
    return (
        <Routes>
            {/* Landing page with TOTC layout */}
            <Route element={<LandingLayout />}>
                <Route path="/" element={<HomePage />} />

                <Route path="/courses" element={<AllCoursesPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/course/:courseId" element={<CourseDetailsPage />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/my-courses" element={<MyCoursesPage />} />
                    <Route path="/course/:courseId/lesson/:lessonId" element={<LessonPage />} />
                    <Route path="/announcements/:announcementId" element={<AnnouncementPage />} />
                    <Route path="/course/:courseId/questions/:questionId" element={<QuestionDetailsPage />} />
                    <Route path="/messages" element={<MessagesPage />} />
                </Route>

                <Route element={<RoleProtectedRoute allowedRoles={['INSTRUCTOR']} />}>
                    <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
                    <Route path="/instructor/course/:courseId/edit" element={<CourseEditorPage />} />
                </Route>
            </Route>


        </Routes>
    )
}

export default AppRoutes