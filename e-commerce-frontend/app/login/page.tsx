export default function LoginPage() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
            <p className="text-gray-500 mt-2">
              Sign in to your account
            </p>
          </div>
  
          {/* Form */}
          <form className="space-y-5">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-600"
              />
            </div>
  
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-600"
              />
            </div>
  
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" />
                Remember me
              </label>
  
              <button
                type="button"
                className="text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
  
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Login
            </button>
          </form>
  
          {/* Footer */}
          <p className="text-center text-gray-600 mt-6">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    );
  }