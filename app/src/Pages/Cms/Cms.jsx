import React, { lazy, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../../components/cms/Sidebar';
import ManageBlogs from '../../components/blog/ManageBlogs';
import BlogEditor from '../../components/blog/BlogEditor';

const Cms = () => {
  const [manage, setManage] = useState(false);
  const location = useLocation();

  // Set manage to true when the path is '/cms/manage'
  useEffect(() => {
    if (location.pathname === '/cms/manage') {
      setManage(true);
    } else {
      setManage(false);
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-row gap-10">
      <div className="left-0">
        <Sidebar />
      </div>
      <div className="flex-1">
        {manage ? <ManageBlogs /> : <BlogEditor />}
      </div>
    </div>
  );
};

export default Cms;

