import { useEffect, useMemo, useState } from "react";
import { Brain, Sparkles, Trophy, Zap, Target, Gamepad2, UserRound, LogOut, Clock3, RotateCcw, ChevronRight, Medal, Layers3, X, Check, LockKeyhole } from "lucide-react";
import { request } from "./api";

const games = [
  { id: "memory", name: "Memory Match", category: "MEMORY", description: "Find every matching pair.", icon: "🧠", color: "violet", difficulty: "Easy · Medium" },
  { id: "logic", name: "Logic Master", category: "LOGIC", description: "Crack number sequences and patterns.", icon: "🔮", color: "blue", difficulty: "Medium" },
  { id: "math", name: "Math Rush", category: "SPEED", description: "Solve quick-fire calculations.", icon: "⚡", color: "orange", difficulty: "Easy · Hard" },
  { id: "reaction", name: "Reaction Challenge", category: "REFLEX", description: "React the moment the signal appears.", icon: "🎯", color: "green", difficulty: "Quick rounds" },
  { id: "visual", name: "Shape & Pattern Quest", category: "VISUAL", description: "Spot the missing piece in a pattern.", icon: "🧩", color: "pink", difficulty: "Medium · Hard" }
];
const API_NAMES = { memory: "Memory Match", logic: "Logic Master", math: "Math Rush", reaction: "Reaction Challenge", visual: "Shape & Pattern Quest" };
const puzzles = [
  { q: "What comes next? 2, 4, 8, 16, ?", options: ["18", "24", "32", "34"], answer: "32", explain: "Each number doubles." },
  { q: "What comes next? 3, 6, 11, 18, ?", options: ["25", "27", "29", "30"], answer: "27", explain: "Add 3, then 5, then 7, then 9." },
  { q: "Which one does not belong?", options: ["Triangle", "Square", "Circle", "Cube"], answer: "Cube", explain: "A cube is 3D; the others are 2D shapes." },
  { q: "If all Bloops are Razzies, and all Razzies are Lazzies, are all Bloops Lazzies?", options: ["Yes", "No", "Cannot tell", "Only some"], answer: "Yes", explain: "The relationship carries through both groups." },
  { q: "What comes next? 1, 1, 2, 3, 5, 8, ?", options: ["11", "12", "13", "15"], answer: "13", explain: "Each number is the sum of the previous two." }
];
const visualPuzzles = [
  { q: "🔺  🔺🔺  🔺🔺🔺  ?", options: ["🔺", "🔺🔺", "🔺🔺🔺🔺", "🔵🔵🔵🔵"], answer: "🔺🔺🔺🔺" },
  { q: "Find the odd one out.", options: ["🟦", "🟦", "🔴", "🟦"], answer: "🔴" },
  { q: "Complete the repeating pattern: 🌙 ⭐ 🌙 ⭐ ?", options: ["☀️", "⭐", "🌙", "☁️"], answer: "🌙" },
  { q: "Which shape has the most sides?", options: ["🔺 Triangle", "🟦 Square", "⬟ Pentagon", "⚪ Circle"], answer: "⬟ Pentagon" }
];
function shuffle(items) { return [...items].sort(() => Math.random() - 0.5); }
function AuthModal({ mode, onClose, onSuccess }) {
  const [kind, setKind] = useState(mode || "login");
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e) {
    e.preventDefault(); setError(""); setBusy(true);
    try {
      const data = await request(`/auth/${kind}`, { method: "POST", body: JSON.stringify(form) });
      onSuccess(data); onClose();
    } catch (e) { setError(e.message); } finally { setBusy(false); }
  }
  return <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && onClose()}><section className="auth-modal glass">
    <button className="icon-button close-button" onClick={onClose} aria-label="Close"><X size={18}/></button>
    <div className="brand-mark small"><Brain size={23}/></div><p className="eyebrow">YOUR NEXT LEVEL STARTS HERE</p><h2>{kind === "login" ? "Welcome back" : "Create your player profile"}</h2>
    <p className="muted">Save your scores and join the leaderboard.</p>
    <form onSubmit={submit} className="auth-form">
      {kind === "register" && <label>Username<input required minLength="3" maxLength="20" value={form.username} onChange={e => setForm({...form, username:e.target.value})} placeholder="mindexplorer" autoComplete="username"/></label>}
      <label>Email<input required type="email" value={form.email} onChange={e => setForm({...form,email:e.target.value})} placeholder="you@example.com" autoComplete="email"/></label>
      <label>Password<input required type="password" minLength="8" maxLength="72" value={form.password} onChange={e => setForm({...form,password:e.target.value})} placeholder="At least 8 characters" autoComplete={kind === "login" ? "current-password" : "new-password"}/></label>
      {error && <p className="error-message">{error}</p>}
      <button className="primary-button full" disabled={busy}>{busy ? "Please wait..." : kind === "login" ? "Log in" : "Create account"} <ChevronRight size={17}/></button>
    </form>
    <p className="switch-auth">{kind === "login" ? "New to MindSpark?" : "Already have an account?"} <button onClick={() => {setKind(kind === "login" ? "register" : "login");setError("");}}>{kind === "login" ? "Create account" : "Log in"}</button></p>
  </section></div>;
}
function MemoryGame({ finish }) {
  const symbols = ["🌙","🌈","🪐","🦋","🌸","⚡"];
  const [cards, setCards] = useState(() => shuffle([...symbols,...symbols]).map((v,i)=>({id:i,value:v})));
  const [open,setOpen] = useState([]); const [matched,setMatched] = useState([]); const [moves,setMoves] = useState(0); const [started] = useState(Date.now());
  useEffect(() => { if (open.length !== 2) return; const [a,b] = open; const timer = setTimeout(() => { if (cards[a].value === cards[b].value) setMatched(old => [...old,a,b]); setOpen([]); }, 650); return () => clearTimeout(timer); }, [open, cards]);
  useEffect(() => { if (matched.length === cards.length) finish(Math.max(100, 1000 - moves*35), Math.max(1, Math.round((Date.now()-started)/1000)), 100); }, [matched, cards.length]);
  function flip(i) { if(open.length === 2 || open.includes(i) || matched.includes(i)) return; setOpen(old=>[...old,i]); if(open.length === 1) setMoves(m=>m+1); }
  return <div className="memory-board">{cards.map((c,i)=><button key={c.id} className={`memory-card ${open.includes(i)||matched.includes(i)?"revealed":""}`} onClick={()=>flip(i)} aria-label={open.includes(i)||matched.includes(i)?c.value:"Reveal card"}>{open.includes(i)||matched.includes(i)?c.value:"✦"}</button>)}<p className="game-hint">Moves: {moves} · Pairs: {matched.length/2}/6</p></div>;
}
function QuestionGame({ type, finish }) {
  const questions = type === "visual" ? visualPuzzles : puzzles;
  const [index,setIndex] = useState(0); const [correct,setCorrect] = useState(0); const [selected,setSelected] = useState(""); const [started] = useState(Date.now());
  const item = questions[index];
  function answer(option) {
    if(selected) return;
    setSelected(option);
    const isCorrect = option === item.answer; const nextCorrect = correct + (isCorrect?1:0); setCorrect(nextCorrect);
    setTimeout(() => {
      if(index === questions.length-1) finish(Math.round(nextCorrect/questions.length*1000), Math.max(1,Math.round((Date.now()-started)/1000)), Math.round(nextCorrect/questions.length*100));
      else { setIndex(index+1); setSelected(""); }
    }, 800);
  }
  return <div className="question-game"><div className="question-progress"><span>CHALLENGE {index+1} / {questions.length}</span><div><i style={{width:`${(index+1)/questions.length*100}%`}}/></div></div><h3>{item.q}</h3><div className="answer-grid">{item.options.map(o=><button key={o} className={`answer-option ${selected===o?(o===item.answer?"correct":"incorrect"):""} ${selected && o===item.answer?"correct":""}`} disabled={!!selected} onClick={()=>answer(o)}>{o}</button>)}</div>{selected && <p className="feedback">{selected===item.answer?<><Check size={16}/> Correct!</>:<>Not quite.</>} {item.explain || ""}</p>}</div>;
}
function MathGame({ finish }) {
  const makeQ = () => { const a=Math.floor(Math.random()*20)+2,b=Math.floor(Math.random()*15)+1,op=Math.random()>.5?"+":"−"; return {q:`${a} ${op} ${b}`,answer:op==="+"?a+b:a-b}; };
  const [q,setQ] = useState(makeQ); const [value,setValue] = useState(""); const [round,setRound] = useState(0); const [correct,setCorrect] = useState(0); const [started] = useState(Date.now());
  function submit(e) { e.preventDefault(); const hit=Number(value)===q.answer; const score=correct+(hit?1:0); if(round===9) finish(Math.round(score*100),Math.max(1,Math.round((Date.now()-started)/1000)),Math.round(score*10)); else {setCorrect(score);setRound(round+1);setQ(makeQ());setValue("");} }
  return <div className="math-game"><p className="eyebrow">QUESTION {round+1} OF 10</p><div className="math-equation">{q.q} <span>= ?</span></div><form className="math-form" onSubmit={submit}><input autoFocus type="number" value={value} onChange={e=>setValue(e.target.value)} placeholder="Your answer" required/><button className="primary-button">Submit <ChevronRight size={16}/></button></form><p className="muted">Correct so far: {correct}</p></div>;
}
function ReactionGame({ finish }) {
  const [phase,setPhase] = useState("ready"); const [elapsed,setElapsed] = useState(0); const [started,setStarted] = useState(0);
  useEffect(() => { if(phase!=="waiting") return; const delay=1200+Math.random()*2500; const t=setTimeout(()=>{setStarted(performance.now());setPhase("go");},delay); return ()=>clearTimeout(t); },[phase]);
  function click() { if(phase==="ready"){setPhase("waiting");return;} if(phase==="waiting"){setPhase("early");return;} if(phase==="go"){const ms=Math.round(performance.now()-started);setElapsed(ms);setPhase("done");finish(Math.max(0,1000-ms),Math.max(1,Math.round(ms/1000)),Math.max(0,Math.min(100,Math.round(1000-ms)/10)));} }
  return <button className={`reaction-zone ${phase}`} onClick={click}><span className="reaction-symbol">{phase==="ready"?"🎯":phase==="waiting"?"⌛":phase==="go"?"⚡":phase==="early"?"😅": "✨"}</span><strong>{phase==="ready"?"Tap to start":phase==="waiting"?"Wait for the signal!":phase==="go"?"TAP NOW!":phase==="early"?"Too early! Tap to retry":`Your time: ${elapsed} ms`}</strong><small>{phase==="done"?"Nice reflexes.": "React as quickly as you can."}</small>{phase==="done"&&<span className="replay-label">Play again</span>}</button>;
}
function GameModal({ game, onClose, onFinish, signedIn }) {
  const [result,setResult] = useState(null); const [saving,setSaving] = useState(false); const [saveMessage,setSaveMessage] = useState("");
  async function finish(score,durationSeconds,accuracy) { setResult({score,durationSeconds,accuracy}); if(signedIn){setSaving(true);try{await onFinish({gameId:game.id,score,durationSeconds,accuracy});setSaveMessage("Score saved to your profile!");}catch(e){setSaveMessage(e.message || "Could not save score.");}finally{setSaving(false);}} }
  function restart(){setResult(null);setSaveMessage("");}
  return <div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&onClose()}><section className="game-modal glass"><div className="game-modal-head"><div><p className="eyebrow">{game.category} ARENA</p><h2>{game.icon} {game.name}</h2></div><button className="icon-button" onClick={onClose} aria-label="Close game"><X size={18}/></button></div>
    {!result ? <>{game.id==="memory"?<MemoryGame key={game.id+String(result)} finish={finish}/>:game.id==="math"?<MathGame key={game.id+String(result)} finish={finish}/>:game.id==="reaction"?<ReactionGame key={game.id+String(result)} finish={finish}/>:<QuestionGame key={game.id+String(result)} type={game.id} finish={finish}/>}</>:
      <div className="result-panel"><div className="result-orb">🏆</div><p className="eyebrow">CHALLENGE COMPLETE</p><h2>Nice work, mind explorer!</h2><div className="result-stats"><div><strong>{result.score}</strong><span>POINTS</span></div><div><strong>{result.accuracy}%</strong><span>ACCURACY</span></div><div><strong>{result.durationSeconds}s</strong><span>TIME</span></div></div><p className="muted">{saveMessage || (signedIn?"Saving your score...":"Log in to save this score to your profile.")}</p><div className="result-actions"><button className="primary-button" onClick={restart}><RotateCcw size={16}/> Play again</button><button className="secondary-button" onClick={onClose}>Back to lobby</button></div></div>}
    <div className="game-modal-foot"><span><LockKeyhole size={13}/> {signedIn?"Progress syncing":"Guest play · Sign in to save scores"}</span>{saving&&<span>Saving…</span>}</div>
  </section></div>;
}
export default function App() {
  const [user,setUser] = useState(()=>{try{return JSON.parse(localStorage.getItem("ms-user")||"null")}catch{return null}});
  const [token,setToken] = useState(()=>localStorage.getItem("ms-token")||"");
  const [auth,setAuth] = useState(null); const [activeGame,setActiveGame] = useState(null); const [tab,setTab] = useState("games");
  const [leaderboard,setLeaderboard] = useState([]); const [history,setHistory] = useState([]); const [toast,setToast] = useState("");
  const [filter,setFilter] = useState("ALL");
  useEffect(()=>{request("/games/leaderboard").then(d=>setLeaderboard(d.leaderboard)).catch(()=>{});},[]);
  useEffect(()=>{if(token) request("/auth/me",{},token).then(d=>setUser(d.user)).catch(()=>logout());},[]);
  useEffect(()=>{if(token&&tab==="profile")request("/games/history",{},token).then(d=>setHistory(d.results)).catch(e=>setToast(e.message));},[token,tab]);
  function acceptAuth(data){setToken(data.token);setUser(data.user);localStorage.setItem("ms-token",data.token);localStorage.setItem("ms-user",JSON.stringify(data.user));setToast(`Welcome, ${data.user.username}!`);request("/games/leaderboard").then(d=>setLeaderboard(d.leaderboard)).catch(()=>{});}
  function logout(){setUser(null);setToken("");localStorage.removeItem("ms-token");localStorage.removeItem("ms-user");setTab("games");}
  async function saveResult(result){const d=await request("/games/result",{method:"POST",body:JSON.stringify(result)},token);setUser(u=>({...u,...d.profile}));localStorage.setItem("ms-user",JSON.stringify({...user,...d.profile}));const lb=await request("/games/leaderboard");setLeaderboard(lb.leaderboard);return d;}
  const categories=["ALL","MEMORY","LOGIC","SPEED","REFLEX","VISUAL"];
  const visibleGames=useMemo(()=>games.filter(g=>filter==="ALL"||g.category===filter),[filter]);
  return <div className="app-shell"><div className="ambient ambient-one"/><div className="ambient ambient-two"/><div className="starfield"/>
    <header className="topbar"><button className="brand" onClick={()=>setTab("games")}><span className="brand-mark"><Brain size={24}/></span><span>mind<span className="brand-accent">spark</span><small>BRAIN TRAINING ARENA</small></span></button><nav className="desktop-nav"><button className={tab==="games"?"active":""} onClick={()=>setTab("games")}>Explore games</button><button className={tab==="leaderboard"?"active":""} onClick={()=>setTab("leaderboard")}>Leaderboard</button><button className={tab==="profile"?"active":""} onClick={()=>user?setTab("profile"):setAuth("login")}>My progress</button></nav><div className="top-actions">{user?<><span className="user-pill"><span className="online-dot"/>{user.username}</span><button className="icon-button" onClick={logout} title="Log out"><LogOut size={17}/></button></>:<><button className="text-button" onClick={()=>setAuth("login")}>Log in</button><button className="primary-button join-button" onClick={()=>setAuth("register")}>Join free <ChevronRight size={16}/></button></>}</div></header>
    <main className="main-content">
      {tab==="games"&&<><section className="hero"><div className="hero-copy"><div className="status-chip"><span className="online-dot"/> YOUR DAILY DOSE OF BRAIN POWER</div><h1>Make your mind<br/>your <span className="gradient-text">superpower.</span></h1><p>Five playful challenges. Endless ways to level up your thinking. Ready to see what your mind can do?</p><div className="hero-actions"><button className="primary-button" onClick={()=>document.getElementById("game-lobby")?.scrollIntoView({behavior:"smooth"})}><Gamepad2 size={18}/> Explore games <ChevronRight size={17}/></button><button className="secondary-button" onClick={()=>setTab("leaderboard")}><Trophy size={17}/> View leaderboard</button></div><div className="hero-proof"><div className="avatar-stack"><span>🧠</span><span>⚡</span><span>🧩</span></div><span><strong>5 unique games</strong><br/>One curious mind at a time</span></div></div><div className="hero-visual"><div className="orbit orbit-a"/><div className="orbit orbit-b"/><div className="hero-core"><div className="core-glow"/><Brain size={112} strokeWidth={1.1}/><Sparkles className="spark spark-a" size={25}/><Zap className="spark spark-b" size={23}/><span className="core-label">THINK<br/>BEYOND</span></div><div className="float-card float-card-top"><span className="float-icon violet-bg"><Target size={17}/></span><span><strong>Stay sharp</strong><small>One round at a time</small></span></div><div className="float-card float-card-bottom"><span className="float-icon blue-bg"><Trophy size={17}/></span><span><strong>Beat your best</strong><small>Progress starts here</small></span></div><div className="mini-orb orb-one">✦</div><div className="mini-orb orb-two">✧</div></div></section>
        <section className="stats-strip"><div><span className="stat-icon"><Layers3 size={18}/></span><span><strong>05</strong><small>Brain games</small></span></div><div><span className="stat-icon"><Zap size={18}/></span><span><strong>∞</strong><small>Ways to challenge</small></span></div><div><span className="stat-icon"><Trophy size={18}/></span><span><strong>YOUR</strong><small>Personal best</small></span></div><div><span className="stat-icon"><Clock3 size={18}/></span><span><strong>5 MIN</strong><small>Daily brain break</small></span></div></section>
        <section className="games-section" id="game-lobby"><div className="section-heading"><div><p className="eyebrow">CHOOSE YOUR CHALLENGE</p><h2>Enter the <span className="gradient-text">playground.</span></h2><p className="muted">Pick a game. Find your flow. Beat your last score.</p></div><span className="game-count"><span className="online-dot"/> {games.length} GAMES READY</span></div><div className="filter-row">{categories.map(c=><button key={c} onClick={()=>setFilter(c)} className={`filter-chip ${filter===c?"selected":""}`}>{c==="ALL"?"All games":c[0]+c.slice(1).toLowerCase()}</button>)}</div><div className="games-grid">{visibleGames.map((g,i)=><article className={`game-card ${g.color}`} key={g.id} style={{"--delay":`${i*70}ms`}}><div className="card-topline"><span className="category-tag">{g.category}</span><span className="card-number">0{games.indexOf(g)+1}</span></div><div className="game-art"><div className="art-orbit"/><div className="art-orb">{g.icon}</div><span className="art-spark spark-left">✦</span><span className="art-spark spark-right">✧</span></div><h3>{g.name}</h3><p>{g.description}</p><div className="card-footer"><span>{g.difficulty}</span><button aria-label={`Play ${g.name}`} onClick={()=>setActiveGame(g)}><span>Play now</span><ChevronRight size={16}/></button></div></article>)}</div></section>
        <section className="bottom-cta"><div className="cta-orb">🌌</div><div><p className="eyebrow">YOUR NEXT HIGH SCORE IS WAITING</p><h2>A little challenge. A lot of <span className="gradient-text">brainpower.</span></h2><p className="muted">Create a free profile to keep your scores and climb the leaderboard.</p></div><button className="primary-button" onClick={()=>user?setTab("profile"):setAuth("register")}>{user?"View my progress":"Create free profile"} <ChevronRight size={17}/></button></section></>}
      {tab==="leaderboard"&&<section className="page-section"><p className="eyebrow">THE MINDSHARKS</p><h1>Hall of <span className="gradient-text">brilliance.</span></h1><p className="muted">Every point is another challenge conquered.</p><div className="leaderboard-panel glass"><div className="panel-title"><Trophy size={20}/><h2>Global leaderboard</h2></div>{leaderboard.length?<div className="leader-list">{leaderboard.map((p,i)=><div className={`leader-row ${i===0?"first":""}`} key={p.rank}><span className="rank">{String(p.rank).padStart(2,"0")}</span><span className="leader-avatar">{["👑","🧠","⚡","🦊","🌙"][i%5]}</span><span className="leader-name">{p.username}{user?.username===p.username&&<small>YOU</small>}</span><span className="leader-games">{p.gamesPlayed} games</span><strong className="leader-points">{p.totalPoints.toLocaleString()} <small>PTS</small></strong></div>)}</div>:<div className="empty-state"><Trophy size={35}/><h3>The leaderboard is waiting.</h3><p>Be one of the first to create a profile and post a score.</p><button className="primary-button" onClick={()=>setAuth("register")}>Join the arena</button></div>}</div><button className="secondary-button" onClick={()=>setTab("games")}>← Back to games</button></section>}
      {tab==="profile"&&<section className="page-section"><p className="eyebrow">PLAYER CONTROL ROOM</p><h1>Your mind, your <span className="gradient-text">journey.</span></h1><p className="muted">Welcome back, {user?.username}.</p><div className="profile-stats"><div className="glass"><Zap/><strong>{(user?.totalPoints||0).toLocaleString()}</strong><span>Total points</span></div><div className="glass"><Gamepad2/><strong>{user?.gamesPlayed||0}</strong><span>Games played</span></div><div className="glass"><Medal/><strong>{user?.achievements?.length||0}</strong><span>Achievements</span></div></div><div className="leaderboard-panel glass"><div className="panel-title"><Clock3 size={20}/><h2>Recent sessions</h2></div>{history.length?<div className="leader-list">{history.map(r=><div className="leader-row" key={r._id}><span className="leader-avatar">{games.find(g=>g.id===r.gameId)?.icon||"🎮"}</span><span className="leader-name">{API_NAMES[r.gameId]||r.gameId}</span><span className="leader-games">{r.accuracy}% accuracy</span><strong className="leader-points">{r.score} <small>PTS</small></strong></div>)}</div>:<div className="empty-state"><Gamepad2 size={32}/><h3>Your first score is waiting.</h3><p>Play a game and your results will appear here.</p><button className="primary-button" onClick={()=>setTab("games")}>Find a game</button></div>}</div><button className="secondary-button" onClick={()=>setTab("games")}>← Back to games</button></section>}
    </main>
    <footer className="footer"><button className="brand footer-brand" onClick={()=>setTab("games")}><span className="brand-mark small"><Brain size={18}/></span><span>mind<span className="brand-accent">spark</span></span></button><span>Built for curious minds. <span className="footer-star">✦</span></span><span>PLAY SMART · STAY CURIOUS</span></footer>
    {auth&&<AuthModal mode={auth} onClose={()=>setAuth(null)} onSuccess={acceptAuth}/>}
    {activeGame&&<GameModal game={activeGame} onClose={()=>setActiveGame(null)} onFinish={saveResult} signedIn={!!token}/>}
    {toast&&<button className="toast" onClick={()=>setToast("")}>{toast}<X size={14}/></button>}
  </div>;
}
