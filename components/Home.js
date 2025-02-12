"use client"
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useRouter } from 'next/navigation';

const Home = () => {

      const router = useRouter();
      const handleNavigation = (course) => {
        router.push(`/${course.toLowerCase()}`);
      };

  return (
    <div>
       <div className="bg-gray-100 text-gray-900">
      <Navbar/>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center bg-[url('/hero-bg.jpg')] bg-cover bg-center">
  <div className="bg-gradient-to-r from-[#ff512f] to-[#dd2476] opacity-60 w-full h-full absolute top-0 left-0"></div>
  <div className="relative z-10 p-6 max-w-3xl text-white">
    <h1 className="text-4xl md:text-6xl font-bold animate-fade-up">JEE, NEET & SAT Practice Exams</h1>
    <p className="mt-4 text-lg animate-fade-up delay-100">Get real exam experience with expert-curated mock tests.</p>
    <button className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl shadow-lg transition transform hover:scale-105">Start Practicing</button>
  </div>
</section>


      {/* Why Choose Us */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Why Choose Meritroot?</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {[
            { title: "Exam-like Interface", desc: "Experience the real test environment." },
            { title: "Detailed Solutions", desc: "Step-by-step explanations for all questions." },
            { title: "Performance Analytics", desc: "Track progress with AI-powered insights." },
          ].map((feature, i) => (
            <div key={i} className="p-6 bg-white shadow-lg rounded-xl text-center transform hover:scale-105 transition">
              <h3 className="text-xl font-semibold text-red-600">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Exam Categories */}
      <section className="bg-gray-200 py-16 px-6">
        <h2 className="text-3xl font-bold text-center">Choose Your Exam</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            { name: "JEE Main & Advanced", img: "/images/jee-bg.webp", route: "jee" },
            { name: "NEET Preparation", img: "/images/neet-bg.webp" , route: "neet"},
            { name: "Digital SAT", img: "/images/academic-bg.webp" , route: "sat"},
          ].map((exam, i) => (
            <div key={i} className="bg-white shadow-xl rounded-xl overflow-hidden transform hover:scale-105 transition">
             <Image src={exam.img} alt={exam.name} width={500} height={200} className="w-full h-48 object-cover" />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold text-blue-600">{exam.name}</h3>
                <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                onClick={() => handleNavigation(exam.route)}
                >Take Test</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center">What Students Say</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {[ 
            { name: "Amit Kumar", feedback: "The mock tests were exactly like the real exam. Helped me gain confidence!" },
            { name: "Sneha Gupta", feedback: "Detailed solutions helped me understand my mistakes and improve quickly." },
          ].map((testimony, i) => (
            <div key={i} className="p-6 bg-white shadow-lg rounded-xl text-center">
              <p className="italic text-gray-600">"{testimony.feedback}"</p>
              <h3 className="mt-2 font-semibold text-red-600">- {testimony.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-100 py-16 px-6">
        <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
        <div className="mt-8 max-w-4xl mx-auto">
          {[
            { question: "Are these tests free?", answer: "Yes, we provide free tests with an option to upgrade for advanced analytics." },
            { question: "How can I track my progress?", answer: "Our AI-powered insights help you track progress and identify weak areas." },
          ].map((faq, i) => (
            <div key={i} className="bg-white shadow-md p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-red-600">{faq.question}</h3>
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-red-600 text-white py-16 px-6 text-center">
        <h2 className="text-4xl font-bold">Ready to Ace Your Exam?</h2>
        <p className="mt-4 text-lg">Join thousands of students and start practicing today!</p>
        <button className="mt-6 bg-white text-red-600 px-6 py-3 rounded-xl shadow-lg transition transform hover:scale-105">Get Started</button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 text-center">
        <p>&copy; {new Date().getFullYear()} Meritroot. All Rights Reserved.</p>
      </footer>
    </div>
    </div>
  )
}

export default Home
