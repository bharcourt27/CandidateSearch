import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';
import CandidateCard from '../components/CandidateCard';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<string[]>([]);
  const [currentIndex, setIndex] = useState<number>(0);
  const [currentCandidate, setCandidate] = useState<Candidate>({} as Candidate);
  
  const fetchCandidate = async(username:string) => {
    const data = await searchGithubUser(username);
    console.log(data)
    setCandidate({
      id: data.id,
      name: data.name,
      login: data.login,
      location: data.location,
      avatar_url: data.avatar_url,
      email: data.email,
      html_url: data.html_url,
      company: data.company,
      bio: data.bio,
    })
  }
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await searchGithub();
      const cleanedData = data.map((candidate: any) => candidate.login)
      setCandidates(cleanedData);
      await fetchCandidate(cleanedData[currentIndex]);
      // setResults(data);
    };

    fetchData();
  }, []);

  const onAccept = () => {
    setIndex((prevIndex) => (prevIndex + 1) % candidates.length);
    fetchCandidate(candidates[(currentIndex + 1) % candidates.length]);
    const savedCandidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
    const updatedCandidates = [...savedCandidates, currentCandidate];

localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  }

  const onReject=() => {
    setIndex((prevIndex) => (prevIndex + 1) % candidates.length);
    fetchCandidate(candidates[(currentIndex + 1) % candidates.length]);
  } 

  return (
    <div>
      <h1>CandidateSearch</h1>
    <CandidateCard 
      candidate={currentCandidate} 
      onAccept={onAccept}

      onReject={onReject}
    />
    </div>
  );
};

export default CandidateSearch;
