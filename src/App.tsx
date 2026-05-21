import { useMemo, useState } from "react";
import { seedLessons, seedCanon, categories, lessonTypes, attributionTypes, momentsList, type FamilyCanonEntry, type TinyLesson } from "./data";

type View = "dashboard" | "library" | "new" | "moments" | "canon";

const uid = () => crypto.randomUUID();

const formatSms = (lesson: TinyLesson) => `Tiny Lesson: ${lesson.title}\n\n“${lesson.aphorism}” — ${lesson.attribution}\n\n${lesson.plainEnglish}\n\nTry this: ${lesson.tinyAction}\n\nReply: ${lesson.replyPrompt}`;

export function App() {
  const [view, setView] = useState<View>("dashboard");
  const [lessons, setLessons] = useState<TinyLesson[]>(seedLessons);
  const [canon, setCanon] = useState<FamilyCanonEntry[]>(seedCanon);
  const [selected, setSelected] = useState<TinyLesson | null>(lessons[0]);
  const [editing, setEditing] = useState<TinyLesson | null>(null);
  const [filter, setFilter] = useState({ category: "", tag: "", moment: "", source: "", lessonType: "", favorites: false });

  const filtered = useMemo(() => lessons.filter((l) =>
    (!filter.category || l.category === filter.category) &&
    (!filter.tag || l.tags.includes(filter.tag)) &&
    (!filter.moment || l.moments.includes(filter.moment)) &&
    (!filter.source || l.attributionType === filter.source) &&
    (!filter.lessonType || l.lessonType === filter.lessonType) &&
    (!filter.favorites || l.isFavorite)
  ), [lessons, filter]);

  const saveLesson = (draft: Partial<TinyLesson>) => {
    const now = new Date().toISOString();
    if (editing) {
      setLessons((x) => x.map((l) => l.id === editing.id ? { ...l, ...draft, updatedAt: now } as TinyLesson : l));
    } else {
      setLessons((x) => [{ id: uid(), createdAt: now, updatedAt: now, tags: [], moments: [], attributionType: "unknown", category: "Mindsets", ...draft } as TinyLesson, ...x]);
    }
    setEditing(null); setView("library");
  };

  const markSent = (id: string) => setLessons((x) => x.map((l) => l.id === id ? { ...l, sentAt: new Date().toISOString() } : l));

  return <div className="app"><header><h1>One Tiny Lesson</h1><p>Small seeds for a cultivated life.</p>
  <nav>{(["dashboard","library","new","moments","canon"] as View[]).map(v=><button key={v} onClick={()=>{setView(v); if(v==="new") setEditing(null);}}>{v === "new" ? "New Lesson" : v[0].toUpperCase()+v.slice(1)}</button>)}</nav></header>
  {view === "dashboard" && <section><h2>Lesson of the Day</h2><article className="card"><h3>{lessons[0].title}</h3><p className="quote">“{lessons[0].aphorism}”</p><p>{lessons[0].tinyAction}</p></article><div className="row">{["boredom","frustration","curiosity","needing courage","sloppy work","wonder","needing to apologize","being in nature"].map(m=><button key={m} onClick={()=>{setView("library"); setFilter((f)=>({...f,moment:m}));}}>{m}</button>)}</div></section>}
  {view === "library" && <section><h2>Library</h2><div className="filters">
    <select onChange={e=>setFilter(f=>({...f,category:e.target.value}))}><option value="">Category</option>{categories.map(c=><option key={c}>{c}</option>)}</select>
    <input placeholder="Tag" onChange={e=>setFilter(f=>({...f,tag:e.target.value}))}/>
    <select onChange={e=>setFilter(f=>({...f,moment:e.target.value}))}><option value="">Moment</option>{momentsList.map(m=><option key={m}>{m}</option>)}</select>
    <select onChange={e=>setFilter(f=>({...f,source:e.target.value}))}><option value="">Source</option>{attributionTypes.map(a=><option key={a}>{a}</option>)}</select>
    <select onChange={e=>setFilter(f=>({...f,lessonType:e.target.value}))}><option value="">Lesson Type</option>{lessonTypes.map(t=><option key={t}>{t}</option>)}</select>
    <label><input type="checkbox" onChange={e=>setFilter(f=>({...f,favorites:e.target.checked}))}/> Favorites</label>
  </div>
  <div className="grid">{filtered.map(l=><article className="card" key={l.id}><h3>{l.title} {l.isFavorite ? "★" : ""}</h3><p className="quote">“{l.aphorism}” — {l.attribution}</p><p>{l.category} · {l.lessonType}</p><p>Try this: {l.tinyAction}</p><button onClick={()=>{setSelected(l);}}>Open</button></article>)}</div>
  {selected && <article className="detail"><h2>Tiny Lesson: {selected.title}</h2><p className="quote">“{selected.aphorism}”<br/>— {selected.attribution}</p><p><b>Plain English:</b> {selected.plainEnglish}</p><p><b>Why it matters:</b> {selected.whyItMatters}</p><p><b>Try this:</b> {selected.tinyAction}</p><p><b>Reply:</b> {selected.replyPrompt}</p><div className="row"><button onClick={()=>{setEditing(selected); setView("new");}}>Edit</button><button onClick={()=>setLessons(x=>x.map(l=>l.id===selected.id?{...l,isFavorite:!l.isFavorite}:l))}>Favorite</button><button onClick={()=>navigator.clipboard.writeText(formatSms(selected))}>Copy Text Version</button><button onClick={()=>markSent(selected.id)}>Mark as sent</button><button>Send later</button></div></article>}</section>}
  {(view === "new") && <LessonForm key={editing?.id ?? "new"} lesson={editing} onSave={saveLesson} />}
  {view === "moments" && <section><h2>Moments</h2><div className="row">{momentsList.map(m=><button key={m} onClick={()=>{setView("library"); setFilter(f=>({...f,moment:m}));}}>{m}</button>)}</div></section>}
  {view === "canon" && <section><h2>Family Canon</h2>{canon.map(c=><article key={c.id} className="card"><h3>{c.title}</h3><p>{c.body}</p><small>{c.kind}</small></article>)}<button onClick={()=>setCanon(x=>[{id:uid(),title:"New Canon Entry",body:"A small recurring phrase.",kind:"family principle"},...x])}>Add Canon Placeholder</button></section>}
  </div>;
}

