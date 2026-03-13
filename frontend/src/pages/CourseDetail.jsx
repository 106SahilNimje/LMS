import { useParams, useNavigate } from 'react-router-dom';
import { PlayCircle, CheckCircle, CreditCard, Clock, Award } from 'lucide-react';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock details
  const course = {
    id,
    title: 'Complete Web Development Bootcamp',
    description: 'Master frontend and backend development with this comprehensive bootcamp. Learn HTML, CSS, JavaScript, React, Node.js, and PostgreSQL.',
    instructor: 'John Doe',
    price: 499,
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200',
    modules: [
      {
        id: 'm1', title: 'Introduction to Web Development',
        lessons: [{ id: 'l1', title: 'How the internet works' }, { id: 'l2', title: 'Setting up your environment' }]
      },
      {
        id: 'm2', title: 'Frontend Basics',
        lessons: [{ id: 'l3', title: 'HTML5 Semantic Tags' }, { id: 'l4', title: 'CSS3 Flexbox and Grid' }]
      }
    ]
  };

  const handleEnroll = () => {
    // Mock Razorpay Integration
    console.log("Initialize Razorpay for amount ₹" + course.price);
    alert('Mock Razorpay Checkout. Payment successful!');
    navigate('/dashboard');
  };

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-4rem)] pb-12">
      {/* Course Hero */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2 space-y-6">
            <h1 className="text-4xl font-extrabold">{course.title}</h1>
            <p className="text-xl text-gray-300">{course.description}</p>
            <div className="flex gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-2"><Award className="h-5 w-5"/> Certificate of completion</span>
              <span className="flex items-center gap-2"><Clock className="h-5 w-5"/> Full lifetime access</span>
            </div>
            <p className="text-sm">Created by <span className="text-primary-400 underline">{course.instructor}</span></p>
          </div>
          
          <div className="bg-white text-gray-900 rounded-xl p-6 shadow-2xl md:ml-8 transform md:-translate-y-12">
            <img src={course.thumbnail} alt="Course Preview" className="w-full h-48 object-cover rounded-lg mb-6 shadow-md" />
            <div className="text-3xl font-bold mb-6">₹{course.price}</div>
            <button 
              onClick={handleEnroll}
              className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white py-3 px-4 rounded-md font-bold hover:bg-primary-700 transition"
            >
              <CreditCard className="h-5 w-5" />
              Enroll Now
            </button>
            <p className="text-center text-xs text-gray-500 mt-4">30-Day Money-Back Guarantee</p>
          </div>
        </div>
      </div>

      {/* Course Curriculum */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:-mt-8 relative z-10 w-full md:w-2/3 ml-0">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Course Curriculum</h2>
          <div className="space-y-4">
            {course.modules.map((module, idx) => (
              <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 flex justify-between items-center font-medium">
                  <span>Module {idx + 1}: {module.title}</span>
                  <span className="text-sm text-gray-500">{module.lessons.length} lessons</span>
                </div>
                <div className="divide-y divide-gray-200 bg-white">
                  {module.lessons.map((lesson, lidx) => (
                    <div key={lesson.id} className="px-6 py-4 flex items-center gap-3 text-sm text-gray-700">
                      <PlayCircle className="h-5 w-5 text-gray-400" />
                      {lidx + 1}. {lesson.title}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
