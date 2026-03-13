import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, Star } from 'lucide-react';

// Mock Data
const MOCK_COURSES = [
  { id: '1', title: 'Complete Web Development Bootcamp', instructor: 'John Doe', price: 499, thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600', rating: 4.8 },
  { id: '2', title: 'Advanced React patterns', instructor: 'Jane Smith', price: 699, thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=600', rating: 4.9 },
  { id: '3', title: 'Node.js Microservices', instructor: 'Mike Johnson', price: 899, thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600', rating: 4.7 },
];

const CourseList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = MOCK_COURSES.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Explore Courses</h1>
          <p className="mt-2 text-gray-600">Find the perfect course to advance your career.</p>
        </div>
        <div className="relative max-w-md w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder="Search for courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <img className="h-48 w-full object-cover" src={course.thumbnail} alt={course.title} />
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{course.title}</h3>
              </div>
              <p className="mt-2 text-sm text-gray-500">By {course.instructor}</p>
              
              <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  {course.rating}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  20h 30m
                </span>
              </div>
              
              <div className="mt-auto pt-6 flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">₹{course.price}</span>
                <Link
                  to={`/courses/${course.id}`}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredCourses.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No courses found matching your search.
        </div>
      )}
    </div>
  );
};

export default CourseList;
