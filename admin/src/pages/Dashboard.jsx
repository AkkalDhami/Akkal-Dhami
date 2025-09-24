// Dashboard.jsx
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import {
  MessageSquare,
  FolderOpen,
  Settings,
  User,
  TrendingUp,
  Eye,
  Mail,
  Calendar,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
} from "lucide-react";
import { useGetProjectsQuery } from "../features/project/projectApi";
import {
  useGetSkillsQuery,
  useGetStatsQuery,
} from "../features/skill/skillApi";
import { useGetAllMessagesQuery } from "../features/messages/messageApi";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalVisitors: 0,
    profileCompleteness: 65,
  });

  const navigate = useNavigate();

  const { data: projects } = useGetProjectsQuery();

  const { data: skills } = useGetSkillsQuery();
  console.log(projects?.projects);
  const { data: messages } = useGetAllMessagesQuery();

  const { data: statsData, error } = useGetStatsQuery();

  const unreadMessages = messages?.messages?.filter((m) => !m.read);

  // Sample data for charts
  const visitorData = [
    { month: "Jan", visitors: 1200 },
    { month: "Feb", visitors: 1900 },
    { month: "Mar", visitors: 1500 },
    { month: "Apr", visitors: 2200 },
    { month: "May", visitors: 1800 },
    { month: "Jun", visitors: 2500 },
  ];

  const skillData = statsData?.data?.distribution;

  const projectStatusData = [
    { status: "Completed", count: 8 },
    { status: "In Progress", count: 3 },
    { status: "Planning", count: 2 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  useEffect(() => {
    // Simulate API call to fetch dashboard stats
    const fetchStats = async () => {
      // In real implementation, you would fetch from your API
      setTimeout(() => {
        setStats({
          totalVisitors: 12500,
          profileCompleteness: 65,
        });
      }, 1000);
    };

    fetchStats();
  }, []);

  const StatCard = ({ title, value, icon: Icon, trend, subtitle }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-xs text-muted-foreground">
          {trend > 0 ? (
            <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
          ) : (
            <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
          )}
          {subtitle}
        </div>
      </CardContent>
    </Card>
  );

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="space-y-6 p-4 sm:p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your portfolio.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button size="sm">
            <User className="h-4 w-4 mr-2" />
            View Portfolio
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Projects"
          value={projects?.projects?.length || 0}
          icon={FolderOpen}
          trend={2}
          subtitle="+2 from last month"
        />
        <StatCard
          title="Skills"
          valuedata={skills?.skills?.length || 0}
          icon={TrendingUp}
          trend={1}
          subtitle="+1 new skill"
        />
        <StatCard
          title="Unread Messages"
          value={unreadMessages?.length}
          icon={MessageSquare}
          trend={-1}
          subtitle="-1 from yesterday"
        />
        <StatCard
          title="Total Visitors"
          value={stats.totalVisitors.toLocaleString()}
          icon={Eye}
          trend={15}
          subtitle="+15% from last month"
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Visitors Chart */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Website Visitors</CardTitle>
            <CardDescription>
              Monthly visitor statistics for your portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={visitorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="visitors"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Skills Distribution */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Skills Distribution</CardTitle>
            <CardDescription>Your technical skills breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={skillData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }>
                  {skillData?.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Messages and Project Status */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Messages */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
            <CardDescription>
              Latest messages from your contact form
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {messages?.messages?.slice(0, 4)?.map((message) => (
                <div
                  key={message._id}
                  onClick={() => {
                    navigate(`/messages`);
                  }}
                  className="flex items-center space-x-4 border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <Mail className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate">
                        {message.name}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {message.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {message.email}
                    </p>
                    <p className="text-sm truncate">{message.message}</p>
                  </div>
                  <div>
                    {!message.read && <Badge variant="destructive">New</Badge>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Project Status and Profile Completeness */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Project Status</CardTitle>
            <CardDescription>Overview of your project progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              {projectStatusData.map((item) => (
                <div
                  key={item.status}
                  className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.status}</span>
                  <Badge variant="outline">{item.count} projects</Badge>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  Profile Completeness
                </span>
                <span className="text-sm text-muted-foreground">
                  {stats.profileCompleteness}%
                </span>
              </div>
              <Progress value={stats.profileCompleteness} className="w-full" />
              <p className="text-xs text-muted-foreground">
                Complete your profile to increase visibility
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={() => navigate("/projects")}
                  variant="outline"
                  size="sm"
                  className="text-xs">
                  Add Project
                </Button>
                <Button
                  onClick={() => navigate("/skills")}
                  variant="outline"
                  size="sm"
                  className="text-xs">
                  Update Skills
                </Button>
                <Button
                  onClick={() => navigate("/messages")}
                  variant="outline"
                  size="sm"
                  className="text-xs">
                  Check Messages
                </Button>
                <Button
                  onClick={() => navigate("/resume")}
                  variant="outline"
                  size="sm"
                  className="text-xs">
                  View Resume
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
