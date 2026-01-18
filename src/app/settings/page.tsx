'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )},
    { id: 'notifications', label: 'Notifications', icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    )},
    { id: 'security', label: 'Security', icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    )},
    { id: 'appearance', label: 'Appearance', icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    )},
    { id: 'integrations', label: 'Integrations', icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    )},
  ];

  return (
    <DashboardLayout
      title="Settings"
      subtitle="Manage your account settings and preferences."
    >
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <Card>
            <CardContent className="p-2">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                      ${activeTab === tab.id
                        ? 'bg-[#3EBBB7]/20 text-[#3EBBB7]'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }
                    `}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-6">
          {activeTab === 'profile' && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal details and photo.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-6 mb-6">
                    <Avatar name="Charlie Peter" size="xl" />
                    <div>
                      <Button variant="secondary" size="sm">Change Photo</Button>
                      <p className="text-xs text-slate-500 mt-2">JPG, GIF or PNG. Max size 2MB.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="First Name" defaultValue="Charlie" />
                    <Input label="Last Name" defaultValue="Peter" />
                    <Input label="Email" defaultValue="charlie@devsecai.io" />
                    <Input label="Role" defaultValue="Admin" disabled />
                    <div className="md:col-span-2">
                      <Input label="Bio" defaultValue="Founder & CEO at DevSecAI" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-[#2d3548]">
                    <Button variant="secondary">Cancel</Button>
                    <Button>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Department</CardTitle>
                  <CardDescription>Your department and team assignment.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 bg-[#11151C] rounded-lg">
                    <div>
                      <p className="font-medium text-white">Engineering</p>
                      <p className="text-sm text-slate-400">DevSecAI Core Team</p>
                    </div>
                    <Badge variant="info">Admin</Badge>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive notifications.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { title: 'Task Assignments', description: 'Get notified when you are assigned to a task' },
                    { title: 'Task Comments', description: 'Get notified when someone comments on your tasks' },
                    { title: 'Project Updates', description: 'Get notified about project status changes' },
                    { title: 'Team Activity', description: 'Get notified about team member activity' },
                    { title: 'Weekly Summary', description: 'Receive a weekly summary of your progress' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-4 border-b border-[#2d3548] last:border-0">
                      <div>
                        <p className="font-medium text-white">{item.title}</p>
                        <p className="text-sm text-slate-400">{item.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-[#2d3548] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3EBBB7]"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'security' && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your password to keep your account secure.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-w-md">
                    <Input label="Current Password" type="password" />
                    <Input label="New Password" type="password" />
                    <Input label="Confirm New Password" type="password" />
                  </div>
                  <div className="flex justify-end mt-6 pt-6 border-t border-[#2d3548]">
                    <Button>Update Password</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>Add an extra layer of security to your account.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 bg-[#11151C] rounded-lg">
                    <div>
                      <p className="font-medium text-white">Authenticator App</p>
                      <p className="text-sm text-slate-400">Use an authenticator app to generate codes</p>
                    </div>
                    <Button variant="secondary">Enable</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Active Sessions</CardTitle>
                  <CardDescription>Manage your active sessions across devices.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { device: 'MacBook Pro', location: 'London, UK', current: true },
                      { device: 'iPhone 15', location: 'London, UK', current: false },
                    ].map((session, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-[#11151C] rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-[#1a1f2e] flex items-center justify-center">
                            <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-white">{session.device}</p>
                            <p className="text-sm text-slate-400">{session.location}</p>
                          </div>
                        </div>
                        {session.current ? (
                          <Badge variant="success">Current</Badge>
                        ) : (
                          <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                            Revoke
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === 'appearance' && (
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize how the portal looks.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <p className="font-medium text-white mb-3">Theme</p>
                    <div className="flex gap-4">
                      {[
                        { name: 'Dark', value: 'dark', active: true },
                        { name: 'Light', value: 'light', active: false },
                        { name: 'System', value: 'system', active: false },
                      ].map((theme) => (
                        <button
                          key={theme.value}
                          className={`
                            px-6 py-3 rounded-lg border transition-colors
                            ${theme.active
                              ? 'border-[#3EBBB7] bg-[#3EBBB7]/10 text-[#3EBBB7]'
                              : 'border-[#2d3548] text-slate-400 hover:border-[#3d4558]'
                            }
                          `}
                        >
                          {theme.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="font-medium text-white mb-3">Accent Color</p>
                    <div className="flex gap-3">
                      {[
                        { color: '#3EBBB7', active: true },
                        { color: '#41DC7A', active: false },
                        { color: '#8B5CF6', active: false },
                        { color: '#F59E0B', active: false },
                        { color: '#EF4444', active: false },
                      ].map((item, index) => (
                        <button
                          key={index}
                          className={`w-10 h-10 rounded-full transition-transform ${item.active ? 'ring-2 ring-white ring-offset-2 ring-offset-[#11151C] scale-110' : 'hover:scale-105'}`}
                          style={{ backgroundColor: item.color }}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="font-medium text-white mb-3">Sidebar Position</p>
                    <div className="flex gap-4">
                      {['Left', 'Right'].map((position) => (
                        <button
                          key={position}
                          className={`
                            px-6 py-3 rounded-lg border transition-colors
                            ${position === 'Left'
                              ? 'border-[#3EBBB7] bg-[#3EBBB7]/10 text-[#3EBBB7]'
                              : 'border-[#2d3548] text-slate-400 hover:border-[#3d4558]'
                            }
                          `}
                        >
                          {position}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'integrations' && (
            <Card>
              <CardHeader>
                <CardTitle>Connected Integrations</CardTitle>
                <CardDescription>Manage your connected apps and services.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'GitHub', description: 'Connect your repositories for automatic security scanning', connected: true, icon: '🔗' },
                    { name: 'Slack', description: 'Get notifications directly in Slack', connected: true, icon: '💬' },
                    { name: 'Jira', description: 'Sync tasks with Jira issues', connected: false, icon: '📋' },
                    { name: 'AWS', description: 'Monitor your AWS infrastructure', connected: false, icon: '☁️' },
                    { name: 'Azure DevOps', description: 'Integrate with Azure DevOps pipelines', connected: false, icon: '🔷' },
                  ].map((integration, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-[#11151C] rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-[#1a1f2e] flex items-center justify-center text-2xl">
                          {integration.icon}
                        </div>
                        <div>
                          <p className="font-medium text-white">{integration.name}</p>
                          <p className="text-sm text-slate-400">{integration.description}</p>
                        </div>
                      </div>
                      {integration.connected ? (
                        <div className="flex items-center gap-3">
                          <Badge variant="success">Connected</Badge>
                          <Button variant="ghost" size="sm" className="text-slate-400">
                            Configure
                          </Button>
                        </div>
                      ) : (
                        <Button variant="secondary" size="sm">Connect</Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
