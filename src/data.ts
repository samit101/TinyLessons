export type TinyLesson = {
  id: string; title: string; aphorism: string; attribution: string;
  attributionType: "philosopher" | "writer" | "religious" | "scientist" | "family" | "darien" | "original" | "unknown";
  plainEnglish: string; whyItMatters: string; tinyAction: string; replyPrompt: string;
  category: string; tags: string[]; moments: string[]; ageRange?: string; tone?: string;
  lessonType?: "aphorism" | "distinction" | "socratic_question" | "practice" | "taste" | "world_observation" | "skill" | "family_principle" | "darienism";
  createdAt: string; updatedAt: string; isFavorite?: boolean; sentAt?: string;
};
export type FamilyCanonEntry = { id: string; title: string; body: string; kind: string };
export const categories = ["Mindsets", "Philosophic Posture", "Knowledge Bases", "Skillz", "Experiences"];
export const attributionTypes = ["philosopher", "writer", "religious", "scientist", "family", "darien", "original", "unknown"] as const;
export const lessonTypes = ["aphorism", "distinction", "socratic_question", "practice", "taste", "world_observation", "skill", "family_principle", "darienism"] as const;
export const momentsList = ["boredom","frustration","losing","winning","jealousy","anger","embarrassment","anxiety","rushing","procrastination","sloppy work","needing courage","needing rest","conflict with a friend","needing to apologize","noticing beauty","being in nature","traveling","preparing for school","before a hard task","after failure","after success","when life feels ordinary","when someone is annoying","when learning something hard","when using AI","when making something","when helping around the house","meals","sadness","curiosity","wonder"];
const now = new Date().toISOString();
const L = (x: Omit<TinyLesson, "id"|"createdAt"|"updatedAt">, i:number): TinyLesson => ({id:`seed-${i}`, createdAt:now, updatedAt:now, ...x});
export const seedLessons: TinyLesson[] = [
L({title:"Look Twice",aphorism:"Nothing is mundane; it is only our gaze that grows dull.",attribution:"Darien",attributionType:"darien",plainEnglish:"Boring things often become interesting when you look more carefully.",whyItMatters:"This helps you find richness almost anywhere.",tinyAction:"Pick one ordinary object and notice five details.",replyPrompt:"What did you notice?",category:"Mindsets",tags:["wonder","observation","attention"],moments:["boredom","when life feels ordinary"],lessonType:"darienism"},1),
L({title:"Losing Is Information",aphorism:"A loss is not just a verdict. It is data.",attribution:"Family principle",attributionType:"family",plainEnglish:"Losing shows what to practice.",whyItMatters:"Turns embarrassment into improvement.",tinyAction:"Name one thing to practice differently next time.",replyPrompt:"What is the data?",category:"Mindsets",tags:["growth","resilience"],moments:["losing","frustration","after failure"],lessonType:"family_principle"},2),
L({title:"Ask the Second Question",aphorism:"The first question opens the door. The second enters the room.",attribution:"Family principle",attributionType:"family",plainEnglish:"Follow-up questions deepen thinking.",whyItMatters:"Better questions make better learners.",tinyAction:"Ask why, then ask one more question.",replyPrompt:"What was your second question?",category:"Philosophic Posture",tags:["curiosity","Socratic method"],moments:["learning something hard","boredom"],lessonType:"socratic_question"},3),
L({title:"Say the Truer Thing",aphorism:"Precision is kindness to reality.",attribution:"Darien",attributionType:"darien",plainEnglish:"Say what is true, not dramatic.",whyItMatters:"Clear language improves thought and fairness.",tinyAction:"Replace always/never with more accurate words.",replyPrompt:"What word did you change?",category:"Mindsets",tags:["precision","language"],moments:["sloppy work","conflict with a friend","rushing"],lessonType:"distinction"},4),
L({title:"One Beautiful Surface",aphorism:"Order is a small gift you give to your future self.",attribution:"Family principle",attributionType:"family",plainEnglish:"Improve your world in small ways.",whyItMatters:"Small wins create momentum.",tinyAction:"Make one surface clean, orderly, and beautiful.",replyPrompt:"What surface did you improve?",category:"Skillz",tags:["home maintenance","beauty"],moments:["procrastination","sloppy work"],lessonType:"practice"},5),
...Array.from({length:10}).map((_,i)=>L({title:`Seed Lesson ${i+6}`,aphorism:"Experience is primary.",attribution:"Darien-inspired",attributionType:"original",plainEnglish:"Learn by touching reality.",whyItMatters:"Practical contact builds judgment.",tinyAction:"Do one small real-world task with care.",replyPrompt:"What changed after doing it?",category:i%2?"Skillz":"Mindsets",tags:["attention","making"],moments:["when making something","when helping around the house"],lessonType:"skill"},i+6))
];

export const seedCanon: FamilyCanonEntry[] = [
  { id: "c1", title: "Darien line", body: "Wonder is a discipline, not an accident.", kind: "darien aphorism" },
  { id: "c2", title: "Desai principle", body: "Repair before replace when possible.", kind: "family principle" }
];
