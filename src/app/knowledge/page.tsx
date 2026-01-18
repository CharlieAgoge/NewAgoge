'use client';

import { useState, type ReactElement } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { mockKBSpaces, mockKBPages, mockKBTemplates, mockTeamMembers } from '@/lib/mockData';
import type { KBSpace, KBPage } from '@/types';

type ViewMode = 'spaces' | 'space' | 'page' | 'create';

// Helper to render markdown-like content
function renderContent(content: string) {
  // Simple markdown rendering (in production, use react-markdown or similar)
  const lines = content.split('\n');
  const elements: ReactElement[] = [];
  let inCodeBlock = false;
  let codeContent = '';
  let codeLanguage = '';
  let inTable = false;
  let tableRows: string[][] = [];

  lines.forEach((line, index) => {
    // Code blocks
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <pre key={`code-${index}`} className="bg-[#0a0e14] p-4 rounded-lg overflow-x-auto my-4 text-sm">
            <code className="text-slate-300">{codeContent}</code>
          </pre>
        );
        codeContent = '';
        inCodeBlock = false;
      } else {
        codeLanguage = line.slice(3);
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeContent += (codeContent ? '\n' : '') + line;
      return;
    }

    // Tables
    if (line.startsWith('|')) {
      if (!inTable) {
        inTable = true;
        tableRows = [];
      }
      const cells = line.split('|').filter(c => c.trim());
      if (!line.includes('---')) {
        tableRows.push(cells.map(c => c.trim()));
      }
      return;
    } else if (inTable) {
      // Render the table
      elements.push(
        <div key={`table-${index}`} className="overflow-x-auto my-4">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-[#2d3548]">
                {tableRows[0]?.map((cell, i) => (
                  <th key={i} className="px-4 py-2 text-left text-slate-400 font-medium">{cell}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-[#2d3548]/50">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-4 py-2 text-slate-300">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      inTable = false;
      tableRows = [];
    }

    // Headers
    if (line.startsWith('# ')) {
      elements.push(<h1 key={index} className="text-2xl font-bold text-white mt-6 mb-4">{line.slice(2)}</h1>);
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={index} className="text-xl font-semibold text-white mt-5 mb-3">{line.slice(3)}</h2>);
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={index} className="text-lg font-medium text-white mt-4 mb-2">{line.slice(4)}</h3>);
    }
    // List items
    else if (line.startsWith('- [ ] ')) {
      elements.push(
        <div key={index} className="flex items-center gap-2 ml-4 my-1">
          <input type="checkbox" className="w-4 h-4 rounded border-slate-500" disabled />
          <span className="text-slate-300">{line.slice(6)}</span>
        </div>
      );
    } else if (line.startsWith('- [x] ')) {
      elements.push(
        <div key={index} className="flex items-center gap-2 ml-4 my-1">
          <input type="checkbox" className="w-4 h-4 rounded border-slate-500" checked disabled />
          <span className="text-slate-300 line-through">{line.slice(6)}</span>
        </div>
      );
    } else if (line.startsWith('- ')) {
      elements.push(
        <li key={index} className="ml-6 text-slate-300 list-disc my-1">{line.slice(2)}</li>
      );
    } else if (/^\d+\. /.test(line)) {
      const content = line.replace(/^\d+\. /, '');
      elements.push(
        <li key={index} className="ml-6 text-slate-300 list-decimal my-1">{content}</li>
      );
    }
    // Bold text
    else if (line.includes('**')) {
      const parts = line.split(/\*\*([^*]+)\*\*/g);
      elements.push(
        <p key={index} className="text-slate-300 my-2">
          {parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="text-white">{part}</strong> : part)}
        </p>
      );
    }
    // Inline code
    else if (line.includes('`')) {
      const parts = line.split(/`([^`]+)`/g);
      elements.push(
        <p key={index} className="text-slate-300 my-2">
          {parts.map((part, i) => i % 2 === 1 ? <code key={i} className="bg-[#0a0e14] px-1.5 py-0.5 rounded text-[#3EBBB7] text-sm">{part}</code> : part)}
        </p>
      );
    }
    // Regular paragraph
    else if (line.trim()) {
      elements.push(<p key={index} className="text-slate-300 my-2">{line}</p>);
    }
    // Empty line
    else {
      elements.push(<div key={index} className="h-2" />);
    }
  });

  return elements;
}

export default function KnowledgeBasePage() {
  const [viewMode, setViewMode] = useState<ViewMode>('spaces');
  const [selectedSpace, setSelectedSpace] = useState<KBSpace | null>(null);
  const [selectedPage, setSelectedPage] = useState<KBPage | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter pages by search
  const filteredPages = mockKBPages.filter(page =>
    page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.labels.some(label => label.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Get pages for a space
  const getSpacePages = (spaceId: string) => {
    return mockKBPages.filter(page => page.spaceId === spaceId && page.status === 'published');
  };

  // Get author name
  const getAuthorName = (userId: string) => {
    const member = mockTeamMembers.find(m => m.id === userId);
    return member?.name || 'Unknown';
  };

  // Get role badge color
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500/20 text-red-400';
      case 'ambassador': return 'bg-purple-500/20 text-purple-400';
      case 'lead': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  // Featured pages (across all spaces)
  const featuredPages = mockKBPages.filter(page => page.isFeatured && page.status === 'published');

  // Recently updated pages
  const recentPages = [...mockKBPages]
    .filter(p => p.status === 'published')
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-1">
              <button onClick={() => { setViewMode('spaces'); setSelectedSpace(null); setSelectedPage(null); }} className="hover:text-white">
                Knowledge Base
              </button>
              {selectedSpace && (
                <>
                  <span>/</span>
                  <button onClick={() => { setViewMode('space'); setSelectedPage(null); }} className="hover:text-white">
                    {selectedSpace.name}
                  </button>
                </>
              )}
              {selectedPage && (
                <>
                  <span>/</span>
                  <span className="text-slate-300">{selectedPage.title}</span>
                </>
              )}
            </div>
            <h1 className="text-2xl font-bold text-white">
              {viewMode === 'page' && selectedPage ? selectedPage.title :
               viewMode === 'space' && selectedSpace ? selectedSpace.name :
               'Knowledge Base'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search pages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 px-4 py-2 pl-10 bg-[#1a1f2e] border border-[#2d3548] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#3EBBB7]"
              />
              <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {/* Create Button */}
            <button className="px-4 py-2 bg-gradient-to-r from-[#3EBBB7] to-[#41DC7A] text-[#11151C] rounded-lg font-medium hover:opacity-90 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Page
            </button>
          </div>
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white mb-3">Search Results ({filteredPages.length})</h2>
            <div className="space-y-2">
              {filteredPages.map(page => {
                const space = mockKBSpaces.find(s => s.id === page.spaceId);
                return (
                  <button
                    key={page.id}
                    onClick={() => {
                      setSelectedSpace(space || null);
                      setSelectedPage(page);
                      setViewMode('page');
                      setSearchQuery('');
                    }}
                    className="w-full text-left p-4 bg-[#1a1f2e] rounded-lg hover:bg-[#1a1f2e]/80 border border-[#2d3548]"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{space?.icon}</span>
                      <span className="text-sm text-slate-400">{space?.name}</span>
                    </div>
                    <h3 className="text-white font-medium">{page.title}</h3>
                    {page.excerpt && <p className="text-sm text-slate-400 mt-1 line-clamp-1">{page.excerpt}</p>}
                    <div className="flex items-center gap-2 mt-2">
                      {page.labels.slice(0, 3).map(label => (
                        <span key={label} className="px-2 py-0.5 text-xs rounded bg-[#3EBBB7]/20 text-[#3EBBB7]">{label}</span>
                      ))}
                    </div>
                  </button>
                );
              })}
              {filteredPages.length === 0 && (
                <p className="text-slate-400 text-center py-8">No pages found matching &quot;{searchQuery}&quot;</p>
              )}
            </div>
          </div>
        )}

        {/* Spaces View */}
        {!searchQuery && viewMode === 'spaces' && (
          <>
            {/* Spaces Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {mockKBSpaces.map(space => {
                const pageCount = getSpacePages(space.id).length;
                return (
                  <button
                    key={space.id}
                    onClick={() => { setSelectedSpace(space); setViewMode('space'); }}
                    className="p-5 bg-[#1a1f2e] rounded-xl border border-[#2d3548] hover:border-[#3EBBB7]/50 text-left transition-all group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl" style={{ backgroundColor: `${space.color}20` }}>
                        {space.icon}
                      </div>
                      {space.visibility === 'restricted' && (
                        <span className="px-2 py-1 text-xs rounded bg-amber-500/20 text-amber-400">Restricted</span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-white mt-4 group-hover:text-[#3EBBB7]">{space.name}</h3>
                    <p className="text-sm text-slate-400 mt-1 line-clamp-2">{space.description}</p>
                    <div className="flex items-center gap-4 mt-4 text-sm text-slate-500">
                      <span>{pageCount} pages</span>
                      <span className="px-2 py-0.5 rounded bg-slate-700/50">{space.key}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Featured Pages */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Featured Pages
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {featuredPages.slice(0, 4).map(page => {
                  const space = mockKBSpaces.find(s => s.id === page.spaceId);
                  return (
                    <button
                      key={page.id}
                      onClick={() => {
                        setSelectedSpace(space || null);
                        setSelectedPage(page);
                        setViewMode('page');
                      }}
                      className="p-4 bg-[#1a1f2e] rounded-lg border border-[#2d3548] hover:border-[#3EBBB7]/50 text-left"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span>{space?.icon}</span>
                        <span className="text-sm text-slate-400">{space?.name}</span>
                      </div>
                      <h3 className="text-white font-medium">{page.title}</h3>
                      {page.excerpt && <p className="text-sm text-slate-400 mt-1 line-clamp-2">{page.excerpt}</p>}
                      <div className="flex items-center gap-3 mt-3 text-xs text-slate-500">
                        <span>{page.viewCount} views</span>
                        <span>{page.likes.length} likes</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Recently Updated */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#3EBBB7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Recently Updated
              </h2>
              <div className="bg-[#1a1f2e] rounded-lg border border-[#2d3548] divide-y divide-[#2d3548]">
                {recentPages.map(page => {
                  const space = mockKBSpaces.find(s => s.id === page.spaceId);
                  const author = mockTeamMembers.find(m => m.id === page.lastEditedBy);
                  return (
                    <button
                      key={page.id}
                      onClick={() => {
                        setSelectedSpace(space || null);
                        setSelectedPage(page);
                        setViewMode('page');
                      }}
                      className="w-full p-4 flex items-center justify-between hover:bg-white/5 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{space?.icon}</span>
                        <div>
                          <h3 className="text-white font-medium">{page.title}</h3>
                          <p className="text-sm text-slate-400">{space?.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-300">{author?.name}</p>
                        <p className="text-xs text-slate-500">
                          {new Date(page.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Templates */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#41DC7A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
                Page Templates
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {mockKBTemplates.map(template => (
                  <button
                    key={template.id}
                    className="p-4 bg-[#1a1f2e] rounded-lg border border-[#2d3548] hover:border-[#41DC7A]/50 text-left"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#41DC7A]/20 flex items-center justify-center mb-3">
                      <svg className="w-5 h-5 text-[#41DC7A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-white font-medium text-sm">{template.name}</h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{template.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Space View */}
        {!searchQuery && viewMode === 'space' && selectedSpace && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Space Info Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-[#1a1f2e] rounded-xl border border-[#2d3548] p-5 sticky top-24">
                <div className="w-14 h-14 rounded-lg flex items-center justify-center text-3xl mb-4" style={{ backgroundColor: `${selectedSpace.color}20` }}>
                  {selectedSpace.icon}
                </div>
                <h2 className="text-lg font-semibold text-white">{selectedSpace.name}</h2>
                <p className="text-sm text-slate-400 mt-2">{selectedSpace.description}</p>

                <div className="mt-4 pt-4 border-t border-[#2d3548]">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-slate-400">Space Key</span>
                    <span className="text-white font-mono">{selectedSpace.key}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-slate-400">Visibility</span>
                    <span className={`px-2 py-0.5 rounded text-xs ${selectedSpace.visibility === 'public' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}`}>
                      {selectedSpace.visibility}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Owner</span>
                    <span className="text-white">{getAuthorName(selectedSpace.ownerId)}</span>
                  </div>
                </div>

                {selectedSpace.visibility === 'restricted' && selectedSpace.allowedRoles && (
                  <div className="mt-4 pt-4 border-t border-[#2d3548]">
                    <p className="text-sm text-slate-400 mb-2">Access Restricted To:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedSpace.allowedRoles.map(role => (
                        <span key={role} className={`px-2 py-1 text-xs rounded ${getRoleBadgeColor(role)}`}>
                          {role === 'ambassador' ? 'Ambassador' : role}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Pages List */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Pages ({getSpacePages(selectedSpace.id).length})</h2>
                <button className="px-3 py-1.5 text-sm bg-[#3EBBB7]/20 text-[#3EBBB7] rounded-lg hover:bg-[#3EBBB7]/30">
                  + Add Page
                </button>
              </div>
              <div className="space-y-3">
                {getSpacePages(selectedSpace.id).map(page => {
                  const author = mockTeamMembers.find(m => m.id === page.author);
                  const childPages = mockKBPages.filter(p => p.parentId === page.id);
                  return (
                    <div key={page.id}>
                      <button
                        onClick={() => { setSelectedPage(page); setViewMode('page'); }}
                        className="w-full p-4 bg-[#1a1f2e] rounded-lg border border-[#2d3548] hover:border-[#3EBBB7]/50 text-left"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="text-white font-medium">{page.title}</h3>
                              {page.isFeatured && (
                                <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                </svg>
                              )}
                            </div>
                            {page.excerpt && <p className="text-sm text-slate-400 mt-1 line-clamp-2">{page.excerpt}</p>}
                            <div className="flex items-center gap-3 mt-3">
                              {page.labels.map(label => (
                                <span key={label} className="px-2 py-0.5 text-xs rounded bg-[#3EBBB7]/20 text-[#3EBBB7]">{label}</span>
                              ))}
                            </div>
                          </div>
                          <div className="text-right ml-4">
                            <p className="text-sm text-slate-400">{author?.name}</p>
                            <p className="text-xs text-slate-500">{new Date(page.updatedAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#2d3548] text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            {page.viewCount}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            {page.likes.length}
                          </span>
                          {childPages.length > 0 && (
                            <span className="flex items-center gap-1">
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              {childPages.length} child pages
                            </span>
                          )}
                        </div>
                      </button>
                      {/* Child pages */}
                      {childPages.length > 0 && (
                        <div className="ml-6 mt-2 space-y-2">
                          {childPages.map(childPage => (
                            <button
                              key={childPage.id}
                              onClick={() => { setSelectedPage(childPage); setViewMode('page'); }}
                              className="w-full p-3 bg-[#1a1f2e]/50 rounded-lg border border-[#2d3548]/50 hover:border-[#3EBBB7]/30 text-left flex items-center gap-3"
                            >
                              <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                              <span className="text-slate-300">{childPage.title}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Page View */}
        {!searchQuery && viewMode === 'page' && selectedPage && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-[#1a1f2e] rounded-xl border border-[#2d3548] p-6">
                {/* Page Header */}
                <div className="flex items-start justify-between mb-6 pb-6 border-b border-[#2d3548]">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {selectedPage.labels.map(label => (
                        <span key={label} className="px-2 py-0.5 text-xs rounded bg-[#3EBBB7]/20 text-[#3EBBB7]">{label}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <span>By {getAuthorName(selectedPage.author)}</span>
                      <span>Updated {new Date(selectedPage.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    <button className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Page Content */}
                <div className="prose prose-invert max-w-none">
                  {renderContent(selectedPage.content)}
                </div>

                {/* Page Footer */}
                <div className="mt-8 pt-6 border-t border-[#2d3548] flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {selectedPage.viewCount} views
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {selectedPage.likes.length} likes
                    </span>
                  </div>
                  <button className="px-4 py-2 bg-[#3EBBB7]/20 text-[#3EBBB7] rounded-lg hover:bg-[#3EBBB7]/30 text-sm font-medium flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Like this page
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              {/* Page Info */}
              <div className="bg-[#1a1f2e] rounded-xl border border-[#2d3548] p-4">
                <h3 className="text-sm font-medium text-white mb-3">Page Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Status</span>
                    <span className={`px-2 py-0.5 rounded text-xs ${selectedPage.status === 'published' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}`}>
                      {selectedPage.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Created</span>
                    <span className="text-slate-300">{new Date(selectedPage.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Last edit by</span>
                    <span className="text-slate-300">{getAuthorName(selectedPage.lastEditedBy)}</span>
                  </div>
                </div>
              </div>

              {/* Related Pages */}
              <div className="bg-[#1a1f2e] rounded-xl border border-[#2d3548] p-4">
                <h3 className="text-sm font-medium text-white mb-3">Other Pages in Space</h3>
                <div className="space-y-2">
                  {getSpacePages(selectedPage.spaceId)
                    .filter(p => p.id !== selectedPage.id)
                    .slice(0, 5)
                    .map(page => (
                      <button
                        key={page.id}
                        onClick={() => setSelectedPage(page)}
                        className="w-full text-left p-2 rounded hover:bg-white/5 text-sm text-slate-300 hover:text-white"
                      >
                        {page.title}
                      </button>
                    ))}
                </div>
              </div>

              {/* Contributors */}
              <div className="bg-[#1a1f2e] rounded-xl border border-[#2d3548] p-4">
                <h3 className="text-sm font-medium text-white mb-3">Contributors</h3>
                <div className="flex -space-x-2">
                  {[selectedPage.author, selectedPage.lastEditedBy]
                    .filter((v, i, a) => a.indexOf(v) === i)
                    .map(userId => {
                      const member = mockTeamMembers.find(m => m.id === userId);
                      return member && (
                        <div
                          key={userId}
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3EBBB7] to-[#41DC7A] flex items-center justify-center text-xs font-medium text-[#11151C] border-2 border-[#1a1f2e]"
                          title={member.name}
                        >
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
