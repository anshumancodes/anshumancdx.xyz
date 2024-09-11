import React from 'react';
import { Star, GitFork, Eye } from 'lucide-react';

const RepoCard = ({ repo }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{repo.name}</h3>
        <p className="text-gray-600 mb-4">{repo.description || 'No description available'}</p>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: repo.language ? languageColors[repo.language] : '#ccc'}}></div>
            {repo.language || 'Unknown'}
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Star size={16} className="mr-1" />
              {repo.stargazers_count}
            </span>
            <span className="flex items-center">
              <GitFork size={16} className="mr-1" />
              {repo.forks_count}
            </span>
            <span className="flex items-center">
              <Eye size={16} className="mr-1" />
              {repo.watchers_count}
            </span>
          </div>
        </div>
        <a 
          href={repo.html_url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
        >
          View Repository
        </a>
      </div>
    </div>
  );
};

// Add more colors as needed
const languageColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  Python: '#3572A5',
  Java: '#b07219',
  // Add more language colors here
};

export default RepoCard;