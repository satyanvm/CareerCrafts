# CareerCrafts

CareerCrafts is a student career-guidance MVP: discover your interests, explore possible careers, and take small practical steps toward a direction that feels like you.

The frontend follows a pale-green grid, navy editorial typography, coral calls to action, and colorful geometric cards. It works on mobile and desktop without external fonts or image services.

## MVP features

- A short introduction and three situational questions, with editable interests and validation.
- Six exploratory career paths across technology, design, data, business, storytelling, and social impact.
- Search and category filters, career details, and suggestions ranked using transparent interest signals.
- A chosen career with three practical roadmap steps; complete or undo each step. Switching careers preserves progress for each path.
- Four reflection activities with saved, editable notes.
- Profile editing, a downloadable Markdown plan, and a confirmed fresh-start action.
- Browser back/forward navigation, keyboard navigation, focus indicators, native accessible dialogs, and reduced-motion support.

Suggestions are starting points for exploration. They are not aptitude tests, AI predictions, or guarantees of employment. Students begin with a blank profile and no fabricated progress.

## Run locally

Use Node.js 20.19+ or 22.12+ (a supported LTS release is recommended).

```sh
npm ci
npm run dev
```

Open [CareerCrafts locally](http://localhost:3000).

```sh
npm test
npm run build
npm run preview
```

The production output is in `dist/` and can be served by any static host. Hash-based navigation needs no server rewrite rules.

## Scope and storage

This is a frontend MVP built with React, Vite, plain CSS, and Lucide icons. No backend, login, paid services, live job listings, or AI service is required.

Progress is saved under `careercrafts.progress.v1` in local storage. It belongs to the current browser profile and does not sync across devices. If storage is unavailable, the app displays a notice and keeps the current session usable. The downloadable plan includes the current career roadmap and saved reflections. Clearing progress requires confirmation.

The previous prototype’s prefilled demo profiles are not imported. CareerCrafts starts a new student journey. Learning resources open third-party sites; those providers may require an account.

## Manual review checklist

1. Open a fresh browser profile. Start the assessment; verify blank-name, missing-interest, and unanswered-question validation.
2. Finish with different interests and answers. Verify the suggested order changes and all careers remain available.
3. Search and filter careers, including a search with no results. Open career details, dismiss with Escape, then choose a direction.
4. Complete and undo roadmap steps, change careers, return to the original path, and reload. Confirm progress stays correct.
5. Save and edit a reflection. Download the plan and verify it contains the selected career, step completion, and reflection.
6. Edit the profile; check navigation with browser back/forward and the mobile menu.
7. Check the fresh-start confirmation’s cancel and clear actions, and verify the blank state after reload.
8. Review mobile and desktop layouts, keyboard access, resource links, and the data/privacy explanation.

## Project team

Developed by Computer Science and Engineering students under the guidance of **Dr. Dilip Kumar Choubey**.

| Student             | Roll number | Contribution                        |
| ------------------- | ----------- | ----------------------------------- |
| Aftab Hussain       | 240101019   | Team lead and frontend architecture |
| Mahadev Keshari     | 240101066   | UI/UX and components                |
| Raghav Agarwal      | 240101014   | Progression logic                   |
| Animesh Jain        | 240101254   | Career roadmaps and skills          |
| Ajeet Singh         | 240101214   | Testing and integration             |
| Satya Narayan Verma | 240101139   | Student research and scenarios      |
