import React, { useEffect} from 'react'

const ProfileSettings = () => {

      const getUser = async () => {
        const {
          data: { user },
          error
        } = await supabase.auth.getUser()
        if (!error) {
          console.log(user)
        }
      }
    
      useEffect(() => {
        getUser()
      }, [])
    
    return (
      <div className="bg-white p-6 rounded-lg shadow-md ">
        <h2 className="text-2xl font-bold mb-4 text-[rgb(82,52,26)]">Profile Settings</h2>
        <form className="space-y-4 text-black">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border border-gray-300 rounded"
          />
          <button className="bg-[rgb(82,52,26)] text-white px-6 py-2 rounded hover:bg-[rgb(60,38,20)]">
            Save Changes
          </button>
        </form>
      </div>
    );
  };
  
  export default ProfileSettings;
  