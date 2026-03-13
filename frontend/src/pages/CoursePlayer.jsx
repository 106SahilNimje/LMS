import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, PlayCircle, Menu, X, ArrowLeft, Trophy } from 'lucide-react';

const CoursePlayer = () => {
  const { courseId } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Mock Data
  const course = {
    title: 'Complete Web Development Bootcamp',
    modules: [
      {
        id: 'm1', title: 'Introduction',
        lessons: [
          { id: 'l1', title: 'How the internet works', duration: '5:30', completed: true },
          { id: 'l2', title: 'Setting up environment', duration: '12:45', completed: false }
        ]
      },
      {
        id: 'm2', title: 'Frontend Basics',
        lessons: [
          { id: 'l3', title: 'HTML5 Semantic Tags', duration: '15:20', completed: false },
        ]
      }
    ]
  };

  const [activeLesson, setActiveLesson] = useState(course.modules[0].lessons[1]);
  const isCourseComplete = false; // Mock

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-white overflow-hidden">
      {/* Sidebar Overlay (Mobile) */}
      {!sidebarOpen && (
        <button 
          className="absolute top-20 left-4 z-20 p-2 bg-white rounded-md shadow-md lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
      )}

      {/* Main Content (Video Player) */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'lg:mr-80' : ''} overflow-y-auto`}>
        <div className="bg-gray-900 w-full aspect-video flex items-center justify-center relative">
          {/* Mock Video Player */}
          <div className="text-center text-white">
            <PlayCircle className="h-20 w-20 mx-auto text-gray-500 mb-4 opacity-80 hover:opacity-100 cursor-pointer transition" />
            <p className="text-xl font-medium">{activeLesson.title}</p>
            <p className="text-sm text-gray-400 mt-2">Mock Video Player (YouTube/Cloudinary Embed Here)</p>
          </div>
        </div>

        <div className="p-8 max-w-4xl mx-auto w-full">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{activeLesson.title}</h2>
              <p className="text-gray-500 mt-2">{course.title}</p>
            </div>
            <button className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-md font-medium hover:bg-green-200 transition">
              <CheckCircle className="h-5 w-5" />
              Mark Completed
            </button>
          </div>
          
          <div className="prose max-w-none text-gray-700">
            <h3 className="text-xl font-bold mb-4">Lesson Resources</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><a href="#" className="text-primary-600 hover:underline">Download Presentation PDF</a></li>
              <li><a href="#" className="text-primary-600 hover:underline">Source Code Repository</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sidebar Curriculum */}
      <div className={`fixed inset-y-16 right-0 w-80 bg-gray-50 border-l border-gray-200 transform transition-transform duration-300 z-30 overflow-y-auto ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white sticky top-0">
          <h3 className="font-bold text-gray-900">Course Content</h3>
          <button onClick={() => setSidebarOpen(false)} className="text-gray-500 hover:text-gray-700 p-1 lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          <Link to="/dashboard" className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600 mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>

          <div className="space-y-4">
            {course.modules.map((module, mIdx) => (
              <div key={module.id}>
                <h4 className="font-bold text-gray-900 text-sm mb-2 uppercase tracking-wider">
                  Module {mIdx + 1}: {module.title}
                </h4>
                <div className="space-y-1">
                  {module.lessons.map((lesson, lIdx) => (
                    <button
                      key={lesson.id}
                      onClick={() => setActiveLesson(lesson)}
                      className={`w-full text-left p-3 rounded-md text-sm flex gap-3 transition ${
                        activeLesson.id === lesson.id ? 'bg-primary-50 border border-primary-100' : 'hover:bg-gray-100'
                      }`}
                    >
                      {lesson.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-gray-300 flex-shrink-0"></div>
                      )}
                      
                      <div>
                        <p className={`font-medium ${activeLesson.id === lesson.id ? 'text-primary-700' : 'text-gray-700'}`}>
                          {lIdx + 1}. {lesson.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{lesson.duration}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {isCourseComplete && (
             <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
                <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <h4 className="font-bold text-gray-900">Congratulations!</h4>
                <p className="text-xs text-gray-600 mb-3">You have completed this course.</p>
                <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold py-2 rounded transition text-sm shadow-sm">
                  Get Certificate
                </button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
