export const INTERESTS = [
  "Technology",
  "Design",
  "Data",
  "Business",
  "Storytelling",
  "Social impact",
];
export const QUESTIONS = [
  {
    title: "A new student club needs your help. Where do you jump in?",
    options: [
      {
        text: "Build a useful website or tool",
        interests: ["Technology", "Data"],
      },
      {
        text: "Create its identity and tell its story",
        interests: ["Design", "Storytelling"],
      },
      { text: "Organize the team and make a plan", interests: ["Business"] },
      {
        text: "Understand who needs help and why",
        interests: ["Social impact", "Design"],
      },
    ],
  },
  {
    title: "Which kind of small win feels most rewarding?",
    options: [
      {
        text: "Making something work after a tricky problem",
        interests: ["Technology"],
      },
      {
        text: "Turning a messy idea into something clear",
        interests: ["Design", "Storytelling"],
      },
      {
        text: "Finding a pattern that changes a decision",
        interests: ["Data", "Business"],
      },
      {
        text: "Helping someone take their next step",
        interests: ["Social impact"],
      },
    ],
  },
  {
    title: "You have a free afternoon. What would you try?",
    options: [
      {
        text: "Experiment with code or explore a dataset",
        interests: ["Technology", "Data"],
      },
      {
        text: "Sketch an app or write a short story",
        interests: ["Design", "Storytelling"],
      },
      {
        text: "Plan a small event or test a business idea",
        interests: ["Business"],
      },
      {
        text: "Volunteer for a cause I care about",
        interests: ["Social impact"],
      },
    ],
  },
];
export const CAREERS = [
  {
    id: "frontend",
    title: "Frontend developer",
    category: "Technology",
    icon: "code",
    color: "green",
    tagline: "Turn ideas into things people can use.",
    description:
      "Build the websites and interfaces people interact with. Blend logic, creativity, and attention to detail to make digital experiences accessible and useful.",
    day: "Translate a design into a page, solve a layout problem, test on a phone, and collaborate with designers and other developers.",
    skills: ["HTML & CSS", "JavaScript", "Problem solving", "Accessibility"],
    resource: {
      title: "MDN · Learn web development",
      url: "https://developer.mozilla.org/en-US/docs/Learn_web_development",
    },
    steps: [
      {
        title: "Get to know the web",
        task: "Read about HTML and CSS. Inspect a favorite website and write down three things you would like to build.",
        time: "30 min",
      },
      {
        title: "Build your first page",
        task: "Create a simple personal introduction with a heading, a paragraph, and a link. Style it for both a phone and a laptop.",
        time: "1–2 hours",
      },
      {
        title: "Make it interactive",
        task: "Add a button with JavaScript, test it with a friend, and record one thing you improved after their feedback.",
        time: "1–2 hours",
      },
    ],
  },
  {
    id: "design",
    title: "Product designer",
    category: "Design",
    icon: "pen",
    color: "pink",
    tagline: "Make everyday experiences feel better.",
    description:
      "Understand people’s needs and shape useful digital products. Explore visual design, research, and prototyping to make complicated things feel simple.",
    day: "Talk with a user, sketch possible solutions, create a prototype, and use feedback to improve the experience.",
    skills: ["User research", "Visual thinking", "Prototyping", "Empathy"],
    resource: {
      title: "Figma · Design basics",
      url: "https://www.figma.com/resource-library/design-basics/",
    },
    steps: [
      {
        title: "Notice a real problem",
        task: "Ask two classmates about an app they find frustrating. Write down the problem without jumping to a solution.",
        time: "30 min",
      },
      {
        title: "Sketch a better experience",
        task: "Draw three screens that could solve the problem. Focus on clear labels and what the user needs to do next.",
        time: "45 min",
      },
      {
        title: "Test your idea",
        task: "Make a paper or Figma prototype. Ask someone to try it without instructions, then improve one confusing part.",
        time: "1–2 hours",
      },
    ],
  },
  {
    id: "data",
    title: "Data analyst",
    category: "Data",
    icon: "chart",
    color: "blue",
    tagline: "Find the story hiding in the numbers.",
    description:
      "Turn information into useful insights. Ask good questions, organize data, spot patterns, and explain what those patterns might mean.",
    day: "Clean a spreadsheet, explore a question with data, create a clear chart, and explain your findings to a team.",
    skills: ["Spreadsheets", "Critical thinking", "SQL", "Data visualization"],
    resource: {
      title: "Kaggle · Learning courses",
      url: "https://www.kaggle.com/learn",
    },
    steps: [
      {
        title: "Start with a question",
        task: "Choose a question about your study habits. Track study time and one other useful measure for a few days.",
        time: "20 min + tracking",
      },
      {
        title: "Explore your data",
        task: "Organize the observations in a spreadsheet. Calculate an average, check missing values, and make a simple chart.",
        time: "45 min",
      },
      {
        title: "Explain an insight",
        task: "Write three observations, one limitation of your data, and one change you would try next. Share the chart with a friend.",
        time: "30 min",
      },
    ],
  },
  {
    id: "product",
    title: "Product manager",
    category: "Business",
    icon: "compass",
    color: "peach",
    tagline: "Bring people and good ideas together.",
    description:
      "Help a team decide what to build and why. Connect user needs with practical goals, prioritize problems, and keep everyone moving in the same direction.",
    day: "Listen to users, compare possible priorities, clarify a goal, and work with designers and developers on a useful next release.",
    skills: [
      "Communication",
      "Prioritization",
      "User understanding",
      "Planning",
    ],
    resource: {
      title: "Atlassian · Product management",
      url: "https://www.atlassian.com/agile/product-management",
    },
    steps: [
      {
        title: "Understand a user need",
        task: "Pick a student problem and speak with two people who experience it. Summarize who it affects and why it matters.",
        time: "45 min",
      },
      {
        title: "Choose a small solution",
        task: "List three ideas. Compare their effort and usefulness, then choose one you could test in a week.",
        time: "30 min",
      },
      {
        title: "Write a one-page plan",
        task: "Describe the problem, proposed solution, first three tasks, and how you would tell whether the idea helped.",
        time: "45 min",
      },
    ],
  },
  {
    id: "content",
    title: "Content strategist",
    category: "Storytelling",
    icon: "message",
    color: "yellow",
    tagline: "Give good ideas a voice that connects.",
    description:
      "Help people discover and understand ideas through thoughtful content. Combine writing, audience research, and planning to communicate with purpose.",
    day: "Research an audience, plan a useful story, edit a draft, and review feedback to make the next piece clearer.",
    skills: ["Writing", "Audience research", "Editing", "Content planning"],
    resource: {
      title: "HubSpot Academy · Content marketing",
      url: "https://academy.hubspot.com/courses/content-marketing",
    },
    steps: [
      {
        title: "Find your audience",
        task: "Choose a student topic you care about. Ask three classmates what they wish they understood about it.",
        time: "30 min",
      },
      {
        title: "Tell one useful story",
        task: "Write a 300-word guide that answers one of their questions. Use a clear headline and a concrete example.",
        time: "45 min",
      },
      {
        title: "Edit with feedback",
        task: "Ask a reader what was helpful and what was unclear. Revise the piece and outline two follow-up topics.",
        time: "30 min",
      },
    ],
  },
  {
    id: "impact",
    title: "Social impact coordinator",
    category: "Social impact",
    icon: "sprout",
    color: "mint",
    tagline: "Turn your care for the world into action.",
    description:
      "Support projects that help communities. Listen to people, organize small initiatives, and reflect on whether those initiatives make a useful difference.",
    day: "Speak with community members, coordinate volunteers, plan an activity, and document what the team learned.",
    skills: [
      "Empathy",
      "Community research",
      "Coordination",
      "Impact measurement",
    ],
    resource: {
      title: "United Nations · Sustainable Development Goals",
      url: "https://sdgs.un.org/goals",
    },
    steps: [
      {
        title: "Choose a cause",
        task: "Explore the Sustainable Development Goals and choose one that matters to you. Identify a related issue in your campus or community.",
        time: "30 min",
      },
      {
        title: "Listen before planning",
        task: "Speak with someone affected by the issue or an organization working on it. Ask what kind of help would actually be useful.",
        time: "45 min",
      },
      {
        title: "Plan a small contribution",
        task: "Outline one manageable action, the people and permissions needed, and how you will gather feedback afterward.",
        time: "45 min",
      },
    ],
  },
];
export const ACTIVITIES = [
  {
    id: "curiosity",
    title: "Follow your curiosity",
    category: "Self discovery",
    time: "10 min",
    color: "pink",
    prompt:
      "Write down three things you enjoy doing, even when nobody asks you to. What do they have in common?",
  },
  {
    id: "conversation",
    title: "Have a career conversation",
    category: "Explore the real world",
    time: "20 min",
    color: "green",
    prompt:
      "Talk to a teacher, senior, or professional about their work. What surprised you? What would you like to try yourself?",
  },
  {
    id: "experiment",
    title: "Try a tiny experiment",
    category: "Learn by doing",
    time: "30 min",
    color: "blue",
    prompt:
      "Try one small task from a career that interests you. What did you do, what felt enjoyable, and what felt challenging?",
  },
  {
    id: "next-step",
    title: "Make space for your next step",
    category: "Build a habit",
    time: "10 min",
    color: "peach",
    prompt:
      "Choose one learning goal for this week. When will you work on it, and what is the smallest useful outcome you can aim for?",
  },
];
// Interest signals are starting points for exploration, not aptitude scores.
export function rankCareers(profile) {
  const signals = [...profile.interests];
  profile.answers.forEach((answer, index) =>
    signals.push(...(QUESTIONS[index]?.options[answer]?.interests || [])),
  );
  return CAREERS.map((career) => ({
    ...career,
    score: signals.filter((signal) => signal === career.category).length,
  })).sort((a, b) => b.score - a.score);
}
