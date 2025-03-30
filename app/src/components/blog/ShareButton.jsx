import { useState, useEffect } from "react";
import { Copy,Twitter } from "lucide-react";



const ShareButton = ({ url }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch (err) {
      console.error("Failed to copy URL", err);
      alert("Failed to copy the URL. Please try again.");
    }
  };

  const shareToTwitter = () => {
    const tweetText = encodeURIComponent("Check out this amazing blog post!");
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${tweetText}`;
    window.open(twitterUrl, '_blank');
  };

  return (
    <div className="flex gap-4 items-center">
      <div 
        onClick={copyToClipboard}
        className="cursor-pointer flex items-center"
        aria-label="Share link"
      >
        <Copy size={18} />
        <span className="ml-1 text-sm">{copied ? "Copied!" : ""}</span>
      </div>
      
      <div 
        onClick={shareToTwitter} 
        className="cursor-pointer"
        aria-label="Share on Twitter"
      >
        <Twitter size={18} />
      </div>
    </div>
  );
};

export default ShareButton;
