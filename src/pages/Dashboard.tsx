import { useState, useMemo } from "react";
import { getCurrentUser, isManager } from "@/lib/auth";
import { mockFeedbacks, mockUsers } from "@/lib/mockData";
import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  Target,
  ThumbsUp,
  User,
} from "lucide-react";
import { format } from "date-fns";
import type { Feedback, FeedbackSentiment } from "@/lib/types";

// Utility functions for sentiment styling
const getSentimentColor = (sentiment: FeedbackSentiment) => {
  switch (sentiment) {
    case "positive":
      return "bg-success-100 text-success-800 border-success-200";
    case "neutral":
      return "bg-warning-100 text-warning-800 border-warning-200";
    case "negative":
      return "bg-danger-100 text-danger-800 border-danger-200";
  }
};

const getSentimentIcon = (sentiment: FeedbackSentiment) => {
  switch (sentiment) {
    case "positive":
      return "😊";
    case "neutral":
      return "😐";
    case "negative":
      return "😟";
  }
};

const Dashboard = () => {
  const user = getCurrentUser();
  const [showCreateFeedback, setShowCreateFeedback] = useState(false);

  if (!user) {
    return <div>Please log in</div>;
  }

  if (isManager(user)) {
    return <ManagerDashboard user={user} />;
  } else {
    return <EmployeeDashboard user={user} />;
  }
};

