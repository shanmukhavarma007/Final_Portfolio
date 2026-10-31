import React, { useState, useEffect, useCallback } from 'react';
import { Github, GitCommit, GitBranch, GitPullRequest, ExternalLink, RefreshCw, Star, GitFork, ShieldCheck, Clock, AlertCircle } from 'lucide-react';

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
  default_branch: string;
}

interface GitHubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: {
    id: number;
    name: string;
    url: string;
  };
  payload: {
    action?: string;
    ref?: string;
    ref_type?: string;
    push_id?: number;
    commits?: Array<{
      sha: string;
      message: string;
      url: string;
    }>;
    pull_request?: {
      title?: string;
      html_url?: string;
      number?: number;
    };
  };
}

interface GitHubUserProfile {
  login: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  avatar_url: string;
}

export const GitHubStatus: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'activity' | 'repos'>('activity');
  const [profile, setProfile] = useState<GitHubUserProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);

  const fetchGitHubData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [profileRes, reposRes, eventsRes] = await Promise.all([
        fetch('https://api.github.com/users/shanmukhavarma007', {
          headers: { Accept: 'application/vnd.github.v3+json' }
        }),
        fetch('https://api.github.com/users/shanmukhavarma007/repos?sort=updated&per_page=6', {
          headers: { Accept: 'application/vnd.github.v3+json' }
        }),
        fetch('https://api.github.com/users/shanmukhavarma007/events/public?per_page=8', {
          headers: { Accept: 'application/vnd.github.v3+json' }
        })
      ]);

      if (!profileRes.ok && profileRes.status === 403) {
        throw new Error('GitHub API rate limit exceeded (60 requests/hr). Please retry shortly.');
      }

      if (profileRes.ok) {
        const profileData = await profileRes.json();
        setProfile(profileData);
      }

      if (reposRes.ok) {
        const reposData = await reposRes.json();
        setRepos(reposData);
      }

      if (eventsRes.ok) {
        const eventsData = await eventsRes.json();
        setEvents(eventsData);
      }

      setLastFetched(new Date());
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch GitHub telemetry';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGitHubData();
  }, [fetchGitHubData]);

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return isoString;
    }
  };

  const getEventBadge = (type: string, payload: GitHubEvent['payload']) => {
    switch (type) {
      case 'PushEvent':
        return {
          icon: <GitCommit className="w-3.5 h-3.5 text-[#cef053]" />,
          label: 'PUSH',
          desc: payload.commits?.[0]?.message || 'Code push to repository'
        };
      case 'CreateEvent':
        return {
          icon: <GitBranch className="w-3.5 h-3.5 text-[#b7d83d]" />,
          label: 'BRANCH CREATED',
          desc: `Created ${payload.ref_type || 'branch'} ${payload.ref || ''}`
        };
      case 'PullRequestEvent':
        return {
          icon: <GitPullRequest className="w-3.5 h-3.5 text-[#cef053]" />,
          label: `PR ${payload.action?.toUpperCase() || 'EVENT'}`,
          desc: payload.pull_request?.title || `Pull request #${payload.pull_request?.number || ''}`
        };
      default:
        return {
          icon: <GitCommit className="w-3.5 h-3.5 text-[#757872]" />,
          label: type.replace('Event', '').toUpperCase(),
          desc: 'Repository update'
        };
    }
  };

  return (
    <div className="border border-[#333833] bg-[#171a18] text-[#fbf9f3] overflow-hidden">
      {/* Top Header Ledger */}
      <div className="p-4 sm:p-5 bg-[#141615] border-b border-[#333833] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-[#cef053] shrink-0" />
          <div className="flex items-center gap-2">
            <Github className="w-4 h-4 text-[#cef053]" />
            <span className="font-technical text-xs sm:text-sm font-bold uppercase tracking-wider text-[#fbf9f3]">
              GITHUB TELEMETRY // @shanmukhavarma007
            </span>
          </div>
          <span className="hidden sm:inline text-[#454843]">·</span>
          <span className="hidden sm:inline font-technical text-[10px] text-[#cef053] px-1.5 py-0.5 bg-[#1b1c18] border border-[#333833]">
            LIVE API
          </span>
        </div>

        <div className="flex items-center gap-3 font-technical text-xs">
          {profile && (
            <div className="text-[11px] text-[#82857d] hidden md:block">
              REPOSITORIES: <strong className="text-[#fbf9f3]">{profile.public_repos}</strong>
            </div>
          )}

          <button
            onClick={fetchGitHubData}
            disabled={loading}
            aria-label="Refresh GitHub repository telemetry"
            className="px-2.5 py-1 bg-[#252a26] hover:bg-[#333833] text-[#c5c7be] hover:text-[#cef053] border border-[#454843] text-[11px] uppercase flex items-center gap-1.5 cursor-pointer disabled:opacity-50 transition-colors"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin text-[#cef053]' : ''}`} />
            <span>SYNC</span>
          </button>

          <a
            href="https://github.com/shanmukhavarma007"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 bg-[#1b1c18] hover:bg-[#252a26] text-[#cef053] border border-[#cef053] text-[11px] uppercase font-bold flex items-center gap-1.5 transition-colors"
          >
            <span>PROFILE</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Control Tabs: Activity vs Repos */}
      <div className="px-4 py-2 bg-[#191d1a] border-b border-[#333833] flex items-center justify-between gap-2 text-xs font-technical">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('activity')}
            className={`px-3 py-1 cursor-pointer transition-colors border ${
              activeTab === 'activity'
                ? 'bg-[#cef053] text-[#1b1c18] font-bold border-[#cef053]'
                : 'bg-[#1e221f] text-[#82857d] border-[#333833] hover:text-[#fbf9f3]'
            }`}
          >
            RECENT EVENTS & COMMITS ({events.length})
          </button>
          <button
            onClick={() => setActiveTab('repos')}
            className={`px-3 py-1 cursor-pointer transition-colors border ${
              activeTab === 'repos'
                ? 'bg-[#cef053] text-[#1b1c18] font-bold border-[#cef053]'
                : 'bg-[#1e221f] text-[#82857d] border-[#333833] hover:text-[#fbf9f3]'
            }`}
          >
            ACTIVE REPOSITORIES ({repos.length})
          </button>
        </div>

        {lastFetched && (
          <div className="text-[10px] text-[#82857d] hidden sm:flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>SYNCED: {lastFetched.toLocaleTimeString()}</span>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="p-4 sm:p-5">
        {loading && events.length === 0 && repos.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-xs font-technical text-[#82857d] space-y-2">
            <RefreshCw className="w-6 h-6 animate-spin text-[#cef053]" />
            <div>FETCHING REAL-TIME PUBLIC REPOSITORIES FROM GITHUB REST API...</div>
          </div>
        ) : error && events.length === 0 ? (
          <div className="p-4 bg-[#231717] border border-[#522b2b] text-xs font-technical space-y-2">
            <div className="flex items-center gap-2 text-[#f87171] font-bold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>GITHUB TELEMETRY NOTICE</span>
            </div>
            <p className="text-[#d8b4b4] text-[11px] leading-relaxed">
              {error}
            </p>
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={fetchGitHubData}
                className="px-3 py-1 bg-[#1b1c18] text-[#fbf9f3] hover:text-[#cef053] border border-[#454843] text-[10px] uppercase cursor-pointer"
              >
                RETRY CONNECTION
              </button>
              <a
                href="https://github.com/shanmukhavarma007"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#cef053] hover:underline text-[10px] flex items-center gap-1"
              >
                <span>OPEN GITHUB DIRECTLY</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ) : activeTab === 'activity' ? (
          /* Recent Activity Ledger */
          <div className="space-y-2.5">
            {events.length === 0 ? (
              <div className="p-4 bg-[#1e221f] border border-[#333833] text-xs font-technical text-[#82857d]">
                No public events detected recently. Visit GitHub directly to view complete historical commits.
              </div>
            ) : (
              events.map((event) => {
                const badge = getEventBadge(event.type, event.payload);
                const repoShortName = event.repo.name.replace('shanmukhavarma007/', '');
                const repoUrl = `https://github.com/${event.repo.name}`;

                return (
                  <div
                    key={event.id}
                    className="p-3 bg-[#1e221f] hover:bg-[#252a26] border border-[#333833] hover:border-[#454843] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-technical"
                  >
                    <div className="flex items-start sm:items-center gap-2.5 min-w-0">
                      <div className="p-1.5 bg-[#141615] border border-[#333833] shrink-0">
                        {badge.icon}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-[#cef053] text-[10px] px-1.5 py-0.2 bg-[#171a18] border border-[#333833]">
                            {badge.label}
                          </span>
                          <a
                            href={repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-[#fbf9f3] hover:text-[#cef053] hover:underline truncate"
                          >
                            {repoShortName}
                          </a>
                        </div>
                        <p className="text-[11px] text-[#82857d] font-sans mt-0.5 line-clamp-1">
                          {badge.desc}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#2a2e2b] text-[10px] text-[#82857d]">
                      <span>{formatDate(event.created_at)}</span>
                      <a
                        href={repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 hover:text-[#cef053] transition-colors"
                        aria-label={`Open ${repoShortName} repository on GitHub`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        ) : (
          /* Active Repositories Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {repos.map((repo) => (
              <div
                key={repo.id}
                className="p-3.5 bg-[#1e221f] hover:bg-[#252a26] border border-[#333833] hover:border-[#cef053] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-[#2d322e]">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-technical text-xs font-bold text-[#fbf9f3] group-hover:text-[#cef053] flex items-center gap-1.5 truncate"
                    >
                      <span>{repo.name}</span>
                      <ExternalLink className="w-3 h-3 shrink-0 opacity-70 group-hover:opacity-100" />
                    </a>

                    <div className="flex items-center gap-2 text-[10px] font-technical text-[#82857d]">
                      {repo.stargazers_count > 0 && (
                        <span className="flex items-center gap-0.5">
                          <Star className="w-3 h-3 text-[#cef053]" />
                          <span>{repo.stargazers_count}</span>
                        </span>
                      )}
                      {repo.fork && (
                        <span className="px-1 py-0.2 bg-[#171a18] border border-[#333833] text-[9px] uppercase">
                          FORK
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="font-sans text-xs text-[#82857d] mt-2 line-clamp-2 leading-relaxed">
                    {repo.description || 'ASIC physical design and digital architecture repository.'}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-[#2d322e] flex items-center justify-between text-[10px] font-technical text-[#82857d]">
                  <span>LANG: {repo.language || 'Verilog / Hardware'}</span>
                  <span>UPDATED: {formatDate(repo.updated_at)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Status Bar */}
      <div className="px-4 py-2.5 bg-[#141615] border-t border-[#333833] flex flex-wrap items-center justify-between gap-2 text-[10px] font-technical text-[#82857d]">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#cef053]" />
          <span>AUTHENTIC REST API TELEMETRY // REAL PUBLIC ACTIVITY</span>
        </div>
        <div className="text-[#cef053]">
          shanmukhavarma007 // VERIFIED GITHUB CHANNEL
        </div>
      </div>
    </div>
  );
};
