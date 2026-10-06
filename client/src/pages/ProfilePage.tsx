import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { userService } from '../services/userService';

export const ProfilePage: React.FC = () => {
  const { user, login } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const res = await userService.getProfile();
        setName(res.data.user.name);
        setBio(res.data.user.bio || '');
        setAvatarUrl(res.data.user.avatarUrl || '');
      } catch (err) {
        console.error('Failed to fetch profile', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleAvatarUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('avatar', selectedFile);

    try {
      setIsUploading(true);
      setMessage(null);
      const res = await userService.uploadAvatar(formData);
      setAvatarUrl(res.data.avatarUrl);
      setSelectedFile(null);
      setPreviewUrl(null);
      setMessage({ type: 'success', text: 'Profile picture updated successfully!' });

      const token = localStorage.getItem('token');
      if (token && user) {
        login(token, { ...user, avatarUrl: res.data.avatarUrl });
      }
    } catch (err: any) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to upload image. Please try again.',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setMessage(null);
      const res = await userService.updateProfile({ name, bio });
      setMessage({ type: 'success', text: 'Profile information updated successfully!' });

      const token = localStorage.getItem('token');
      if (token && user) {
        login(token, { ...user, name: res.data.user.name, bio: res.data.user.bio });
      }
    } catch (err: any) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to update profile info.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-4">
      <div className="bg-slate-900 text-white p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h1 className="text-3xl font-black">Account Settings & Profile</h1>
        <p className="text-slate-400 text-sm mt-1">
          Manage your personal details and public profile avatar.
        </p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-sm font-semibold border ${
            message.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-red-50 text-red-800 border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Avatar Section */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
          Profile Avatar
        </h2>

        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="relative">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-24 h-24 rounded-full object-cover ring-4 ring-red-500/30"
              />
            ) : avatarUrl ? (
              <img
                src={avatarUrl}
                alt={name}
                className="w-24 h-24 rounded-full object-cover ring-4 ring-slate-200"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-slate-800 text-white text-3xl font-black flex items-center justify-center ring-4 ring-slate-200">
                {name?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
          </div>

          <div className="space-y-3 text-center sm:text-left flex-1">
            <div>
              <p className="text-sm font-semibold text-slate-800">Upload new avatar</p>
              <p className="text-xs text-slate-500">Supports JPG, PNG, or WEBP up to 5MB.</p>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <label className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-4 py-2 rounded-xl cursor-pointer transition border border-slate-300">
                Choose Image File
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {selectedFile && (
                <button
                  type="button"
                  onClick={handleAvatarUpload}
                  disabled={isUploading}
                  className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs font-bold px-5 py-2 rounded-xl shadow transition"
                >
                  {isUploading ? 'Uploading with Axios...' : 'Upload & Save'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Details Form */}
      <form onSubmit={handleProfileSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
          Personal Information
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
              Email Address (Read-only)
            </label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="w-full p-3 text-sm bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
              Bio / Short Description
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell other news readers a bit about yourself..."
              maxLength={200}
              className="w-full p-3 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow transition"
          >
            {isLoading ? 'Saving Changes...' : 'Save Profile Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};
