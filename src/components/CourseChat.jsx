import React from 'react'
import GroupChat from './GroupChat'

function CourseChat({ courseId }) {
    return (
        <div className="space-y-6 ">
            <div className="rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-4 text-2xl font-semibold text-gray-800">Live Chat</h2>
                <GroupChat courseId={courseId} />
            </div>
        </div>
    )
}

export default CourseChat
