import { useEffect, useState } from 'react';
import {
  Award, Bell, Blocks, Braces, CalendarDays, ChevronDown, CircleDot,
  Clock3, Code2, Crown, GitFork, Home, RefreshCw, Search, Star,
  Trophy, User, UserRoundCheck, Users, FolderGit2, Menu, X, AlertCircle,
  GitPullRequest, ExternalLink, SlidersHorizontal, Upload, Archive, Heart,
  Rocket, Share2, Lock, FileText, Medal, CheckCircle2,
} from 'lucide-react';
import {
  Bar, BarChart as RechartsBarChart, CartesianGrid, Cell, Line,
  LineChart as RechartsLineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import logo from './assets/logo.png';
import './overrides.css';
import './metric-overrides.css';
import './profile.css';
import './profile-dynamic.css';
import './achievement-layout.css';

const iconMap = { home: Home, repo: FolderGit2, code: Code2, award: Award, user: UserRoundCheck, users: Users, star: Star, fork: GitFork, trophy: Trophy, clock: Clock3, calendar: CalendarDays, blocks: Blocks, refresh: RefreshCw, search: Search, bell: Bell, js: Braces, crown: Crown };
function Icon({ name, size = 20 }) { const Glyph = iconMap[name] || CircleDot; return <Glyph className="icon" size={size} strokeWidth={2} aria-hidden="true" />; }

const navigation = [['home', 'Overview'], ['repo', 'Repositories'], ['code', 'Languages'], ['award', 'Achievements'], ['user', 'Profile']];
const repoCards = [
  ['star', 'Most Starred Repo', 'AI-Resume-Builder', '☆ 182', 'amber'],
  ['fork', 'Most Forked Repo', 'Travel-Tracker', '⌘ 45 Forks', 'violet'],
  ['trophy', 'Largest Repo', 'ML-Playground', '420 MB', 'blue'],
  ['clock', 'Recently Active Repo', 'DevPortfolio', 'Updated 2 hours ago', 'green'],
  ['calendar', 'Oldest Repo', 'My-First-Repo', 'Created on 12 Jan 2024', 'pink'],
  ['calendar', 'Oldest Repo', 'My-First-Repo', 'Created on 12 Jan 2024', 'pink'],
];
const activity = [
  ['blocks', 'Repositories Created', 'This Year', '14', '+27%', 'violet'],
  ['award', 'Repositories Updated', 'This Year', '36', '+16%', 'amber'],
  ['clock', 'Inactive Repos', '(No Update > 1 year)', '5', '-5%', 'pink'],
  ['refresh', 'Recently Active Repos', '(Updated in last 30 days)', '15', '+6%', 'green'],
];
const stacks = [['React', 'violet'], ['Node.js', 'pink'], ['TypeScript', 'orange'], ['Tailwind CSS', 'blue'], ['MongoDB', 'green']];
const years = ['2020', '2021', '2022', '2023', '2024', '2025', '2026'];
const languageColors = ['#ffad19', '#345aed', '#e427a5', '#21d64e', '#f15b0a'];
const languageFallback = [
  { name: 'Javascript', value: 38 }, { name: 'Python', value: 12 }, { name: 'TypeScript', value: 18 },
  { name: 'CSS', value: 17 }, { name: 'Other', value: 15 },
];
const healthFallback = {
  score: 75,
  factors: [['ReadMe', 70], ['Desc', 60], ['Topics', 90], ['License', 40], ['Updates', 70], ['Stars', 80]],
  repositoryCount: 78,
};

function Logo() { return <div className="brand"><img src={logo} alt="GitInsight" /><span>GitInsight</span></div>; }
function Card({ className = '', children }) { return <section className={`card ${className}`}>{children}</section>; }
function Sidebar({ activePage = 'Overview', onNavigate = () => {} }) { return <aside className="sidebar"><Logo /><nav>{navigation.map(([icon, label]) => <button className={activePage === label ? 'active' : ''} onClick={() => onNavigate(label)} key={label}><Icon name={icon} />{label}</button>)}</nav></aside>; }
function MenuButton({ onClick }) { return <button className="menu-button" onClick={onClick} aria-label="Open menu"><Menu size={38} /></button>; }
function Header({ onMenu, username, onSearch }) { const [query, setQuery] = useState(username); const submit = event => { event.preventDefault(); const nextUsername = query.trim().replace(/^@/, ''); if (nextUsername) onSearch(nextUsername); }; return <header className="topbar"><div className="mobile-title"><Logo /><span>Overview</span></div><div className="desktop-title"><h1>Overview</h1><p>Complete analytics overview of {username}’s GitHub profile</p></div><div className="actions"><form className="search" onSubmit={submit}><Icon name="search" size={18} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search GitHub username" aria-label="GitHub username" /><button type="submit">Search</button></form><div className="avatar">A</div></div><MenuButton onClick={onMenu} /></header>; }
function Profile() { const stats = [['repo', '87', 'Repositories', 'blue'], ['users', '1.2K', 'Followers', 'amber'], ['user', '230', 'Following', 'violet'], ['star', '2.48K', 'Total Stars', 'green']]; return <Card className="profile-card"><div className="profile"><div className="profile-avatar"><span /></div><div><h2>Aditi Chaudhary</h2><p>aditichaudhary05</p><p>Full Stack Developer | UI/UX designer</p><strong>▣ Joined Oct 2024</strong></div></div><div className="stats">{stats.map(([icon, value, label, tone]) => <div className="stat" key={label}><span className={`round ${tone}`}><Icon name={icon} /></span><div><b>{value}</b><small>{label}</small></div></div>)}</div></Card>; }
function RepoCard({ data }) { const [icon, title, repo, meta, tone] = data; return <Card className="repo-card"><div className={`repo-label ${tone}`}><Icon name={icon} size={19} />{title}</div><h3>{repo}</h3><p>{meta}</p></Card>; }
function LanguageChart({ data = languageFallback, total = 8 }) { return <Card className="languages"><h2>Language Distribution</h2><div className="language-content"><div className="donut"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={data} dataKey="value" nameKey="name" innerRadius="69%" outerRadius="100%" stroke="none" paddingAngle={0}>{data.map((item, index) => <Cell key={item.name} fill={languageColors[index % languageColors.length]} />)}</Pie><Tooltip formatter={(value, name) => [`${value}%`, name]} contentStyle={{ background: '#070e1a', border: '1px solid #2c3342', borderRadius: 5, fontSize: 11 }} /></PieChart></ResponsiveContainer></div><div className="legend">{data.map((item, index) => <div key={item.name}><i style={{ background: languageColors[index % languageColors.length] }} /><span>{item.name}</span><b>{item.value}%</b></div>)}</div></div><h3>Total Languages Used: {total}</h3></Card>; }
function Stack() { return <Card className="stack"><h2>Primary Stack</h2><div>{stacks.map(([name, tone]) => <span className={tone} key={name}>{name}</span>)}</div></Card>; }
function ActivityCard({ item }) { const [icon, line1, line2, value, change, tone] = item; return <div className="activity-card"><span className={`round ${tone}`}><Icon name={icon} /></span><div><p>{line1}<br /><small>{line2}</small></p><b>{value}</b><em className={change.startsWith('-') ? 'negative' : ''}>{change} <small>vs last year</small></em></div></div>; }
function Activity() { return <Card className="activity"><div className="section-heading"><h2>Activity Analysis</h2><button type="button">This year <ChevronDown size={15} aria-hidden="true" /></button></div><div className="activity-grid">{activity.map((x, i) => <ActivityCard item={x} key={i} />)}</div><div className="most-active"><span className="round orange"><Icon name="calendar" /></span><p>Most Active Repo <small>(Commits in last 30 days)</small><b>DevFolio</b></p><strong>24 commits</strong></div></Card>; }
const createdByYear = years.map((year, index) => ({ year, value: [10, 7, 12, 10, 16, 18, 15][index] }));
const updatedByYear = years.map((year, index) => ({ year, value: [5, 10, 12, 7, 20, 17, 22][index] }));
function ChartTooltip({ active, payload }) { return active && payload?.length ? <div className="chart-tooltip">{payload[0].value} repositories</div> : null; }
const latestSevenYears = data => data.filter(point => Number(point.year) >= new Date().getFullYear() - 6);
const sevenYearLabel = `Last 7 years (${new Date().getFullYear() - 6}–${new Date().getFullYear()})`;
function CreatedChart({ data = createdByYear }) { const recentData = latestSevenYears(data); return <div className="chart chart-bars"><p>Repositories Created Over The Years <small>{sevenYearLabel}</small></p><ResponsiveContainer width="100%" height={174}><RechartsBarChart data={recentData} margin={{ top: 20, right: 8, left: 8, bottom: 0 }}><XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#91969e', fontSize: 11 }} /><YAxis hide /><Tooltip cursor={false} content={<ChartTooltip />} /><Bar dataKey="value" radius={[8, 8, 8, 8]} maxBarSize={12} label={{ position: 'top', fill: '#f2f3f5', fontSize: 11 }}>{recentData.map(item => <Cell key={item.year} fill="#e427a5" />)}</Bar></RechartsBarChart></ResponsiveContainer></div>; }
function UpdatedChart({ data = updatedByYear }) { const recentData = latestSevenYears(data); return <div className="chart chart-line"><p>Repositories Updated Over The Years <small>{sevenYearLabel}</small></p><ResponsiveContainer width="100%" height={174}><RechartsLineChart data={recentData} margin={{ top: 20, right: 8, left: 8, bottom: 0 }}><CartesianGrid vertical={false} horizontal={false} /><XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#91969e', fontSize: 11 }} /><YAxis hide /><Tooltip content={<ChartTooltip />} /><Line type="monotone" dataKey="value" stroke="#e65a0c" strokeWidth={3} dot={{ r: 4, fill: '#e65a0c', strokeWidth: 0 }} activeDot={{ r: 5 }} label={{ position: 'top', fill: '#f2f3f5', fontSize: 11 }} /></RechartsLineChart></ResponsiveContainer></div>; }
function Productivity({ createdData, updatedData, averageCreated = 0, averageUpdated = 0 }) { return <Card className="productivity"><h2>Productivity Analysis</h2><div className="averages"><div><span>Average Repos Created / Year</span><b>{averageCreated}</b></div><div><span>Average Repos Updated / Year</span><b>{averageUpdated}</b></div></div><div className="chart-grid"><CreatedChart data={createdData} /><UpdatedChart data={updatedData} /></div></Card>; }
function Health({ health = healthFallback }) { const score = Math.min(100, Math.max(0, Number(health.score ?? healthFallback.score))); const factors = health.factors ?? healthFallback.factors; return <Card className="health"><h2>Repo Health</h2><div className="health-content"><div className="score"><div><svg viewBox="0 0 100 100" aria-label={`Repository health score: ${score}%`}><circle className="score-track" cx="50" cy="50" r="42" pathLength="100" /><circle className="score-progress" cx="50" cy="50" r="42" pathLength="100" strokeDasharray={`${score} ${100 - score}`} /></svg><b>{score}%</b></div><span>{score >= 70 ? 'Good' : score >= 45 ? 'Fair' : 'Needs attention'}</span></div><div className="factors"><h3>Health Factors</h3>{factors.map(([name, value]) => <div key={name}><span>{name}</span><i><b className={name === 'License' ? 'warning' : ''} style={{ width: `${value}%` }} /></i><em>{value / 10}/10</em></div>)}<p>Based on {health.repositoryCount} repositories</p></div></div></Card>; }
function Insights() { const entries = [['js', 'You mainly code in JavaScript. Over 52% of your repositories use it.'], ['crown', 'Your React projects receive 2.3x more stars than your other repositories.'], ['trophy', 'You’ve been more active in the last 2 years. Keep it up!!!!'], ['clock', 'Around 12 of your repositories haven’t been updated in over a year.'], ['repo', 'Your open source contributions are impressive!']]; return <Card className="insights"><h2>Smart Insights</h2>{entries.map(([icon, text], i) => <p key={i}><span className={`insight-icon n${i}`}><Icon name={icon} size={14} /></span>{text}</p>)}<button>View all insights&nbsp; →</button></Card>; }
function Drawer({ open, onClose, activePage, onNavigate }) { return <div className={`drawer ${open ? 'open' : ''}`}><div className="drawer-content"><div><Logo /><button onClick={onClose} aria-label="Close menu"><X /></button></div>{navigation.map(([icon, label]) => <button className={activePage === label ? 'active' : ''} onClick={() => { onNavigate(label); onClose(); }} key={label}><Icon name={icon} />{label}</button>)}</div><div onClick={onClose} /></div>; }
function normaliseChartData(source, fallback) {
  if (!Array.isArray(source)) return fallback;
  return source.map((point, index) => ({ year: String(point.year ?? point.label ?? years[index]), value: Number(point.value ?? point.count ?? 0) }));
}

function normaliseLanguageData(source) {
  if (!Array.isArray(source)) return languageFallback;
  const languages = source
    .map((language, index) => ({ name: String(language.name ?? language.language ?? `Other ${index + 1}`), value: Number(language.value ?? language.percentage ?? language.count ?? 0) }))
    .filter(language => language.value > 0)
    .sort((a, b) => b.value - a.value);
  if (languages.length <= 5) return languages;
  const topLanguages = languages.slice(0, 4);
  const other = languages.slice(4).reduce((total, language) => total + language.value, 0);
  return [...topLanguages, { name: 'Other', value: Number(other.toFixed(1)) }];
}

function normaliseHealth(payload) {
  const health = payload.repoHealth ?? payload.health;
  if (!health) return healthFallback;
  const rawFactors = health.factors ?? health.healthFactors ?? [
    { name: 'Desc', value: health.descriptionCoverage },
    { name: 'Topics', value: health.topicsCoverage },
    { name: 'License', value: health.licenseCoverage },
  ];
  const factors = Array.isArray(rawFactors)
    ? rawFactors.map((factor, index) => [String(factor.name ?? factor.label ?? healthFallback.factors[index]?.[0] ?? `Factor ${index + 1}`), Number(factor.value ?? factor.score ?? factor.percentage ?? 0)])
    : healthFallback.factors;
  return { score: Number(health.score ?? health.healthScore ?? health.overallHealthScore ?? healthFallback.score), factors, repositoryCount: Number(health.repositoryCount ?? health.totalRepositories ?? payload.repositories?.total ?? payload.repositories?.totalRepositories ?? healthFallback.repositoryCount) };
}

const formatNumber = value => new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(Number(value || 0));
const formatMonth = value => value ? new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(new Date(value)) : 'Unknown';
const formatRepoDate = value => value ? new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value)) : 'Unknown';
const pickRandomInsights = (insights, count = 7) => [...insights].sort(() => Math.random() - 0.5).slice(0, count);

function DynamicProfile({ profile = {} }) {
  const stats = [['repo', profile.publicRepos, 'Repositories', 'blue'], ['users', profile.followers, 'Followers', 'amber'], ['user', profile.following, 'Following', 'violet'], ['star', profile.totalStars, 'Total Stars', 'green']];
  return <Card className="profile-card"><div className="profile"><div className="profile-avatar">{profile.avatar ? <img src={profile.avatar} alt={`${profile.username || 'GitHub'} avatar`} /> : <span />}</div><div><h2>{profile.name || profile.username || 'GitHub user'}</h2><p>{profile.username ? `@${profile.username}` : ''}</p><p>{profile.bio || 'No bio provided'}</p><strong>Joined {formatMonth(profile.joinedAt)}</strong></div></div><div className="stats">{stats.map(([icon, value, label, tone]) => <div className="stat" key={label}><span className={`round ${tone}`}><Icon name={icon} /></span><div><b>{formatNumber(value)}</b><small>{label}</small></div></div>)}</div></Card>;
}

function DynamicRepos({ highlights = {}, languages = [] }) {
  const cards = [
    ['star', 'Most Starred Repo', highlights.mostStarred, repo => `${formatNumber(repo.stars)} stars`, 'amber'],
    ['fork', 'Most Forked Repo', highlights.mostForked, repo => `${formatNumber(repo.forks)} forks`, 'violet'],
    ['trophy', 'Largest Repo', highlights.largestRepository, repo => `${formatNumber(repo.size / 1024)} MB`, 'blue'],
    ['clock', 'Recently Active Repo', highlights.recentlyUpdated, repo => `Updated ${formatRepoDate(repo.updatedAt)}`, 'green'],
    ['calendar', 'Oldest Repo', highlights.oldestRepository, repo => `Created on ${formatRepoDate(repo.createdAt)}`, 'pink'],
    ...(languages[0] ? [['code', 'Primary Language', { name: languages[0].name }, () => `${languages[0].value}% of repositories`, 'blue']] : []),
  ];
  return <div className="repos">{cards.filter(([, , repo]) => repo).map(([icon, title, repo, meta, tone]) => <RepoCard data={[icon, title, repo.name, meta(repo), tone]} key={title} />)}</div>;
}

function DynamicActivity({ productivity = {}, highlights = {} }) {
  const [period, setPeriod] = useState('thisYear');
  const [filterOpen, setFilterOpen] = useState(false);
  const periodLabels = { thisYear: 'This year', lastYear: 'Last year', last30Days: 'Last 30 days', allTime: 'All time' };
  const metrics = productivity.periods?.[period] ?? { created: productivity.repositoriesCreatedThisYear ?? 0, updated: productivity.repositoriesUpdatedThisYear ?? 0, active: productivity.activeRepositories ?? 0, inactive: productivity.inactiveRepositories ?? 0 };
  const entries = [['blocks', 'Repositories Created', periodLabels[period], metrics.created, 'violet'], ['award', 'Repositories Updated', periodLabels[period], metrics.updated, 'amber'], ['clock', 'Inactive Repos', `(No update in ${periodLabels[period].toLowerCase()})`, metrics.inactive, 'pink'], ['refresh', 'Active Repos', `(Updated in ${periodLabels[period].toLowerCase()})`, metrics.active, 'green']];
  return <Card className="activity"><div className="section-heading"><h2>Activity Analysis</h2><div className="activity-filter"><button type="button" className="activity-filter-button" aria-haspopup="listbox" aria-expanded={filterOpen} onClick={() => setFilterOpen(open => !open)}>{periodLabels[period]}<ChevronDown size={15} aria-hidden="true" /></button>{filterOpen && <div className="activity-filter-menu" role="listbox">{Object.entries(periodLabels).map(([value, label]) => <button type="button" role="option" aria-selected={period === value} key={value} onClick={() => { setPeriod(value); setFilterOpen(false); }}>{label}</button>)}</div>}</div></div><div className="activity-grid">{entries.map(([icon, line1, line2, value, tone]) => <div className="activity-card" key={line1}><span className={`round ${tone}`}><Icon name={icon} /></span><div><p>{line1}<br /><small>{line2}</small></p><b>{value ?? 0}</b></div></div>)}</div><div className="most-active"><span className="round orange"><Icon name="calendar" /></span><p>Most Recently Updated Repo <b>{highlights.recentlyUpdated?.name || 'None'}</b></p><strong>{highlights.recentlyUpdated ? formatRepoDate(highlights.recentlyUpdated.updatedAt) : ''}</strong></div></Card>;
}

const languageIconNames = { 'C++': 'cplusplus', C: 'c', 'C#': 'csharp', CSS: 'css3', Dart: 'dart', Go: 'go', HTML: 'html5', Java: 'java', JavaScript: 'javascript', Kotlin: 'kotlin', PHP: 'php', Python: 'python', Ruby: 'ruby', Rust: 'rust', Swift: 'swift', TypeScript: 'typescript' };
function DynamicStack({ languages = [] }) { return <Card className="stack"><h2>Primary Stack</h2><div>{languages.slice(0, 6).map((item, index) => { const iconName = languageIconNames[item.name]; return <span className={['violet', 'pink', 'orange', 'blue', 'green', 'amber'][index]} key={item.name}>{iconName ? <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconName}/${iconName}-original.svg`} alt="" aria-hidden="true" /> : <i aria-hidden="true">&lt;/&gt;</i>}{item.name}</span>; })}</div></Card>; }
function DynamicInsights({ entries = [] }) { return <Card className="insights"><h2>Smart Insights</h2>{entries.length ? entries.map((entry, index) => <p key={index}><span className={`insight-icon n${index % 5}`}><Icon name={['js', 'crown', 'trophy', 'clock', 'repo'][index % 5]} size={14} /></span>{entry}</p>) : <p>No insights available for this account.</p>}</Card>; }

function DynamicHeader({ onMenu, username, onSearch, avatar }) {
  const [query, setQuery] = useState(username);
  const submit = event => { event.preventDefault(); const nextUsername = query.trim().replace(/^@/, ''); if (nextUsername) onSearch(nextUsername); };
  const submitOnEnter = event => { if (event.key === 'Enter') submit(event); };
  return <header className="topbar"><div className="mobile-title"><Logo /><span>Overview</span></div><div className="desktop-title"><h1>Overview</h1><p>Complete analytics overview of {username}'s GitHub profile</p></div><div className="actions"><form className="search" onSubmit={submit}><Icon name="search" size={18} /><input value={query} onChange={event => setQuery(event.target.value)} onKeyDown={submitOnEnter} placeholder="Search GitHub username" aria-label="GitHub username" /><button type="submit">Search</button></form><div className="avatar">{avatar ? <img src={avatar} alt={`${username} profile avatar`} /> : username.slice(0, 1).toUpperCase()}</div></div><MenuButton onClick={onMenu} /><form className="mobile-username-search" onSubmit={submit}><Icon name="search" size={18} /><input value={query} onChange={event => setQuery(event.target.value)} onKeyDown={submitOnEnter} placeholder="Search GitHub username" aria-label="GitHub username" /><button type="submit">Search</button></form></header>;
}

function UserLookupError({ username, error, onMenu, onSearch }) {
  const [query, setQuery] = useState(username);
  const notFound = error === 'not-found' || String(error).startsWith('Could not load GitHub user');
  const submit = event => { event.preventDefault(); const nextUsername = query.trim().replace(/^@/, ''); if (nextUsername) onSearch(nextUsername); };
  return <main className="user-lookup-error-page"><header className="user-lookup-error-header"><Logo /><MenuButton onClick={onMenu} /></header><section className="user-lookup-error" role="alert"><span><AlertCircle size={34} /></span><h1>{notFound ? 'User not found' : 'Unable to load this profile'}</h1><p>{notFound ? `We couldn’t find a GitHub account named @${username}. Check the username and try again.` : 'GitHub profile data could not be loaded right now. Please try again.'}</p><form onSubmit={submit}><Search size={19} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search GitHub username" aria-label="GitHub username" /><button type="submit">Search</button></form></section></main>;
}

const repoIconMap = { star: Star, fork: GitFork, clock: Clock3, calendar: CalendarDays, trophy: Trophy };
const formatRepoSize = size => `${new Intl.NumberFormat('en', { maximumFractionDigits: 1 }).format(Number(size || 0) / 1024)} MB`;
const repositoryLanguageColors = {
  JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572a5', Java: '#b07219',
  Kotlin: '#a97bff', Rust: '#dea584', Go: '#00add8', Ruby: '#cc342d', PHP: '#4f5d95',
  'C++': '#f34b7d', C: '#555555', 'C#': '#178600', Swift: '#f05138', Dart: '#00b4ab',
  HTML: '#e34c26', CSS: '#563d7c', SCSS: '#c6538c', Shell: '#89e051', OCaml: '#ef7a08',
  Vue: '#41b883', Svelte: '#ff3e00', Scala: '#c22d40', Elixir: '#6e4a7e', R: '#198ce7',
};
const languageColor = language => {
  if (repositoryLanguageColors[language]) return repositoryLanguageColors[language];
  const hue = [...String(language || 'Other')].reduce((value, character) => value + character.charCodeAt(0), 0) % 360;
  return `hsl(${hue} 65% 58%)`;
};
const relativeDate = value => {
  if (!value) return 'Unknown';
  const seconds = Math.max(0, Math.round((Date.now() - new Date(value).getTime()) / 1000));
  if (seconds < 60) return 'just now';
  const units = [[31536000, 'year'], [2592000, 'month'], [86400, 'day'], [3600, 'hour'], [60, 'minute']];
  const [amount, label] = units.find(([unit]) => seconds >= unit) || [1, 'minute'];
  const count = Math.floor(seconds / amount);
  return `${count} ${label}${count === 1 ? '' : 's'} ago`;
};

function RepositoryHighlight({ icon, label, repo, detail, tone }) {
  const Glyph = repoIconMap[icon] || FolderGit2;
  return <Card className="repository-highlight"><p><Glyph size={19} className={tone} />{label}</p><h3>{repo?.name || 'No repository'}</h3><span>{detail}</span></Card>;
}

function RepositoryPage({ username, overview, onMenu, avatar }) {
  const [repositories, setRepositories] = useState([]);
  const [statistics, setStatistics] = useState({ total: 0, public: 0, private: 0, archived: 0, forked: 0, languages: 0 });
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('');
  const [sort, setSort] = useState('updated');
  const [tab, setTab] = useState('all');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({ limit: '100', sort, order: 'desc' });
    if (query.trim()) params.set('search', query.trim());
    if (language) params.set('language', language);
    if (tab === 'public' || tab === 'private') params.set('visibility', tab);
    if (tab === 'archived') params.set('archived', 'true');
    setLoading(true); setError('');
    fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/repositories/${encodeURIComponent(username)}?${params}`, { signal: controller.signal })
      .then(response => response.ok ? response.json() : Promise.reject({ status: response.status }))
      .then(data => { setRepositories(data.repositories || []); setStatistics(data.statistics || {}); })
      .catch(fetchError => { if (fetchError.name !== 'AbortError') setError('Could not load repositories. Please try again.'); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [username, query, language, sort, tab]);

  const languages = [...new Set(repositories.map(repo => repo.language).filter(Boolean))].sort();
  const issueCount = repositories.reduce((total, repo) => total + Number(repo.openIssues || 0), 0);
  const highlights = overview.highlights || {};
  const exportRepositories = () => {
    const heading = ['Repository', 'Description', 'Language', 'Stars', 'Forks', 'Size (KB)', 'Open issues', 'Last updated'];
    const rows = repositories.map(repo => [repo.name, repo.description || '', repo.language || '', repo.stars, repo.forks, repo.size, repo.openIssues || 0, repo.updatedAt].map(value => `"${String(value ?? '').replaceAll('"', '""')}"`).join(','));
    const blob = new Blob([[heading.join(','), ...rows].join('\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = `${username}-repositories.csv`; link.click(); URL.revokeObjectURL(url);
  };
  const tabs = [['all', 'All', statistics.total], ['public', 'Public', statistics.public], ['private', 'Private', statistics.private], ['archived', 'Archived', statistics.archived]];
  const metrics = [
    ['repo', statistics.total, 'Total Repositories', ''], ['star', overview.profile?.totalStars || 0, 'Total Stars', ''], ['fork', statistics.forked, 'Total Forks', ''], ['alert', issueCount, 'Open Issues', ''], ['archive', statistics.archived, 'Archived Repos', ''], ['code', statistics.languages, 'Languages Used', ''],
  ];
  const metricIcon = { repo: FolderGit2, star: Star, fork: GitFork, alert: AlertCircle, archive: Archive, code: Code2 };
  return <main className="repositories-page"><header className="repository-topbar"><div className="mobile-title"><Logo /><span>Repositories</span></div><div className="repository-title"><h1>Repositories</h1><p>Detailed insights and analytics about all repositories.</p></div><div className="repository-actions"><label className="repository-search top-search"><Search size={19} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search Repositories" /></label><button type="button" onClick={() => setFiltersOpen(open => !open)}><SlidersHorizontal size={18} />Filters</button><button type="button" className="export-button" onClick={exportRepositories}><Upload size={18} />Export</button><button className="bell" aria-label="Notifications"><Bell size={22} /></button><div className="avatar">{avatar ? <img src={avatar} alt="Profile avatar" /> : username.slice(0, 1).toUpperCase()}</div></div><MenuButton onClick={onMenu} /></header>
    <div className="repository-metrics">{metrics.map(([key, value, label]) => { const Glyph = metricIcon[key]; return <Card className={`repository-metric ${key}`} key={label}><span><Glyph size={21} /></span><div><b>{formatNumber(value)}</b><p>{label}</p></div></Card>; })}</div>
    <div className="repository-highlights"><RepositoryHighlight icon="star" tone="amber" label="Most Starred Repo" repo={highlights.mostStarred} detail={`${formatNumber(highlights.mostStarred?.stars)} stars`} /><RepositoryHighlight icon="fork" tone="violet" label="Most Forked Repo" repo={highlights.mostForked} detail={`${formatNumber(highlights.mostForked?.forks)} forks`} /><RepositoryHighlight icon="clock" tone="green" label="Recently Active Repo" repo={highlights.recentlyUpdated} detail={highlights.recentlyUpdated ? `Updated ${relativeDate(highlights.recentlyUpdated.updatedAt)}` : ''} /><RepositoryHighlight icon="calendar" tone="pink" label="Oldest Repo" repo={highlights.oldestRepository} detail={highlights.oldestRepository ? `Created on ${formatRepoDate(highlights.oldestRepository.createdAt)}` : ''} /><RepositoryHighlight icon="trophy" tone="blue" label="Largest Repo" repo={highlights.largestRepository} detail={highlights.largestRepository ? formatRepoSize(highlights.largestRepository.size) : ''} /></div>
    <Card className="repository-table-card"><h2>All Repositories</h2><div className="repository-controls"><div className="repository-tabs">{tabs.map(([value, label, count]) => <button type="button" className={tab === value ? 'active' : ''} onClick={() => setTab(value)} key={value}>{label} ({count || 0})</button>)}</div><div className="table-filters"><label className="repository-search"><Search size={19} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search Repositories" /></label><select aria-label="Filter by language" value={language} onChange={event => setLanguage(event.target.value)}><option value="">Language: All</option>{languages.map(item => <option key={item} value={item}>{item}</option>)}</select><select aria-label="Sort repositories" value={sort} onChange={event => setSort(event.target.value)}><option value="updated">Sort: Recently Updated</option><option value="created">Sort: Recently Created</option><option value="stars">Sort: Most Stars</option><option value="forks">Sort: Most Forks</option><option value="size">Sort: Largest</option><option value="name">Sort: Name</option></select></div></div>{filtersOpen && <div className="quick-filters"><button onClick={() => setTab('archived')}>Archived only</button><button onClick={() => setSort('stars')}>Most starred</button><button onClick={() => { setLanguage(''); setTab('all'); setSort('updated'); }}>Reset filters</button></div>}<div className="repository-table"><div className="repository-row repository-head"><span>Repository</span><span>Language</span><span>Stars</span><span>Forks</span><span>Size</span><span>Open Issues</span><span>Last Updated</span><span /></div>{loading ? <p className="repository-state">Loading repositories…</p> : error ? <p className="repository-state api-error">{error}</p> : repositories.length === 0 ? <p className="repository-state">No repositories match these filters.</p> : repositories.map(repo => <article className="repository-row" key={repo.url || repo.name}><a className="repository-name" href={repo.url} target="_blank" rel="noreferrer"><span><FolderGit2 size={24} /></span><div><b>{repo.name}</b><p>{repo.description || 'No description provided'}</p></div><em>{repo.private ? 'Private' : 'Public'}</em></a><span className="repository-language"><i style={{ backgroundColor: languageColor(repo.language) }} />{repo.language || 'Not specified'}</span><span>{formatNumber(repo.stars)}</span><span>{formatNumber(repo.forks)}</span><span>{formatRepoSize(repo.size)}</span><span>{formatNumber(repo.openIssues)}</span><span>{relativeDate(repo.updatedAt)}</span><a className="repo-more" href={repo.url} target="_blank" rel="noreferrer" aria-label={`Open ${repo.name} on GitHub`} title="Open on GitHub"><ExternalLink size={18} /></a></article>)}</div></Card></main>;
}

function LanguagePage({ username, onMenu, avatar, insights = [] }) {
  const [data, setData] = useState({ summary: {}, distribution: [], repositoriesByLanguage: {} });
  const [error, setError] = useState('');
  const [trendRange, setTrendRange] = useState('6');
  useEffect(() => {
    const controller = new AbortController(); setError('');
    fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/languages/${encodeURIComponent(username)}`, { signal: controller.signal })
      .then(response => response.ok ? response.json() : Promise.reject(response))
      .then(setData)
      .catch(fetchError => { if (fetchError.name !== 'AbortError') setError('Could not load language analytics.'); });
    return () => controller.abort();
  }, [username]);
  const distribution = data.distribution || [];
  const top = distribution.slice(0, 4);
  const others = distribution.slice(4).reduce((total, item) => total + item.percentage, 0);
  const donutData = [...top, ...(others ? [{ language: 'Other', percentage: Number(others.toFixed(2)), repositories: distribution.slice(4).reduce((total, item) => total + item.repositories, 0) }] : [])];
  const primary = distribution[0];
  const diverse = Object.entries(data.repositoriesByLanguage || {}).flatMap(([language, repositories]) => repositories.map(repo => ({ ...repo, language }))).sort((a, b) => b.bytes - a.bytes)[0];
  const languageKing = primary && data.repositoriesByLanguage?.[primary.language]?.[0];
  const maxRepositories = Math.max(...distribution.map(item => item.repositories), 1);
  const trend = data.trendByYear || [];
  const trendData = trendRange === 'all' ? trend : trend.filter(point => Number(point.year) >= Math.max(...trend.map(item => Number(item.year)), 0) - Number(trendRange) + 1);
  const diversity = Math.min(100, Math.round((distribution.length / 10) * 100));
  const topName = primary?.language || '—';
  const stack = distribution.slice(0, 6);
  const languageInsights = insights.slice(0, 7);
  return <main className="languages-page"><header className="language-topbar"><div className="mobile-title"><Logo /><span>Languages</span></div><div className="language-title"><h1>Languages</h1><p>Comprehensive language insights and developer preferences.</p></div><div className="language-actions"><div className="avatar">{avatar ? <img src={avatar} alt="Profile avatar" /> : username.slice(0, 1).toUpperCase()}</div></div><MenuButton onClick={onMenu} /></header>{error && <p className="api-error">{error}</p>}<div className="language-summary"><Card><span className="language-symbol teal"><Code2 size={21} /></span><div><b>{data.summary?.totalLanguages || 0}</b><p>Languages Used</p></div></Card><Card><span className="language-symbol amber"><Star size={20} /></span><div><b>{topName}</b><p>Favourite Language</p><small><strong>{primary?.percentage || 0}%</strong> of total usage</small></div></Card><Card><span className="language-symbol orange"><GitFork size={20} /></span><div><b>{data.summary?.totalLanguages ? (data.summary.totalLanguages / Math.max(data.summary.totalRepositories || 1, 1)).toFixed(1) : '0'}</b><p>Language / Repo (Avg)</p></div></Card><Card><span className="language-symbol green"><Blocks size={20} /></span><div><small>Most Diverse Repository</small><b>{diverse?.name || '—'}</b><p>{diverse ? `Uses ${distribution.length} different languages` : 'No data available'}</p></div></Card><Card><span className="language-symbol pink"><Crown size={18} /></span><div><small>Most Language King</small><b>{languageKing?.name || '—'}</b><p>{primary ? `${primary.percentage}% ${primary.language}` : 'No data available'}</p></div></Card></div><div className="languages-layout"><section className="language-main"><Card className="language-distribution"><h2>Language Distribution</h2><div><div className="language-donut"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={donutData} dataKey="percentage" nameKey="language" innerRadius="66%" outerRadius="100%" stroke="none">{donutData.map(item => <Cell key={item.language} fill={languageColor(item.language)} />)}</Pie></PieChart></ResponsiveContainer></div><div className="language-legend">{donutData.map(item => <p key={item.language}><i style={{ backgroundColor: languageColor(item.language) }} />{item.language}<span>{item.percentage}%</span></p>)}</div></div><h3>Total Languages Used: {data.summary?.totalLanguages || 0}</h3></Card><Card className="language-trend"><div className="language-card-heading"><h2>Language Trend Over Time</h2><select value={trendRange} onChange={event => setTrendRange(event.target.value)} aria-label="Language trend period"><option value="3">Last 3 Years</option><option value="6">Last 6 Years</option><option value="all">All Time</option></select></div><ResponsiveContainer width="100%" height={215}><RechartsLineChart data={trendData}><CartesianGrid stroke="#171c29" vertical /><XAxis dataKey="year" axisLine={false} tickLine={false} /><YAxis axisLine={false} tickLine={false} /><Tooltip />{distribution.slice(0, 6).map(item => <Line key={item.language} type="monotone" dataKey={item.language} stroke={languageColor(item.language)} strokeWidth={1.5} connectNulls dot={{ r: 4, fill: languageColor(item.language), strokeWidth: 0 }} />)}</RechartsLineChart></ResponsiveContainer><div className="trend-legend">{distribution.slice(0, 6).map(item => <span key={item.language}><i style={{ backgroundColor: languageColor(item.language) }} />{item.language}</span>)}</div></Card><Card className="top-languages"><h2>Top Repositories By Language</h2>{distribution.slice(0, 5).map(item => <div className="top-language-row" key={item.language}><i style={{ backgroundColor: languageColor(item.language) }} /><span>{item.language}</span><b><em style={{ width: `${(item.repositories / maxRepositories) * 100}%`, backgroundColor: languageColor(item.language) }} /></b><small>{item.repositories} Repositories</small></div>)}</Card></section><aside className="language-side"><Card className="primary-stack"><h2>Primary Stack</h2><p>Your core development stack</p><div>{stack.map(item => <span key={item.language}><i style={{ backgroundColor: languageColor(item.language) }} />{item.language}</span>)}</div></Card><Card className="language-insights"><h2>Smart Insights</h2>{languageInsights.length ? languageInsights.map((insight, index) => <p key={insight}><span className={`language-symbol ${['amber', 'pink', 'green'][index % 3]}`}>{['✦', '♛', '⌘'][index % 3]}</span>{insight}</p>) : <p><span className="language-symbol green">⌘</span>Insights will appear once your profile data has loaded.</p>}</Card><Card className="language-diversity"><h2>Language Diversity</h2><div><div className="diversity-gauge"><svg viewBox="0 0 240 140"><path className="gauge-track" d="M 25 120 A 95 95 0 0 1 215 120" pathLength="100" /><path className="gauge-progress" d="M 25 120 A 95 95 0 0 1 215 120" pathLength="100" strokeDasharray={`${diversity} ${100 - diversity}`} /></svg><b>{diversity}%</b><strong>{diversity >= 70 ? 'High Diversity' : 'Growing Diversity'}</strong></div><p>Your repositories use {data.summary?.totalLanguages || 0} languages, placing you ahead of {diversity}% of developers in language diversity.<br /><br />Keep growing your stack to choose the right tool for each project.</p></div></Card></aside></div></main>;
  return <main className="languages-page"><header className="language-topbar"><div className="mobile-title"><Logo /><span>Languages</span></div><div className="language-title"><h1>Languages</h1><p>Comprehensive language insights and developer preferences.</p></div><div className="language-actions"><label className="repository-search"><Search size={19} /><input placeholder="Search GitHub username" aria-label="Search GitHub username" /></label><button className="bell" aria-label="Notifications"><Bell size={22} /></button><div className="avatar">{avatar ? <img src={avatar} alt="Profile avatar" /> : username.slice(0, 1).toUpperCase()}</div></div><MenuButton onClick={onMenu} /></header>{error && <p className="api-error">{error}</p>}<div className="language-summary"><Card><span className="language-symbol teal"><Code2 size={21} /></span><div><b>{data.summary?.totalLanguages || 0}</b><p>Languages Used</p><small>view details</small></div></Card><Card><span className="language-symbol amber"><Star size={20} /></span><div><b>{topName}</b><p>Favourite Language</p><small><strong>{primary?.percentage || 0}%</strong> of total usage</small></div></Card><Card><span className="language-symbol orange"><GitFork size={20} /></span><div><b>{data.summary?.totalLanguages ? (data.summary.totalLanguages / Math.max(data.summary.totalRepositories || 1, 1)).toFixed(1) : '0'}</b><p>Language / Repo (Avg)</p><small>Across all repos</small></div></Card><Card><span className="language-symbol green"><Blocks size={20} /></span><div><small>♛ Most Diverse Repository</small><b>{diverse?.name || '—'}</b><p>{diverse ? `Uses ${distribution.length} different languages` : 'No data available'}</p></div></Card><Card><span className="language-symbol pink"><Crown size={18} /></span><div><small>♛ Most Language King</small><b>{languageKing?.name || '—'}</b><p>{primary ? `${primary.percentage}% ${primary.language}` : 'No data available'}</p></div></Card></div><div className="languages-layout"><section className="language-main"><Card className="language-distribution"><h2>Language Distribution</h2><div><div className="language-donut"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={donutData} dataKey="percentage" nameKey="language" innerRadius="66%" outerRadius="100%" stroke="none">{donutData.map(item => <Cell key={item.language} fill={languageColor(item.language)} />)}</Pie></PieChart></ResponsiveContainer></div><div className="language-legend">{donutData.map(item => <p key={item.language}><i style={{ backgroundColor: languageColor(item.language) }} />{item.language}<span>{item.percentage}%</span></p>)}</div></div><h3>Total Languages Used: {data.summary?.totalLanguages || 0}</h3></Card><Card className="language-trend"><div className="language-card-heading"><h2>Language Trend Over Time</h2><button>Last 6 Years <ChevronDown size={15} /></button></div><ResponsiveContainer width="100%" height={215}><RechartsLineChart data={trend} margin={{ top: 16, right: 10, left: -20, bottom: 0 }}><CartesianGrid stroke="#171c29" vertical /><XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#cad0da', fontSize: 11 }} /><YAxis axisLine={false} tickLine={false} tick={{ fill: '#cad0da', fontSize: 11 }} /><Tooltip contentStyle={{ background: '#070e1a', border: '1px solid #2c3342' }} />{distribution.slice(0, 4).map(item => <Line key={item.language} type="monotone" dataKey={item.language} stroke={languageColor(item.language)} strokeWidth={1.5} dot={{ r: 4, fill: languageColor(item.language), strokeWidth: 0 }} />)}</RechartsLineChart></ResponsiveContainer><div className="trend-legend">{distribution.slice(0, 4).map(item => <span key={item.language}><i style={{ backgroundColor: languageColor(item.language) }} />{item.language}</span>)}</div></Card><Card className="top-languages"><h2>Top Repositories By Language</h2>{distribution.slice(0, 5).map(item => <div className="top-language-row" key={item.language}><i style={{ backgroundColor: languageColor(item.language) }} /> <span>{item.language}</span><b><em style={{ width: `${(item.repositories / maxRepositories) * 100}%`, backgroundColor: languageColor(item.language) }} /></b><small>{item.repositories} Repositories</small></div>)}</Card></section><aside className="language-side"><Card className="primary-stack"><h2>Primary Stack</h2><p>Your core development stack</p><div>{stack.map(item => <span key={item.language}><i style={{ backgroundColor: languageColor(item.language) }} />{item.language}</span>)}</div></Card><Card className="language-insights"><h2>Smart Insights</h2><p><span className="language-symbol amber">JS</span>{topName} is your dominant language, used in <strong>{primary?.percentage || 0}%</strong> of your projects.</p><p><span className="language-symbol pink">♛</span>You use {data.summary?.totalLanguages || 0} languages across your repositories.</p><p><span className="language-symbol green">⌘</span>{distribution[1] ? <><strong>{distribution[1].language}</strong> is your second most used language.</> : 'Keep building to discover more insights.'}</p><button>View all insights →</button></Card><Card className="language-diversity"><h2>Language Diversity</h2><div><div className="diversity-gauge" style={{ '--gauge': `${diversity * 1.8}deg` }}><b>{diversity}%</b><strong>{diversity >= 70 ? 'High Diversity' : 'Growing Diversity'}</strong></div><p>You use more languages than {diversity}% of developers on GitHub.<br /><br />That’s very impressive!!</p></div></Card></aside></div></main>;
}

const achievementIconMap = { award: Award, calendar: CalendarDays, code: Code2, file: FileText, folder: FolderGit2, fork: GitFork, heart: Heart, lock: Lock, refresh: RefreshCw, share: Share2, star: Star, target: CircleDot, trophy: Trophy, user: User, users: Users };
function AchievementIcon({ IconComponent, tone }) { return <span className={`achievement-icon ${tone}`}><IconComponent size={25} /></span>; }
function MetricDetail({ detail }) {
  const text = String(detail);
  if (!text.includes('%')) return text;
  return text.split(/(\d+(?:\.\d+)?)/).map((part, index) => /^\d/.test(part) ? <span className="metric-percentage" key={index}>{part}</span> : part);
}
function AchievementMetric({ icon: IconComponent, tone, value, label, detail }) { return <Card className="achievement-metric"><AchievementIcon IconComponent={IconComponent} tone={tone} /><div><b>{value}</b><span>{label}</span><small><MetricDetail detail={detail} /></small></div></Card>; }
function AchievementPage({ username, onMenu, onSearch, avatar }) {
  const [query, setQuery] = useState(username);
  const submit = event => { event.preventDefault(); const nextUsername = query.trim().replace(/^@/, ''); if (nextUsername) onSearch(nextUsername); };
  const trendData = achievementTrend.map((value, index) => ({ month: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'][Math.floor(index / 3)], value }));
  return <main className="achievements-page"><header className="achievements-topbar"><div className="mobile-title"><Logo /><span>Achievements</span></div><div className="achievements-title"><h1>Achievements</h1><p>Explore your achievements and milestones earned on GitHub.</p></div><div className="achievements-actions"><form className="achievement-search" onSubmit={submit}><Search size={19} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search GitHub username" aria-label="GitHub username" /></form><button className="bell" aria-label="Notifications"><Bell size={22} /></button><div className="avatar">{avatar ? <img src={avatar} alt="Profile avatar" /> : username.slice(0, 1).toUpperCase()}</div></div><MenuButton onClick={onMenu} /></header><div className="achievement-summary"><AchievementMetric icon={Trophy} tone="amber" value="32" label="Total Achievements" detail="+5 this year" /><AchievementMetric icon={Star} tone="green" value="2.3K" label="Achievement Points" detail="+420 this year" /><AchievementMetric icon={CircleDot} tone="magenta" value="12" label="Categories" detail="View all" /><AchievementMetric icon={CheckCircle2} tone="orange" value="19" label="Unlocked" detail="59% of total" /><AchievementMetric icon={Lock} tone="pink" value="13" label="Locked" detail="41% remaining" /><AchievementMetric icon={Users} tone="teal" value="Top 15%" label="Among active developers" detail="Keep it up!" /></div><div className="achievements-layout"><Card className="unlocked-achievements"><h2>Unlocked Achievements</h2><div className="achievement-grid">{achievementCards.map(([name, detail, IconComponent, tone], index) => <article className="achievement-item" key={`${name}-${index}`}><AchievementIcon IconComponent={IconComponent} tone={tone} /><b>{name}</b><small>{detail}</small><em>Unlocked</em></article>)}</div><button type="button" className="achievement-link">View All Achievements <span>→</span></button></Card><Card className="achievement-points"><div className="achievement-card-heading"><div><h2>Achievement Points</h2><p><b>2300</b> Total Points</p></div><button type="button">This year <ChevronDown size={16} /></button></div><ResponsiveContainer width="100%" height={275}><RechartsLineChart data={trendData} margin={{ top: 15, right: 12, left: -18, bottom: 0 }}><defs><linearGradient id="achievementArea" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#5129cc" stopOpacity=".9" /><stop offset="100%" stopColor="#25106c" stopOpacity=".08" /></linearGradient></defs><CartesianGrid stroke="#121827" vertical /><XAxis dataKey="month" interval={2} axisLine={false} tickLine={false} tick={{ fill: '#949ba7', fontSize: 12 }} /><YAxis domain={[0, 3000]} ticks={[0, 1000, 2000, 3000]} axisLine={false} tickLine={false} tickFormatter={value => value ? `${value / 1000}K` : '0'} tick={{ fill: '#949ba7', fontSize: 12 }} /><Tooltip /><Line type="monotone" dataKey="value" stroke="#653de4" strokeWidth={2} dot={false} /></RechartsLineChart></ResponsiveContainer></Card><Card className="locked-achievements"><h2>Locked Achievements</h2>{lockedAchievements.map(([name, detail, IconComponent, progress]) => <div className="locked-item" key={name}><AchievementIcon IconComponent={IconComponent} tone="locked" /><div><b>{name}</b><small>{detail}</small></div><i><span style={{ width: progress === null ? '60%' : `${progress}%` }} /></i><em>{progress === null ? 'X%' : `${progress}%`}</em></div>)}<button type="button" className="achievement-link">View all locked achievements <span>→</span></button></Card><Card className="recently-earned"><h2>Recently Earned</h2>{recentlyEarned.map(([name, detail, IconComponent, date, points, tone]) => <div className="earned-item" key={name}><AchievementIcon IconComponent={IconComponent} tone={tone} /><div><b>{name}</b><small>{detail}</small></div><time>{date}</time><em>{points}</em></div>)}</Card></div></main>;
}

function DynamicAchievementPage({ username, onMenu, onSearch, avatar }) {
  const [query, setQuery] = useState('');
  const [data, setData] = useState({ summary: {}, unlocked: [], locked: [], recentlyEarned: [], pointHistory: [] });
  const [pointHistoryByYear, setPointHistoryByYear] = useState({});
  const [error, setError] = useState('');
  const submit = event => event.preventDefault();
  useEffect(() => {
    const controller = new AbortController(); setError('');
    fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/achievements/${encodeURIComponent(username)}`, { signal: controller.signal })
      .then(response => response.ok ? response.json() : Promise.reject(response))
      .then(payload => {
        const groupedHistory = (payload.pointHistory || []).reduce((groups, point) => {
          const year = String(point.year || new Date().getFullYear());
          groups[year] = [...(groups[year] || []), point];
          return groups;
        }, {});
        setPointHistoryByYear(groupedHistory);
        setData({ ...payload, pointHistory: groupedHistory[String(new Date().getFullYear())] || payload.pointHistory || [] });
      })
      .catch(fetchError => { if (fetchError.name !== 'AbortError') setError('Could not load achievements.'); });
    return () => controller.abort();
  }, [username]);
  useEffect(() => {
    const viewAllButtons = document.querySelectorAll('.unlocked-achievements .achievement-link, .locked-achievements .achievement-link');
    const openAchievementPage = event => { window.location.hash = event.currentTarget.closest('.locked-achievements') ? 'LockedAchievements' : 'AllAchievements'; };
    viewAllButtons.forEach(button => button.addEventListener('click', openAchievementPage));
    return () => viewAllButtons.forEach(button => button.removeEventListener('click', openAchievementPage));
  }, [data.unlocked]);
  useEffect(() => {
    const filterButton = document.querySelector('.achievement-points .achievement-card-heading button');
    const years = Object.keys(pointHistoryByYear).sort((a, b) => Number(b) - Number(a));
    if (!filterButton || !years.length) return undefined;
    const select = document.createElement('select');
    select.className = 'achievement-year-filter';
    select.setAttribute('aria-label', 'Achievement points year');
    select.innerHTML = `<option value="current">This year</option><option value="all">All years</option>${years.map(year => `<option value="${year}">${year}</option>`).join('')}`;
    filterButton.replaceWith(select);
    const updateChart = event => {
      const selected = event.target.value;
      const points = selected === 'all' ? years.flatMap(year => pointHistoryByYear[year]) : selected === 'current' ? pointHistoryByYear[String(new Date().getFullYear())] || pointHistoryByYear[years[0]] : pointHistoryByYear[selected];
      setData(current => ({ ...current, pointHistory: points || [] }));
    };
    select.addEventListener('change', updateChart);
    return () => select.removeEventListener('change', updateChart);
  }, [pointHistoryByYear]);
  useEffect(() => {
    const searchInput = document.querySelector('.achievement-search input');
    if (searchInput) searchInput.placeholder = 'Search achievements';
    const term = query.trim().toLowerCase();
    document.querySelectorAll('.achievement-search-overlay').forEach(overlay => overlay.remove());
    if (!term || !searchInput) return undefined;
    const matches = [...document.querySelectorAll('.achievement-item, .locked-item, .earned-item')]
      .filter(item => item.textContent.toLowerCase().includes(term))
      .map(item => ({ title: item.querySelector('b')?.textContent, status: item.classList.contains('locked-item') ? 'Locked' : 'Unlocked' }))
      .filter(match => match.title)
      .slice(0, 6);
    const bounds = searchInput.closest('.achievement-search').getBoundingClientRect();
    const overlay = document.createElement('div');
    overlay.className = 'achievement-search-overlay';
    overlay.style.left = `${bounds.left}px`;
    overlay.style.top = `${bounds.bottom + 6}px`;
    overlay.style.width = `${bounds.width}px`;
    overlay.innerHTML = matches.length ? matches.map(match => `<p><span>${match.title}</span><em class="${match.status.toLowerCase()}">${match.status}</em></p>`).join('') : '<p class="achievement-search-empty">No matching achievements</p>';
    document.body.appendChild(overlay);
    return () => overlay.remove();
  }, [query]);
  const summary = data.summary || {};
  const IconFor = achievement => achievementIconMap[achievement.icon] || Award;
  const dateFor = value => value ? new Intl.DateTimeFormat('en', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date(value)) : '—';
  const total = summary.totalAchievements || 30;
  return <main className="achievements-page"><header className="achievements-topbar"><div className="mobile-title"><Logo /><span>Achievements</span></div><div className="achievements-title"><h1>Achievements</h1><p>Explore your achievements and milestones earned on GitHub.</p></div><div className="achievements-actions"><form className="achievement-search" onSubmit={submit}><Search size={19} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search GitHub username" aria-label="GitHub username" /></form><button className="bell" aria-label="Notifications"><Bell size={22} /></button><div className="avatar">{avatar ? <img src={avatar} alt="Profile avatar" /> : username.slice(0, 1).toUpperCase()}</div></div><MenuButton onClick={onMenu} /></header>{error && <p className="api-error">{error}</p>}<div className="achievement-summary"><AchievementMetric icon={Trophy} tone="amber" value={total} label="Total Achievements" detail="Available to earn" /><AchievementMetric icon={Star} tone="green" value={summary.totalPoints || 0} label="Achievement Points" detail="From unlocked achievements" /><AchievementMetric icon={CircleDot} tone="magenta" value={summary.categories || 0} label="Categories" detail="Achievement categories" /><AchievementMetric icon={CheckCircle2} tone="orange" value={summary.unlocked || 0} label="Unlocked" detail={`${total ? Math.round(((summary.unlocked || 0) / total) * 100) : 0}% of total`} /><AchievementMetric icon={Lock} tone="pink" value={summary.locked || 0} label="Locked" detail={`${total ? Math.round(((summary.locked || 0) / total) * 100) : 0}% remaining`} /><AchievementMetric icon={Users} tone="teal" value={total ? `${Math.round(((summary.unlocked || 0) / total) * 100)}%` : '0%'} label="Progress" detail="Across all achievements" /></div><div className="achievements-layout"><Card className="unlocked-achievements"><h2>Unlocked Achievements</h2><div className="achievement-grid">{data.unlocked.length ? data.unlocked.slice(0, 10).map(achievement => <article className="achievement-item" key={achievement.id}><AchievementIcon IconComponent={IconFor(achievement)} tone={achievement.tone} /><b>{achievement.title}</b><small>{achievement.description}</small><em>Unlocked</em></article>) : <p className="achievement-empty">No achievements unlocked yet. Keep building!</p>}</div><button type="button" className="achievement-link">View All Achievements <span>→</span></button></Card><Card className="achievement-points"><div className="achievement-card-heading"><div><h2>Achievement Points</h2><p><b>{summary.totalPoints || 0}</b> Total Points</p></div><button type="button">This year <ChevronDown size={16} /></button></div><ResponsiveContainer width="100%" height={275}><RechartsLineChart data={data.pointHistory} margin={{ top: 15, right: 12, left: -18, bottom: 0 }}><CartesianGrid stroke="#121827" vertical /><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#949ba7', fontSize: 12 }} /><YAxis axisLine={false} tickLine={false} tickFormatter={value => value >= 1000 ? `${Math.round(value / 1000)}K` : value} tick={{ fill: '#949ba7', fontSize: 12 }} /><Tooltip /><Line type="monotone" dataKey="value" stroke="#653de4" strokeWidth={2} dot={false} /></RechartsLineChart></ResponsiveContainer></Card><Card className="locked-achievements"><h2>Locked Achievements</h2>{data.locked.slice(0, 5).map(achievement => <div className="locked-item" key={achievement.id}><AchievementIcon IconComponent={IconFor(achievement)} tone="locked" /><div><b>{achievement.title}</b><small>{achievement.description}</small></div><i><span style={{ width: `${achievement.progress}%` }} /></i><em>{achievement.progress}%</em></div>)}<button type="button" className="achievement-link">View all locked achievements <span>→</span></button></Card><Card className="recently-earned"><h2>Recently Earned</h2>{data.recentlyEarned.map(achievement => <div className="earned-item" key={achievement.id}><AchievementIcon IconComponent={IconFor(achievement)} tone={achievement.tone} /><div><b>{achievement.title}</b><small>{achievement.description}</small></div><time>{dateFor(achievement.earnedAt)}</time><em>+{achievement.points}</em></div>)}</Card></div></main>;
}

function AllAchievementsPage({ username, avatar, onMenu, onBack }) {
  const [achievements, setAchievements] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    const controller = new AbortController(); setError('');
    fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/achievements/${encodeURIComponent(username)}`, { signal: controller.signal })
      .then(response => response.ok ? response.json() : Promise.reject(response))
      .then(payload => setAchievements(payload.unlocked || []))
      .catch(fetchError => { if (fetchError.name !== 'AbortError') setError('Could not load achievements.'); });
    return () => controller.abort();
  }, [username]);
  const IconFor = achievement => achievementIconMap[achievement.icon] || Award;
  return <main className="achievements-page all-achievements-page"><header className="achievements-topbar"><div className="mobile-title"><Logo /><span>All Achievements</span></div><div className="achievements-title"><button className="achievement-back" type="button" onClick={onBack}>← Back to achievements</button><h1>All Achievements</h1><p>Browse every achievement earned by {username}.</p></div><div className="achievements-actions"><div className="avatar">{avatar ? <img src={avatar} alt="Profile avatar" /> : username.slice(0, 1).toUpperCase()}</div></div><MenuButton onClick={onMenu} /></header>{error && <p className="api-error">{error}</p>}<Card className="all-achievements-card"><h2>Unlocked Achievements</h2><div className="all-achievement-grid">{achievements.length ? achievements.map(achievement => <article className="all-achievement-item" key={achievement.id}><AchievementIcon IconComponent={IconFor(achievement)} tone={achievement.tone} /><b>{achievement.title}</b><small>{achievement.description}</small><em>Unlocked</em></article>) : <p className="achievement-empty">No achievements unlocked yet. Keep building!</p>}</div></Card></main>;
}

function LockedAchievementsPage({ username, avatar, onMenu, onBack }) {
  const [achievements, setAchievements] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    const controller = new AbortController(); setError('');
    fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/achievements/${encodeURIComponent(username)}`, { signal: controller.signal })
      .then(response => response.ok ? response.json() : Promise.reject(response))
      .then(payload => setAchievements(payload.locked || []))
      .catch(fetchError => { if (fetchError.name !== 'AbortError') setError('Could not load achievements.'); });
    return () => controller.abort();
  }, [username]);
  const IconFor = achievement => achievementIconMap[achievement.icon] || Lock;
  return <main className="achievements-page all-achievements-page"><header className="achievements-topbar"><div className="mobile-title"><Logo /><span>Locked Achievements</span></div><div className="achievements-title"><button className="achievement-back" type="button" onClick={onBack}>← Back to achievements</button><h1>Locked Achievements</h1><p>Track your progress toward the next milestones.</p></div><div className="achievements-actions"><div className="avatar">{avatar ? <img src={avatar} alt="Profile avatar" /> : username.slice(0, 1).toUpperCase()}</div></div><MenuButton onClick={onMenu} /></header>{error && <p className="api-error">{error}</p>}<Card className="all-achievements-card locked-achievements-card"><h2>Locked Achievements</h2><div className="all-locked-list">{achievements.length ? achievements.map(achievement => <article className="all-locked-item" key={achievement.id}><AchievementIcon IconComponent={IconFor(achievement)} tone="locked" /><div><b>{achievement.title}</b><small>{achievement.description}</small></div><i><span style={{ width: `${achievement.progress || 0}%` }} /></i><em>{achievement.progress || 0}%</em></article>) : <p className="achievement-empty">No locked achievements found.</p>}</div></Card></main>;
}

function ProfilePage({ username, profile = {}, stackLanguages = [], insights = [], onMenu, onNavigate }) {
  const [details, setDetails] = useState({});
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/profile/${encodeURIComponent(username)}`, { signal: controller.signal })
      .then(response => response.ok ? response.json() : Promise.reject(response))
      .then(data => setDetails(data))
      .catch(fetchError => { if (fetchError.name !== 'AbortError') setDetails({}); });
    return () => controller.abort();
  }, [username]);
  useEffect(() => {
    const controller = new AbortController();
    fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/achievements/${encodeURIComponent(username)}`, { signal: controller.signal })
      .then(response => response.ok ? response.json() : Promise.reject(response))
      .then(data => setUnlockedAchievements(data.unlocked || []))
      .catch(fetchError => { if (fetchError.name !== 'AbortError') setUnlockedAchievements([]); });
    return () => controller.abort();
  }, [username]);
  const liveProfile = { ...profile, ...details };
  const stats = [
    [FolderGit2, formatNumber(liveProfile.publicRepos), 'Repositories', 'blue'],
    [Users, formatNumber(liveProfile.followers), 'Followers', 'amber'],
    [UserRoundCheck, formatNumber(liveProfile.following), 'Following', 'violet'],
    [Star, formatNumber(liveProfile.totalStars), 'Total Stars', 'green'],
  ];
  const completionItems = [['Profile Photo', Boolean(liveProfile.avatar)], ['Bio', Boolean(liveProfile.bio)], ['Location', Boolean(liveProfile.location)], ['Website', Boolean(liveProfile.website)], ['Email', Boolean(liveProfile.email)], ['Twitter (Optional)', Boolean(liveProfile.twitter)]];
  const completion = Math.round((completionItems.filter(([, complete]) => complete).length / completionItems.length) * 100);
  const profileInsights = insights;
  const name = liveProfile.name || liveProfile.username || username;
  const handle = `@${liveProfile.username || username}`;
  const joined = liveProfile.joinedAt || liveProfile.createdAt ? formatMonth(liveProfile.joinedAt || liveProfile.createdAt) : 'Unknown';
  return <main className="profile-page">
    <header className="profile-topbar">
      <div className="mobile-title"><Logo /><span>Profile</span></div>
      <div className="profile-title"><h1>Profile</h1><p>Detailed profile information and developer analytics.</p></div>
      <div className="profile-actions"><button className="bell" aria-label="Notifications"><Bell size={22} /></button><div className="avatar">{liveProfile.avatar ? <img src={liveProfile.avatar} alt="Profile avatar" /> : name.slice(0, 1)}</div></div>
      <MenuButton onClick={onMenu} />
    </header>
    <Card className="profile-hero">
      <div className="profile-identity"><div className="profile-avatar">{liveProfile.avatar ? <img src={liveProfile.avatar} alt={`${name} avatar`} /> : <span />}</div><div><h2>{name}</h2><p>{handle}</p><p>{liveProfile.bio || 'No bio provided'}</p><strong><CalendarDays size={15} /> Joined {joined}</strong></div></div>
      <div className="profile-stats">{stats.map(([Glyph, value, label, tone]) => <div className="profile-stat" key={label}><span className={`round ${tone}`}><Glyph size={22} /></span><div><b>{value}</b><small>{label}</small></div></div>)}</div>
    </Card>
    <div className="profile-layout">
      <section className="profile-main-column">
        <Card className="profile-about"><h2>About</h2><p>{liveProfile.bio || 'This GitHub account has not added a public bio yet.'}</p></Card>
        <Card className="profile-stack"><h2>Primary Stack</h2><div>{stackLanguages.length ? stackLanguages.slice(0, 5).map((language, index) => <span className={['violet', 'pink', 'orange', 'blue', 'green'][index]} key={language.name}>{language.name}</span>) : <p>No languages found in public repositories.</p>}</div></Card>
        <Card className="profile-achievements"><h2>Unlocked Achievements</h2><div>{unlockedAchievements.length ? unlockedAchievements.slice(0, 4).map(achievement => { const Glyph = achievementIconMap[achievement.icon] || Award; return <article key={achievement.id}><span className={`achievement-symbol ${achievement.tone || 'violet'}`}><Glyph size={25} /></span><b>{achievement.title}</b><small>{achievement.description}</small><em>Unlocked</em></article>; }) : <p className="profile-achievement-empty">No achievements unlocked yet.</p>}</div><button type="button" onClick={() => onNavigate('AllAchievements')}>View All Achievements <span>→</span></button></Card>
      </section>
      <aside className="profile-side-column">
        <Card className="profile-completeness"><h2>Profile Completeness</h2><div className="completion-content"><div className="completion-ring" style={{ '--completion': `${completion * 3.6}deg` }}><b>{completion}%</b></div><div className="completion-items">{completionItems.map(([label, complete]) => <p key={label} className={complete ? 'complete' : 'incomplete'}>{complete ? <CheckCircle2 size={18} /> : <CircleDot size={18} />}{label}</p>)}</div></div><p className="completion-message">Great job! Your profile is almost perfect.</p></Card>
        <Card className="profile-insights"><h2>Smart Insights</h2>{profileInsights.length ? profileInsights.map((item, index) => <p key={`${item}-${index}`}><span className={`insight-icon n${index % 5}`}>{index % 5 === 0 ? <Braces size={14} /> : index % 5 === 1 ? <Crown size={14} /> : index % 5 === 2 ? <Code2 size={14} /> : index % 5 === 3 ? <GitFork size={14} /> : <Share2 size={14} />}</span>{item}</p>) : <p>No insights available for this account.</p>}</Card>
      </aside>
    </div>
  </main>;
}

export default function App() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(() => window.location.hash.slice(1) || 'Overview');
  const [username, setUsername] = useState(import.meta.env.VITE_GITHUB_USERNAME || 'octocat');
  const [chartData, setChartData] = useState({ created: createdByYear, updated: updatedByYear, languages: languageFallback, stackLanguages: languageFallback, totalLanguages: 8, health: healthFallback, profile: {}, highlights: {}, productivity: {}, insights: [] });
  const [error, setError] = useState('');
  useEffect(() => {
    const syncPageFromHash = () => setPage(window.location.hash.slice(1) || 'Overview');
    window.addEventListener('hashchange', syncPageFromHash);
    return () => window.removeEventListener('hashchange', syncPageFromHash);
  }, []);

  useEffect(() => {
    const configuredEndpoint = import.meta.env.VITE_OVERVIEW_API_URL;
    const endpoint = configuredEndpoint ? configuredEndpoint.replace(':username', encodeURIComponent(username)) : `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/overview/${encodeURIComponent(username)}`;
    const controller = new AbortController();
    setError('');
    fetch(endpoint, { signal: controller.signal })
      .then(response => response.ok ? response.json() : Promise.reject(response))
      .then(payload => { const languageSource = payload.languageDistribution ?? payload.languages?.distribution ?? payload.languages; return setChartData({
        created: normaliseChartData(payload.repositoriesCreatedByYear ?? payload.activity?.reposCreatedPerYear ?? payload.created, createdByYear),
        updated: normaliseChartData(payload.repositoriesUpdatedByYear ?? payload.activity?.reposUpdatedPerYear ?? payload.updated, updatedByYear),
        languages: normaliseLanguageData(payload.languageDistribution ?? payload.languages?.distribution ?? payload.languages),
        stackLanguages: Array.isArray(languageSource) ? languageSource.map((language, index) => ({ name: String(language.name ?? language.language ?? `Other ${index + 1}`), value: Number(language.value ?? language.percentage ?? language.count ?? 0) })).filter(language => language.value > 0).sort((a, b) => b.value - a.value).slice(0, 6) : languageFallback,
        totalLanguages: Number(payload.totalLanguagesUsed ?? payload.totalLanguages ?? payload.languages?.totalLanguages ?? payload.languages?.summary?.totalLanguages ?? 8),
        health: normaliseHealth(payload),
        profile: payload.profile ?? {},
        highlights: payload.highlights ?? {},
        productivity: { ...(payload.productivity ?? {}), periods: payload.productivity?.periods ?? {}, averageReposPerYear: payload.activity?.averageReposPerYear ?? 0, averageUpdatedPerYear: payload.activity?.reposUpdatedPerYear?.length ? (payload.repositories?.total / payload.activity.reposUpdatedPerYear.length).toFixed(2) : 0 },
        insights: pickRandomInsights(payload.insights ?? []),
      }); })
      .catch(error => { if (error.name !== 'AbortError') { console.warn('Overview data could not be loaded.', error); setError(`Could not load GitHub user “${username}”. Please check the username and try again.`); } });
    return () => controller.abort();
  }, [username]);

  const navigate = nextPage => { setPage(nextPage); window.location.hash = nextPage; };
  const overview = <main><DynamicHeader onMenu={() => setOpen(true)} username={username} onSearch={setUsername} avatar={chartData.profile.avatar} /><DynamicProfile profile={chartData.profile} /><div className="overview-layout"><div className="repo-column"><DynamicRepos highlights={chartData.highlights} languages={chartData.stackLanguages} /><div className="activity-column"><DynamicActivity productivity={chartData.productivity} highlights={chartData.highlights} /><Health health={chartData.health} /></div></div><div className="details-column"><LanguageChart data={chartData.languages} total={chartData.totalLanguages} /><DynamicStack languages={chartData.stackLanguages} /><Productivity createdData={chartData.created} updatedData={chartData.updated} averageCreated={chartData.productivity.averageReposPerYear} averageUpdated={chartData.productivity.averageUpdatedPerYear} /><DynamicInsights entries={chartData.insights} /></div></div></main>;
  const content = error ? <UserLookupError username={username} error={error} onMenu={() => setOpen(true)} onSearch={setUsername} /> : page === 'Repositories' ? <RepositoryPage username={username} overview={chartData} avatar={chartData.profile.avatar} onMenu={() => setOpen(true)} /> : page === 'Languages' ? <LanguagePage username={username} avatar={chartData.profile.avatar} insights={chartData.insights} onMenu={() => setOpen(true)} /> : page === 'Achievements' ? <DynamicAchievementPage username={username} avatar={chartData.profile.avatar} onSearch={setUsername} onMenu={() => setOpen(true)} /> : page === 'Profile' ? <ProfilePage username={username} profile={chartData.profile} stackLanguages={chartData.stackLanguages} insights={chartData.insights} onNavigate={navigate} onMenu={() => setOpen(true)} /> : page === 'AllAchievements' ? <AllAchievementsPage username={username} avatar={chartData.profile.avatar} onMenu={() => setOpen(true)} onBack={() => navigate('Achievements')} /> : page === 'LockedAchievements' ? <LockedAchievementsPage username={username} avatar={chartData.profile.avatar} onMenu={() => setOpen(true)} onBack={() => navigate('Achievements')} /> : overview;
  const activePage = page === 'AllAchievements' || page === 'LockedAchievements' ? 'Achievements' : page;
  return <><Sidebar activePage={activePage} onNavigate={navigate} />{content}<Drawer open={open} onClose={() => setOpen(false)} activePage={activePage} onNavigate={navigate} /></>;
}
