import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

const FeedbackForm = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Card className="shadow-soft">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <MessageSquare className="w-6 h-6 text-brand-600" />
              Give Feedback
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-12">
            <div className="bg-brand-50 p-8 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Feedback Form Coming Soon
              </h3>
              <p className="text-gray-600">
                This feature will allow managers to submit structured feedback
                for their team members.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FeedbackForm;
