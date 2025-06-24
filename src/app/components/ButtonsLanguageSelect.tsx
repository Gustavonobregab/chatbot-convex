const projectTypes = [
  {
    code: "saas",
    label: "SaaS",
    prompt: "I want to build a SaaS product with your agency. How does the process work?",
  },
  {
    code: "app",
    label: "App",
    prompt: "I have an app idea. How can your agency help me develop it?",
  },
  {
    code: "website",
    label: "Website",
    prompt: "I need a professional website. What are the next steps with your agency?",
  },
  {
    code: "mvp",
    label: "MVP",
    prompt: "I'm looking to launch an MVP quickly. How does your agency approach that?",
  },
];

export default function ButtonsProjectSelect({
  onSelect,
}: {
  onSelect: (prompt: string) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center max-w-3xl gap-3">
      {projectTypes.map(({ code, label, prompt }) => (
        <button
          key={code}
          onClick={() => onSelect(prompt)}
          className="rounded-full border-zinc-200 border-1 text-black px-4 py-2 hover:bg-zinc-50 font-bold flex items-center gap-2"
        >
          {label}
        </button>
      ))}
    </div>
  );
}
