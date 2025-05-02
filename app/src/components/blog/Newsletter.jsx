import { useState } from "react";

const Newsletter = ({ publicationId }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  // fallback from environment if not passed as prop , passed as prop in Home.jsx
  const finalPublicationId = publicationId || import.meta.env.VITE_PUBLICATION_ID;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    try {
      const response = await fetch("https://newsletter.anshumancdx.xyz/api/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "hn-trace-app": "blogs",
          "x-graphql-client-name": "blogs",
          "x-graphql-client-version": "client",
        },
        body: JSON.stringify({
          operationName: "SubscribeToNewsletter",
          query: `
            mutation SubscribeToNewsletter($input: SubscribeToNewsletterInput!) {
              subscribeToNewsletter(input: $input) {
                status
                __typename
              }
            }
          `,
          variables: {
            input: {
              email,
              publicationId: finalPublicationId,
            },
          },
        }),
      });

      const result = await response.json();

      if (result.data?.subscribeToNewsletter?.status === "PENDING") {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Error:", err);
      setStatus("error");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex flex-col gap-2 items-center w-full rounded-md py-2 px-2 shadow">
        <h3 className="text-lg font-semibold text-gray-200 mb-1">Newsletter</h3>
        <p className="text-sm text-gray-500 mb-2 text-center">
          Subscribe to get blog updates delivered directly to your inbox
        </p>
        <div className="flex w-full gap-2 flex-col sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 py-2 px-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-400 text-black"
            required
          />
          <button
            onClick={handleSubmit}
            disabled={status === "loading"}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition disabled:opacity-70"
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </button>
        </div>
        {status === "success" && (
          <p className="text-green-600 text-sm text-center w-full mt-2">
            Thanks for subscribing! Check your mail to confirm. You'll receive updates soon.
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600 text-sm text-center w-full mt-2">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </div>
  );
};

export default Newsletter;
