'use client';

import { useState, useEffect } from 'react';
import { User, Edit3, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface ProfileEditorProps {
  user: SupabaseUser;
}

interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  username: string | null;
  avatar_url: string | null;
  is_verified: boolean;
}

export default function ProfileEditor({ user }: ProfileEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editedProfile, setEditedProfile] = useState({
    full_name: '',
    username: '',
    avatar_url: '',
  });

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from('users').select('*').eq('id', user.id).single();

        if (error) {
          console.error('Error fetching profile:', error);
          // If no profile exists, create a basic one from auth user data
          const newProfile = {
            id: user.id,
            email: user.email || '',
            full_name: user.user_metadata?.full_name || null,
            username: user.user_metadata?.username || null,
            avatar_url: user.user_metadata?.avatar_url || null,
            is_verified: user.email_confirmed_at ? true : false,
          };
          setProfile(newProfile);
          setEditedProfile({
            full_name: newProfile.full_name || '',
            username: newProfile.username || '',
            avatar_url: newProfile.avatar_url || '',
          });
        } else {
          setProfile(data);
          setEditedProfile({
            full_name: data.full_name || '',
            username: data.username || '',
            avatar_url: data.avatar_url || '',
          });
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user.id, user.email, user.email_confirmed_at, user.user_metadata, supabase]);

  const handleSave = async () => {
    if (!profile) return;

    setSaving(true);
    try {
      const { error } = await supabase.from('users').upsert({
        id: user.id,
        email: user.email,
        full_name: editedProfile.full_name || null,
        username: editedProfile.username || null,
        avatar_url: editedProfile.avatar_url || null,
        updated_at: new Date().toISOString(),
      });

      if (error) {
        console.error('Error updating profile:', error);
        alert('Error updating profile. Please try again.');
      } else {
        setProfile({
          ...profile,
          full_name: editedProfile.full_name || null,
          username: editedProfile.username || null,
          avatar_url: editedProfile.avatar_url || null,
        });
        setIsEditing(false);
        router.refresh();
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setEditedProfile({
        full_name: profile.full_name || '',
        username: profile.username || '',
        avatar_url: profile.avatar_url || '',
      });
    }
    setIsEditing(false);
  };

  if (loading) {
    return (
      <section id="profile-editor" className="w-full">
        <div className="flex items-center gap-3 mb-6">
          <Edit3 size={24} className="text-primary" />
          <h2 className="font-bold text-2xl">Profile Editor</h2>
        </div>
        <div className="bg-card border rounded-lg p-6">
          <p className="text-center text-foreground/60">Loading profile...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="profile-editor" className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Edit3 size={24} className="text-primary" />
          <h2 className="font-bold text-2xl">Profile Editor</h2>
        </div>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} variant="outline">
            <Edit3 size={16} className="mr-2" />
            Edit Profile
          </Button>
        )}
      </div>

      <div className="bg-card border rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Avatar Section */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Profile Picture</Label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 flex items-center justify-center overflow-hidden">
                {(isEditing ? editedProfile.avatar_url : profile?.avatar_url) ? (
                  <Image
                    src={isEditing ? editedProfile.avatar_url : profile?.avatar_url || ''}
                    alt="Profile"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={32} className="text-primary/60" />
                )}
              </div>
              {isEditing && (
                <div className="flex-1">
                  <Label htmlFor="avatar_url" className="text-sm">
                    Avatar URL
                  </Label>
                  <Input
                    id="avatar_url"
                    type="url"
                    placeholder="https://example.com/avatar.jpg"
                    value={editedProfile.avatar_url}
                    onChange={(e) =>
                      setEditedProfile((prev) => ({ ...prev, avatar_url: e.target.value }))
                    }
                    className="mt-1"
                  />
                  <p className="text-xs text-foreground/60 mt-1">
                    Enter a URL to your profile picture
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Profile Information */}
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Email</Label>
              <Input
                type="email"
                value={profile?.email || ''}
                disabled
                className="mt-1 bg-muted/50"
              />
              <p className="text-xs text-foreground/60 mt-1">Email cannot be changed here</p>
            </div>

            <div>
              <Label htmlFor="full_name" className="text-sm font-medium">
                Full Name
              </Label>
              <Input
                id="full_name"
                type="text"
                placeholder="Enter your full name"
                value={isEditing ? editedProfile.full_name : profile?.full_name || ''}
                onChange={(e) =>
                  setEditedProfile((prev) => ({ ...prev, full_name: e.target.value }))
                }
                disabled={!isEditing}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="username" className="text-sm font-medium">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Choose a username"
                value={isEditing ? editedProfile.username : profile?.username || ''}
                onChange={(e) =>
                  setEditedProfile((prev) => ({ ...prev, username: e.target.value }))
                }
                disabled={!isEditing}
                className="mt-1"
              />
              <p className="text-xs text-foreground/60 mt-1">
                This will be your unique identifier on the platform
              </p>
            </div>

            {profile?.is_verified && (
              <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-700 dark:text-green-300 font-medium">
                  Email Verified
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex gap-3 mt-6 pt-6 border-t">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} className="mr-2" />
                  Save Changes
                </>
              )}
            </Button>
            <Button variant="outline" onClick={handleCancel} disabled={saving}>
              <X size={16} className="mr-2" />
              Cancel
            </Button>
          </div>
        )}

        {/* Profile Stats */}
        {!isEditing && (
          <div className="mt-6 pt-6 border-t">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-sm text-foreground/60">Member since</p>
                <p className="font-semibold">
                  {user.created_at ? new Date(user.created_at).getFullYear() : 'Unknown'}
                </p>
              </div>
              <div>
                <p className="text-sm text-foreground/60">Last active</p>
                <p className="font-semibold">
                  {user.last_sign_in_at
                    ? new Date(user.last_sign_in_at).toLocaleDateString()
                    : 'Never'}
                </p>
              </div>
              <div>
                <p className="text-sm text-foreground/60">Profile completion</p>
                <p className="font-semibold text-primary">
                  {Math.round(
                    (((profile?.full_name ? 1 : 0) +
                      (profile?.username ? 1 : 0) +
                      (profile?.avatar_url ? 1 : 0)) /
                      3) *
                      100
                  )}
                  %
                </p>
              </div>
              <div>
                <p className="text-sm text-foreground/60">Status</p>
                <p className="font-semibold text-green-600">Active</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
