# One Tiny Lesson

A personal, warm family curriculum app for short actionable lessons.

## MVP features
- Dashboard with lesson-of-the-day and moment quick-launch.
- Lesson library cards with filters (category, tag, moment, source, lesson type, favorites).
- Lesson detail view with Favorite, Edit, Mark as sent, and **Copy Text Version** actions.
- Create/Edit lesson form for all Tiny Lesson fields.
- Family Canon section with seed entries.
- Seed data includes 15+ lessons and moments taxonomy.
- Architecture includes `TinyLesson` model and room for future send tracking.

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Notes for extension
- Add persistence via SQLite/Supabase by replacing in-memory state in `App.tsx`.
- Add `Recipient` and `LessonSend` tables for Twilio/email/manual channels.
- Add scheduled sends and AI-assisted “situation -> lesson” generation later.
