// /home/ubuntu/components/analyzer/SensorInfoPlaceholder.js
import React from "react";

const SensorInfoPlaceholder = () => {
  return (
    <div className="p-4 bg-orange-50 border border-orange-300 rounded-lg shadow-sm">
      <h5 className="text-md font-semibold text-orange-800 mb-2">Important Note on Light & Noise Measurement:</h5>
      <p className="text-sm text-gray-700 mb-2">
        Directly measuring precise light (lux) and noise (dB) levels using a web browser has significant limitations due to security and privacy restrictions. Web applications cannot typically access your phone&apos;s camera or microphone in the same way a native mobile app can for these specific measurements.
      </p>
      <p className="text-sm text-gray-700 mb-1">
        <strong>What this means for this tool:</strong>
      </p>
      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 pl-4 mb-2">
        <li>We will guide you through a checklist to assess these factors subjectively.</li>
        <li>We provide general recommendations based on your input.</li>
        <li>For precise measurements, consider using dedicated light meter or sound level meter apps available on your phone&apos;s app store.</li>
      </ul>
      <p className="text-sm text-gray-700">
        Our goal is to help you create an optimal sleep environment based on best practices, even with these web-based constraints.
      </p>
    </div>
  );
};

export default SensorInfoPlaceholder;

