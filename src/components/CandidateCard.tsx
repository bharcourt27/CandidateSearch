import React from 'react';
import {Candidate} from '../interfaces/Candidate.interface';

interface CandidateCardProps {
  candidate: Candidate; 
  onAccept: () => void;
  onReject: () => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, onAccept, onReject }) => {
console.log(candidate);



  return (
    
    <div className="border p-4 rounded-lg shadow-lg text-center">
      <img src={candidate?.avatar_url} alt={candidate?.name} className="w-24 h-24 rounded-full mx-auto" />
      <h2 className="text-xl font-bold">{candidate?.name || "anonoymous"}</h2>
      <p className="text-gray-600">@{candidate.login}</p>
      <p>{candidate?.location || "No location provided"}</p>
      <p>{candidate?.email || "No email provided"}</p>
      <a href={candidate.html_url } rel="noopener noreferrer" className="text-blue-500">
        Profile
      </a>
      <p>{candidate?.company || "No company provided"}</p>
      <div className="mt-4 flex justify-center space-x-4">
        <button onClick={onAccept} className="bg-green-500 text-white px-4 py-2 rounded">+</button>
        <button onClick={onReject} className="bg-red-500 text-white px-4 py-2 rounded">-</button>
      </div>
    </div>
  );
};

export default CandidateCard;