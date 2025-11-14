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
import Layout from '../components/Layout'
import AllCoursesPage from '../pages/AllCoursesPage'

const AppRoutes = () => {
    return (

        <Routes>
            <Route element={<Layout />} >

                <Route path="/" element={<HomePage />} />
                <Route path="/courses" element={<AllCoursesPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/my-courses" element={<MyCoursesPage />} />
                    <Route path="/course/:courseId" element={<CourseDetailsPage />} />
                    <Route path='/course/:courseId/lesson/:lessonId' element={<LessonPage />} />
                    <Route path='/announcements/:announcementId' element={<AnnouncementPage />} />
                    <Route path='/messages' element={<MessagesPage />} />

                    <Route path='/question/:questionId' element={<QuestionDetailsPage />} />
                </Route>

                <Route element={<RoleProtectedRoute role="INSTRUCTOR" />}>
                    <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
                    <Route path='/instructor/course/:courseId/edit' element={<CourseEditorPage />} />

                    {/* Add other instructor-only routes here */}
                </Route>

            </Route>


            <Route path="*" element={<h2>404: Page Not Found</h2>} />
        </Routes>
    )
}

export default AppRoutes