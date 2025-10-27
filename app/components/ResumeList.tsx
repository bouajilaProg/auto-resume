import ResumeItem from "./ResumeItem";

function ResumeList() {
  const resumes = [
    {
      name: "Software Engineer Resume",
      description: "Technical resume for software development positions",
      lastUpdate: "Oct 25, 2025"
    },
    {
      name: "Marketing Manager Resume",
      description: "Professional resume for marketing roles",
      lastUpdate: "Oct 20, 2025"
    },
    {
      name: "Product Designer Resume",
      description: "Creative resume showcasing design projects",
      lastUpdate: "Oct 18, 2025"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resumes.map((resume, index) => (
        <ResumeItem
          key={index}
          name={resume.name}
          description={resume.description}
          lastUpdate={resume.lastUpdate}
        />
      ))}
    </div>
  );
}

export default ResumeList;