const ManagerDashboard = ({ user }: { user: any }) => {
  const teamMembers = mockUsers.filter((u) => user.teamMembers?.includes(u.id));
  const teamFeedbacks = mockFeedbacks.filter((f) => f.managerId === user.id);

  const stats = {
    totalTeamMembers: teamMembers.length,
    totalFeedbacks: teamFeedbacks.length,
    pendingAcknowledgments: teamFeedbacks.filter((f) => !f.acknowledged).length,
    recentFeedbacks: teamFeedbacks.filter(
      (f) =>
        new Date().getTime() - f.createdAt.getTime() < 7 * 24 * 60 * 60 * 1000,
    ).length,
  };

  const sentimentBreakdown = teamFeedbacks.reduce(
    (acc, feedback) => {
      acc[feedback.sentiment]++;
      return acc;
    },
    { positive: 0, neutral: 0, negative: 0 },
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation onCreateFeedback={() => {}} />

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.name.split(" ")[0]}
          </h1>
          <p className="text-gray-600 mt-2">
            Here's an overview of your team's feedback activity
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Team Members
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.totalTeamMembers}
                  </p>
                </div>
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-brand-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Feedback
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.totalFeedbacks}
                  </p>
                </div>
                <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-success-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Pending Reviews
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.pendingAcknowledgments}
                  </p>
                </div>
                <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-warning-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Week</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.recentFeedbacks}
                  </p>
                </div>
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-brand-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Team Overview */}
          <div className="lg:col-span-2">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Team Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {teamMembers.map((member) => {
                  const memberFeedbacks = teamFeedbacks.filter(
                    (f) => f.employeeId === member.id,
                  );
                  const lastFeedback = memberFeedbacks.sort(
                    (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
                  )[0];

                  return (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="bg-brand-100 text-brand-800">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {member.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {memberFeedbacks.length} feedback(s)
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {lastFeedback && (
                          <Badge
                            variant="outline"
                            className={getSentimentColor(
                              lastFeedback.sentiment,
                            )}
                          >
                            {getSentimentIcon(lastFeedback.sentiment)}{" "}
                            {lastFeedback.sentiment}
                          </Badge>
                        )}
                        <Button variant="outline" size="sm">
                          Give Feedback
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Sentiment Breakdown */}
          <div>
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Sentiment Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-success-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Positive</span>
                    </div>
                    <span className="text-sm font-medium">
                      {sentimentBreakdown.positive}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-warning-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Neutral</span>
                    </div>
                    <span className="text-sm font-medium">
                      {sentimentBreakdown.neutral}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-danger-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Negative</span>
                    </div>
                    <span className="text-sm font-medium">
                      {sentimentBreakdown.negative}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(
                      (sentimentBreakdown.positive /
                        Math.max(stats.totalFeedbacks, 1)) *
                        100,
                    )}
                    %
                  </p>
                  <p className="text-sm text-gray-600">Positive feedback</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

const EmployeeDashboard = ({ user }: { user: any }) => {
  const userFeedbacks = mockFeedbacks
    .filter((f) => f.employeeId === user.id)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const stats = {
    totalReceived: userFeedbacks.length,
    unacknowledged: userFeedbacks.filter((f) => !f.acknowledged).length,
    thisMonth: userFeedbacks.filter(
      (f) =>
        new Date().getMonth() === f.createdAt.getMonth() &&
        new Date().getFullYear() === f.createdAt.getFullYear(),
    ).length,
  };

  const sentimentBreakdown = userFeedbacks.reduce(
    (acc, feedback) => {
      acc[feedback.sentiment]++;
      return acc;
    },
    { positive: 0, neutral: 0, negative: 0 },
  );

  const manager = mockUsers.find((u) => u.id === user.managerId);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.name.split(" ")[0]}
          </h1>
          <p className="text-gray-600 mt-2">
            Here's your feedback timeline and insights
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Feedback
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.totalReceived}
                  </p>
                </div>
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-brand-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Need Review
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.unacknowledged}
                  </p>
                </div>
                <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-warning-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    This Month
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.thisMonth}
                  </p>
                </div>
                <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-success-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Feedback Timeline */}
          <div className="lg:col-span-2">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Feedback Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {userFeedbacks.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No feedback received yet</p>
                  </div>
                ) : (
                  userFeedbacks.map((feedback) => (
                    <div
                      key={feedback.id}
                      className={`p-6 rounded-lg border-2 ${
                        feedback.acknowledged
                          ? "bg-gray-50 border-gray-200"
                          : "bg-blue-50 border-brand-200"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          {manager && (
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={manager.avatar}
                                alt={manager.name}
                              />
                              <AvatarFallback className="bg-brand-100 text-brand-800">
                                {manager.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div>
                            <p className="font-medium text-gray-900">
                              {manager?.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {format(feedback.createdAt, "MMM d, yyyy")}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant="outline"
                            className={getSentimentColor(feedback.sentiment)}
                          >
                            {getSentimentIcon(feedback.sentiment)}{" "}
                            {feedback.sentiment}
                          </Badge>
                          {feedback.acknowledged ? (
                            <Badge
                              variant="outline"
                              className="bg-success-50 text-success-700 border-success-200"
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Acknowledged
                            </Badge>
                          ) : (
                            <Button variant="outline" size="sm">
                              Acknowledge
                            </Button>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                            <ThumbsUp className="w-4 h-4 text-success-600" />
                            Strengths
                          </h4>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {feedback.strengths}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                            <Target className="w-4 h-4 text-brand-600" />
                            Areas for Improvement
                          </h4>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {feedback.improvements}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Manager Info */}
            {manager && (
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Your Manager
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={manager.avatar} alt={manager.name} />
                      <AvatarFallback className="bg-brand-100 text-brand-800">
                        {manager.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {manager.name}
                      </h3>
                      <p className="text-sm text-gray-500">{manager.email}</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    Request Feedback
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Sentiment Overview */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-success-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Positive</span>
                    </div>
                    <span className="text-sm font-medium">
                      {sentimentBreakdown.positive}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-warning-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Neutral</span>
                    </div>
                    <span className="text-sm font-medium">
                      {sentimentBreakdown.neutral}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-danger-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Needs Focus</span>
                    </div>
                    <span className="text-sm font-medium">
                      {sentimentBreakdown.negative}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(
                      (sentimentBreakdown.positive /
                        Math.max(stats.totalReceived, 1)) *
                        100,
                    )}
                    %
                  </p>
                  <p className="text-sm text-gray-600">Positive feedback</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
