import { Link } from 'react-router-dom';
import { Book, Play, Award, Clock } from 'lucide-react';

const Dashboard = () => {
  // Mock Data
  const enrolledCourses = [
    { id: '1', title: 'Complete Web Development Bootcamp', progress: 45, nextLesson: 'CSS Grid Layouts', thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600' },
    { id: '2', title: 'Advanced React patterns', progress: 10, nextLesson: 'Custom Hooks', thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=600' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
          <div className="p-4 bg-primary-100 rounded-lg"><Book className="h-6 w-6 text-primary-600"/></div>
          <div><p className="text-sm text-gray-500 font-medium">Enrolled Courses</p><p className="text-2xl font-bold text-gray-900">{enrolledCourses.length}</p></div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
          <div className="p-4 bg-yellow-100 rounded-lg"><Award className="h-6 w-6 text-yellow-600"/></div>
          <div><p className="text-sm text-gray-500 font-medium">Certificates</p><p className="text-2xl font-bold text-gray-900">0</p></div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
          <div className="p-4 bg-green-100 rounded-lg"><Clock className="h-6 w-6 text-green-600"/></div>
          <div><p className="text-sm text-gray-500 font-medium">Hours Learned</p><p className="text-2xl font-bold text-gray-900">12.5</p></div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">Continue Learning</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {enrolledCourses.map(course => (
          <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col hover:shadow-md transition">
            <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover" />
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h3>
              <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                <Play className="h-4 w-4"/> Next: {course.nextLesson}
              </p>
              
              <div className="mt-auto">
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div className="bg-primary-600 h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mb-6">
                  <span>{course.progress}% Complete</span>
                </div>
                
                <Link to={`/learn/${course.id}`} className="w-full flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700">
                  Resume Course
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
