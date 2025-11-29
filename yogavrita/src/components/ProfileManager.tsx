import React, { useState } from 'react';
import { useUserProfile } from '../hooks/UserProfileContext';
import { validateProfileInput } from '../utils/validation';
import './ProfileManager.css';

export function ProfileManager() {
  const { profile, createProfile, updateProfile, updateSchedule } = useUserProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    email: profile?.email || '',
    scheduledTime: profile?.scheduledTime || ''
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateProfileInput({
      name: formData.name,
      email: formData.email,
      scheduledTime: formData.scheduledTime || null
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors([]);

    if (!profile) {
      // Create new profile
      createProfile(formData.name, formData.email);
      if (formData.scheduledTime) {
        // Schedule will be set after profile is created
        setTimeout(() => {
          updateSchedule(formData.scheduledTime || null);
        }, 100);
      }
    } else {
      // Update existing profile
      updateProfile({
        name: formData.name,
        email: formData.email
      });
      updateSchedule(formData.scheduledTime || null);
      setIsEditing(false);
    }
  };

  const handleEdit = () => {
    if (profile) {
      setFormData({
        name: profile.name,
        email: profile.email,
        scheduledTime: profile.scheduledTime || ''
      });
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrors([]);
    if (profile) {
      setFormData({
        name: profile.name,
        email: profile.email,
        scheduledTime: profile.scheduledTime || ''
      });
    }
  };

  // Show creation form if no profile exists
  if (!profile) {
    return (
      <div className="profile-manager">
        <div className="profile-card">
          <h1 className="app-title">YOGAVRITA</h1>
          <h2>Create Your Profile</h2>
          <form onSubmit={handleSubmit} className="profile-form">
            {errors.length > 0 && (
              <div className="error-messages">
                {errors.map((error, index) => (
                  <p key={index} className="error-message">{error}</p>
                ))}
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="scheduledTime">Practice Time (Optional)</label>
              <input
                id="scheduledTime"
                type="time"
                value={formData.scheduledTime}
                onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
              />
              <small>Set a daily reminder for your practice</small>
            </div>

            <button type="submit" className="btn btn-primary">
              Create Profile
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Show profile display or edit form
  if (isEditing) {
    return (
      <div className="profile-manager">
        <div className="profile-card">
          <h2>Edit Profile</h2>
          <form onSubmit={handleSubmit} className="profile-form">
            {errors.length > 0 && (
              <div className="error-messages">
                {errors.map((error, index) => (
                  <p key={index} className="error-message">{error}</p>
                ))}
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="scheduledTime">Practice Time</label>
              <input
                id="scheduledTime"
                type="time"
                value={formData.scheduledTime}
                onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
              />
            </div>

            <div className="form-actions">
              <button type="button" onClick={handleCancel} className="btn btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Display profile
  return (
    <div className="profile-display">
      <div className="profile-header">
        <h2>{profile.name}</h2>
        <button onClick={handleEdit} className="btn btn-secondary">
          Edit Profile
        </button>
      </div>
      
      <div className="profile-info">
        <div className="info-item">
          <span className="label">Email:</span>
          <span className="value">{profile.email}</span>
        </div>
        
        {profile.scheduledTime && (
          <div className="info-item">
            <span className="label">Practice Time:</span>
            <span className="value">{profile.scheduledTime}</span>
          </div>
        )}
        
        <div className="info-item">
          <span className="label">Member Since:</span>
          <span className="value">
            {new Date(profile.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="streak-info">
        <div className="streak-item">
          <div className="streak-number">{profile.currentStreak}</div>
          <div className="streak-label">Current Streak</div>
        </div>
        <div className="streak-item">
          <div className="streak-number">{profile.longestStreak}</div>
          <div className="streak-label">Longest Streak</div>
        </div>
        <div className="streak-item">
          <div className="streak-number">{profile.completedSessions.length}</div>
          <div className="streak-label">Total Sessions</div>
        </div>
      </div>
    </div>
  );
}
