function ForgetPassword() {
  return (
    <div className="flex justify-center items-center min-h-screen">
        <div className="w-[400px]">
            <h1 className="text-3xl font-semibold text-center">Forget Password</h1>
            <form className="space-y-8">
            <div className="space-y-4">
                <label htmlFor="email" className="block">Email</label>
                <input type="email" id="email" className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Submit</button>
            </form>
        </div>
    </div>

  );
}
export default ForgetPassword;