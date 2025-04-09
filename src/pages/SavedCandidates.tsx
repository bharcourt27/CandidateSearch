import { useState, useEffect, type MouseEvent } from "react";
import { Candidate } from "../interfaces/Candidate.interface";


const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  


  useEffect(() => {
    const getCandidates = async () => {
      try {
        const candidatesData = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
        setCandidates(candidatesData);
      } catch (err) {
       setCandidates([]);
      }
    };

    getCandidates();
  }, []);
const onReject = (e: MouseEvent<HTMLButtonElement>) => {
  const id = e.currentTarget.value;
  const updatedCandidates = candidates.filter((candidate) => candidate.id != id);
  setCandidates(updatedCandidates);
  localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
}
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Saved Candidates</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Username</th>
            <th>Location</th>
            <th>Email</th>
            <th>Profile</th>
            <th>Company</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate.id}>
              <td>
                <a href={candidate.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                <img src={candidate.avatar_url} alt={candidate.login} className="w-24 h-24 rounded-full" style={{
                width: '70px',
                borderRadius: '10px',
                display: 'block',
                margin: '0 auto',
              }}/>
                 </a>
              </td>
              <td>{candidate.name || ""}</td>
              <td>{candidate.login}</td>
              <td>{candidate.location || ""}</td>
              <td>{candidate.email || ""}</td>
              <td>
                
                  {candidate.bio || ""}
              </td>
              <td>{candidate.company || ""}</td>
              <td><button value={candidate.id} onClick={onReject} className="bg-red-500 text-white px-4 py-2 rounded">-</button></td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default SavedCandidates;
