import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { DarkModeContext } from "../../context/DarkModeContext";
import { 
  Sun, 
  Moon, 
  LayoutDashboard, 
  FileText, 
  PlusCircle, 
  Settings, 
  ChevronDown,
  LogOut
} from "lucide-react";

const Sidebar = () => {
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(true);
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const location = useLocation();

  const toggleAnalytics = () => {
    setIsAnalyticsOpen(!isAnalyticsOpen);
  };

  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="h-screen w-64 flex flex-col bg-zinc-950 text-zinc-400 border-r border-zinc-800 transition-all duration-300">
      {/* Header */}
      <div className="p-6 flex items-center justify-between border-b border-zinc-900">
        <div className="flex items-center gap-3 font-bold text-xl text-white">
          <div className="p-2 bg-blue-600 rounded-lg">
            <LayoutDashboard size={20} className="text-white" />
          </div>
          <span>CMS</span>
        </div>
        <button 
          onClick={toggleDarkMode} 
          className="p-2 rounded-lg hover:bg-zinc-900 text-zinc-500 hover:text-zinc-300 transition-colors"
          title="Toggle Theme"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        <div className="px-3 mb-3">
          <span className="text-xs font-bold text-zinc-600 uppercase tracking-wider">
            Content Management
          </span>
        </div>

        {/* Blogs Dropdown */}
        <div>
          <button
            onClick={toggleAnalytics}
            className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group ${
              isActive('/cms') 
                ? 'bg-zinc-900 text-white' 
                : 'hover:bg-zinc-900/50 hover:text-zinc-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <FileText size={18} className={isActive('/cms') ? 'text-blue-500' : 'text-zinc-500 group-hover:text-zinc-400'} />
              <span>Blogs</span>
            </div>
            <ChevronDown 
              size={16} 
              className={`text-zinc-600 transition-transform duration-200 ${isAnalyticsOpen ? 'rotate-180' : ''}`} 
            />
          </button>

          {/* Dropdown Items */}
          <div 
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isAnalyticsOpen ? 'max-h-40 opacity-100 mt-1' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="pl-4 space-y-1 border-l border-zinc-800 ml-5 my-1">
              <Link to="create">
                <div className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-r-lg transition-colors ${
                  location.pathname === '/cms/create'
                    ? 'text-blue-400 bg-blue-500/10 border-l-2 border-blue-500 -ml-[1px]'
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/30'
                }`}>
                  <PlusCircle size={16} />
                  <span>Create Post</span>
                </div>
              </Link>
              <Link to="manage">
                <div className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-r-lg transition-colors ${
                  location.pathname === '/cms/manage'
                    ? 'text-blue-400 bg-blue-500/10 border-l-2 border-blue-500 -ml-[1px]'
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/30'
                }`}>
                  <Settings size={16} />
                  <span>Manage Blogs</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Footer User Info */}
      <div className="p-4 border-t border-zinc-900 bg-zinc-950">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-900 transition-colors cursor-pointer group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-lg">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              Anshuman
            </p>
            <p className="text-xs text-zinc-500 truncate group-hover:text-zinc-400">
              admin@anshumancdx.xyz
            </p>
          </div>
          <LogOut size={16} className="text-zinc-600 group-hover:text-red-400 transition-colors" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
