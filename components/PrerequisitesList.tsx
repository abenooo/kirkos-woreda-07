export default function PrerequisitesList({ prerequisites }: { prerequisites: string[] }) {
    return (
      <ul className="list-disc pl-5">
        {prerequisites.map((prerequisite, index) => (
          <li key={index}>{prerequisite}</li>
        ))}
      </ul>
    )
  }
  