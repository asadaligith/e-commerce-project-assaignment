export default function SignupPage() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Create Account
            </h1>
            <p className="text-gray-500 mt-2">
              Join us today
            </p>
          </div>
  
          <form className="space-y-5">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
              />
            </div>
  
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
              />
            </div>
  
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Create password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
              />
            </div>
  
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition "
            >
              Create Account
            </button>
          </form>
  
          <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    );
  }