function LessonForm({ lesson, onSave }: { lesson: TinyLesson | null; onSave: (x: Partial<TinyLesson>) => void }) {
  const [draft, setDraft] = useState<Partial<TinyLesson>>(lesson ?? { attributionType: "family", lessonType: "aphorism", category: "Mindsets", tags: [], moments: [] });
  const set = (k: keyof TinyLesson, v: string | boolean) => setDraft((d) => ({ ...d, [k]: v }));
  return <section><h2>{lesson ? "Edit" : "Create"} Tiny Lesson</h2><div className="form">{[
    ["title","Title"],["aphorism","Aphorism"],["attribution","Attribution"],["plainEnglish","Plain English"],["whyItMatters","Why it matters"],["tinyAction","Tiny action"],["replyPrompt","Reply prompt"],["category","Category"],["tone","Tone"],["ageRange","Age range"]
  ].map(([k,label])=><label key={k}>{label}<input value={(draft as any)[k] ?? ""} onChange={e=>set(k as keyof TinyLesson,e.target.value)}/></label>)}
  <label>Tags (comma)<input value={draft.tags?.join(",") ?? ""} onChange={e=>setDraft(d=>({...d,tags:e.target.value.split(",").map(x=>x.trim()).filter(Boolean)}))}/></label>
  <label>Moments (comma)<input value={draft.moments?.join(",") ?? ""} onChange={e=>setDraft(d=>({...d,moments:e.target.value.split(",").map(x=>x.trim()).filter(Boolean)}))}/></label>
  <label>Attribution Type<select value={draft.attributionType} onChange={e=>set("attributionType",e.target.value)}>{attributionTypes.map(a=><option key={a}>{a}</option>)}</select></label>
  <label>Lesson Type<select value={draft.lessonType} onChange={e=>set("lessonType",e.target.value)}>{lessonTypes.map(t=><option key={t}>{t}</option>)}</select></label>
  <label><input type="checkbox" checked={Boolean(draft.isFavorite)} onChange={e=>set("isFavorite",e.target.checked)}/> Favorite</label>
  <button onClick={()=>onSave(draft)}>Save Lesson</button></div></section>;
}
