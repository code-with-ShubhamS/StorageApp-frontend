import { useEffect, useState } from "react";
import {
  Camera,
  Shield,
  Users,
  User,
  LogOut,
  Pause,
  Calendar,
  Mail,
  Edit3,
  Check,
  X,
  Loader,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { deleteUser, fetchUser, logoutAllSessions } from "./api/userApi";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    username: "Angelika Deeb",
    email: "angelika.deeb@longemailaddresscompany.com",
    role: "manager",
    profilePicture:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200",
    // lastLogin: "2025-01-15T10:30:00Z",
    // loginMethod: "google",
    isGoogleConnected: true,
  });

  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(profileData.username);
  const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await fetchUser();
        setProfileData({
          username: response.name,
          email: response.email,
          role: response.role,
          profilePicture: response.picture,
          // lastLogin: response.lastLogin,
          // loginMethod: response.loginMethod,
          isGoogleConnected: response.isGoogleUser,
        });
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        navigate("/login");
      }
    };
    getUserInfo();
  }, [navigate]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData((prev) => ({
          ...prev,
          profilePicture: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNameEdit = () => {
    setTempName(profileData.username);
    setIsEditingName(true);
  };

  const handleNameSave = () => {
    setProfileData((prev) => ({ ...prev, username: tempName }));
    setIsEditingName(false);
  };

  const handleNameCancel = () => {
    setIsEditingName(false);
  };

  const formatLastLogin = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <Shield className="w-4 h-4" />;
      case "manager":
        return <Users className="w-4 h-4" />;
      case "user":
        return <User className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 border-red-200";
      case "manager":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "user":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const logoutAllSession = async () => {
    try {
      setLoading(true);
      const data = await logoutAllSessions();
      window.location.reload();
      console.log(data);
    } catch (error) {
      console.error("Failed to logout from all sessions:", error);
    } finally {
      setLoading(false);
      setShowLogoutConfirm(false);
    }
  };

  const handleDeactivateAccount = async () => {
    try {
      setLoading(true);
      const data = await deleteUser();
      console.log(data, "profile deleted");
      navigate("/login");
      console.log(data);
    } catch (error) {
      console.error("Failed to delete account:", error);
    } finally {
      setLoading(false);
      setShowDeactivateConfirm(false);
    }
    // Logic to deactivate account
  };
  return (
    <div className="py-8 px-4 sm:px-6">
      <div className="">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-white rounded-t-lg shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                Profile Settings
              </h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                Manage your personal profile settings
              </p>
            </div>
            {/* <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium w-full sm:w-auto">
              Save Changes
            </button> */}
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium w-full sm:w-auto hover:cursor-pointer" onClick={() => navigate("/")}>
             Home
            </button>
          </div>
        </div>

        <div className="bg-white rounded-b-lg shadow-lg p-6">
          {/* Profile Picture Section - Responsive layout */}
          <div className="flex flex-col md:flex-row  md:items-center gap-6  items-center">
            {/* Avatar Section */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white ">
                <img
                  src={profileData.profilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* <label className="absolute bottom-1 right-1 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors shadow-md">
                <Camera className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label> */}
            </div>

            {/* Name Section with Enhanced Editing */}
            {/* Name Section with Enhanced Responsive Editing */}
            <div className="flex-1 w-full min-w-0">
              {" "}
              {/* Added min-w-0 to prevent overflow */}
              {!isEditingName ? (
                <div className="flex flex-col items-center md:items-start">
                  <div className="flex items-center gap-3 max-w-full">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                      {profileData.username}
                    </h3>
                    <button
                      onClick={handleNameEdit}
                      className="p-2 bg-gray-100 hover:bg-blue-100 text-gray-500 hover:text-blue-600 rounded-full transition-colors flex-shrink-0"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-gray-500 text-sm mt-2 text-center md:text-left">
                    Click the edit icon to change your name
                  </p>
                </div>
              ) : (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 transition-all">
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-medium text-gray-700">
                      Edit Name
                    </label>
                    <input
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-base sm:text-lg"
                      autoFocus
                    />
                    <div className="flex gap-3 justify-end mt-2 max-[300px]:flex-wrap">
                      <button
                        onClick={handleNameCancel}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2 text-sm sm:text-base"
                      >
                        <X className="w-4 h-4" /> Cancel
                      </button>
                      <button
                        onClick={handleNameSave}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm sm:text-base"
                      >
                        <Check className="w-4 h-4" /> Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* </div> */}
          </div>

          {/* Login Method Indicator - Responsive */}
          {profileData.isGoogleConnected && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-8">
              <div className="flex flex-col min-[450px]:flex-row min-[450px]:items-center gap-4">
                <div className="flex-shrink-0 bg-white p-3 rounded-lg border border-green-200 shadow-sm">
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-green-800 font-medium">
                    Connected to Google Account
                  </p>
                  <p className="text-green-600 text-sm mt-1">
                    Your account is linked to Google for easy sign-in
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Account Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Email - Improved Responsive Handling */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <Mail className="w-5 h-5 text-gray-500 flex-shrink-0" />
                <label className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
              </div>
              <div className="w-full py-2">
                <p className="text-gray-600 text-sm break-all">
                  {" "}
                  {/* Changed to break-all */}
                  {profileData.email}
                </p>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Email address cannot be changed
              </p>
            </div>

            {/* Role */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                {getRoleIcon(profileData.role)}
                <label className="text-sm font-medium text-gray-700">
                  Role
                </label>
              </div>
              <div className="w-full py-2">
                <div
                  className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium border ${getRoleColor(
                    profileData.role
                  )}`}
                >
                  <span className="capitalize">{profileData.role}</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Role is assigned by administrator
              </p>
            </div>

            {/* Last Login */}
            {/* <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 md:col-span-2">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-500 flex-shrink-0" />
                <div className="min-w-0">
                  {" "}
                  {/* Added min-w-0 */}
                  {/* <p className="text-sm font-medium text-gray-700 truncate">
                    Last Login
                  </p>
                  <p className="text-gray-600 text-sm mt-1 truncate">
                    {formatLastLogin(profileData.lastLogin)}
                  </p>
                </div>
              </div>
            </div> */}
          </div>

          {/* Action Buttons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Logout All Devices */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-orange-100 p-3 rounded-lg flex-shrink-0  max-[400px]:hidden">
                  <LogOut className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-orange-900">
                    Logout All Devices
                  </h4>
                  <p className="text-xs text-orange-700 mt-2">
                    This will sign you out from all devices and browsers where
                    you're currently logged in <b>including current account</b>.
                    You'll need to sign in again on each device.
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="w-full py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium flex items-center justify-center gap-2 hover:cursor-pointer"
                >
                  <LogOut className="w-4 h-4 hover:cursor-pointer" /> Logout All
                  Devices
                </button>
              </div>
            </div>

            {/* Account Deactivation */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-red-100 p-3 rounded-lg flex-shrink-0 max-[400px]:hidden">
                  <Pause className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-red-900">
                    Temporary Account Deactivation
                  </h4>
                  <p className="text-xs text-red-700 mt-2">
                    Temporarily disable your account. You can reactivate it
                    anytime by logging in again. Your data will be preserved
                    during deactivation.
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => setShowDeactivateConfirm(true)}
                  className="w-full py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium flex items-center justify-center gap-2 hover:cursor-pointer"
                >
                  <Pause className="w-4 h-4" /> Deactivate Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modals */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Logout All Devices?
            </h3>
            <p className="text-gray-600 mb-6">
              This will sign you out from all devices and browsers. You'll need
              to sign in again on each device.
            </p>
            <div className="flex gap-3">
              <button
                disabled={loading}
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors hover:cursor-pointer"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                onClick={() => logoutAllSession()}
                className="flex-1 px-4 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors hover:cursor-pointer items-center justify-center flex"
              >
                {loading ? (
                  <Loader className="h-6 w-6 animate-spin text-white" />
                ) : (
                  "Logout All"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeactivateConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Deactivate Account?
            </h3>
            <p className="text-gray-600 mb-6">
              Your account will be temporarily disabled. You can reactivate it
              by logging in again. Your data will be preserved.
            </p>
            <div className="flex gap-3">
              <button
                disabled={loading}
                onClick={() => setShowDeactivateConfirm(false)}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors hover:cursor-pointer"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                onClick={() => handleDeactivateAccount()}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors hover:cursor-pointer items-center justify-center flex"
              >
               {loading ? (
                  <Loader className="h-6 w-6 animate-spin text-white" />
                ) : (
                  "Deactivate"
                )}  
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
