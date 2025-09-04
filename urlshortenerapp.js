import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function App() {
  const [url, setUrl] = useState("");
  const [shortLinks, setShortLinks] = useState([]);
  const [log, setLog] = useState([]);

  // Log events
  const addLog = (msg) => {
    setLog((prev) => [...prev, ${new Date().toLocaleTimeString()} - ${msg}]);
  };

  const shortenUrl = async () => {
    if (!url) return;
    try {
      const res = await fetch(https://api.shrtco.de/v2/shorten?url=${url});
      const data = await res.json();
      if (data.ok) {
        const newLink = {
          original: url,
          short: data.result.full_short_link,
          clicks: 0,
        };
        setShortLinks([...shortLinks, newLink]);
        addLog(Shortened URL: ${url});
        setUrl("");
      } else {
        addLog(Error: ${data.error});
      }
    } catch (error) {
      addLog("Failed to shorten URL");
    }
  };
 return (
    <div className="p-6 grid grid-cols-2 gap-6">
      {/* URL Shortener Section */}
      <Card className="shadow-lg">
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-4">URL Shortener</h2>
          <div className="flex gap-2">
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter a URL"
            />
            <Button onClick={shortenUrl}>Shorten</Button>
          </div>
          <div className="mt-4 space-y-3">
            {shortLinks.map((link, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-100 p-2 rounded"
              >
                <div>
                  <p className="text-sm">Original: {link.original}</p>
                  <p className="font-medium text-blue-600">{link.short}</p>
                  <p className="text-xs text-gray-500">
                    Copied {link.clicks} times
 <p className="text-sm">Original: {link.original}</p>
                  <p className="font-medium text-blue-600">{link.short}</p>
                  <p className="text-xs text-gray-500">
                    Copied {link.clicks} times
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => copyToClipboard(link.short, index)}
                >
                  Copy
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Logging Section */}
      <Card className="shadow-lg">
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-4">App Logs</h2>
          <div className="bg-black text-green-400 p-2 rounded h-80 overflow-y-auto text-sm font-mono">
            {log.map((l, i) => (
              <div key={i}>{l}</div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}