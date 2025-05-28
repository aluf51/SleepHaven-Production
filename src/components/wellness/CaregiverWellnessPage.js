// /home/ubuntu/components/wellness/CaregiverWellnessPage.js
import React from "react";

import MicroMeditationsPlayer from "./MicroMeditationsPlayer";
import TagTeamPlanner from "./TagTeamPlanner";
import SelfCareReminders from "./SelfCareReminders";
import ParentAchievements from "./ParentAchievements";

const CaregiverWellnessPage = () => {
  // In a real app, user context might be used to pass user-specific data to these components
  // For now, they are self-contained with mock data or local storage

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Caregiver Wellness Hub</h2>
      <p className="text-center text-gray-600 mb-10">
        Tools and resources to support your well-being on this parenting journey. Remember, taking care of yourself helps you take better care of your little one.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Column 1 */}
        <div className="space-y-6">
          <MicroMeditationsPlayer />
          <SelfCareReminders />
        </div>

        {/* Column 2 */}
        <div className="space-y-6">
          <TagTeamPlanner />
          <ParentAchievements />
        </div>
      </div>
      
      <div className="mt-12 p-6 bg-gray-100 rounded-lg text-center">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">You&apos;re Doing Great!</h3>
        <p className="text-gray-600">
          Parenting is a marathon, not a sprint. Be kind to yourself, celebrate the small wins, and don&apos;t hesitate to lean on your support system.
        </p>
      </div>
    </div>
  );
};

export default CaregiverWellnessPage;

