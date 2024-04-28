import { eachDayOfInterval, eachWeekOfInterval, endOfMonth, endOfWeek, format, startOfMonth, startOfWeek } from "date-fns";
import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded shadow">
        <p className="font-bold">{`${label}: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export default function App() {
  const [jobsData, setJobsData] = useState([]);
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    // Fetch job application data from local storage
    const storedJobs = localStorage.getItem(`jobs_${userEmail}`);
    if (storedJobs) {
      const parsedJobs = JSON.parse(storedJobs);
      const jobsWithDate = parsedJobs.map((job) => ({
        ...job,
        applicationDate: new Date(), // Set the current date as the application date
      }));
      setJobsData(jobsWithDate);
    }
  }, [userEmail]);

  // Filter job applications by month
  const jobsThisMonth = jobsData.filter((job) => {
    const jobDate = job.applicationDate;
    const currentDate = new Date();
    return (
      jobDate.getMonth() === currentDate.getMonth() &&
      jobDate.getFullYear() === currentDate.getFullYear()
    );
  });

  // Filter job applications by week
  const jobsThisWeek = jobsData.filter((job) => {
    const jobDate = job.applicationDate;
    const currentDate = new Date();
    const startOfCurrentWeek = startOfWeek(currentDate);
    const endOfCurrentWeek = endOfWeek(currentDate);
    return jobDate >= startOfCurrentWeek && jobDate <= endOfCurrentWeek;
  });

  // Generate data for the monthly chart
  const monthlyData = eachDayOfInterval({
    start: startOfMonth(new Date()),
    end: endOfMonth(new Date()),
  }).map((date) => {
    const jobsOnDate = jobsThisMonth.filter(
      (job) => job.applicationDate.toDateString() === date.toDateString()
    );
    return {
      date: format(date, "MMM d"),
      jobs: jobsOnDate.length,
    };
  });

  // Generate data for the weekly chart
  const weeklyData = eachWeekOfInterval({
    start: startOfMonth(new Date()),
    end: endOfMonth(new Date()),
  }).map((date) => {
    const startOfWeekDate = startOfWeek(date);
    const endOfWeekDate = endOfWeek(date);
    const jobsInWeek = jobsThisMonth.filter(
      (job) =>
        job.applicationDate >= startOfWeekDate &&
        job.applicationDate <= endOfWeekDate
    );
    return {
      week: `Week ${format(date, "w")}`,
      jobs: jobsInWeek.length,
    };
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Job Application Statistics</h1>

      <div className="bg-white rounded shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Jobs Applied This Month</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="jobs" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded shadow p-6">
        <h2 className="text-xl font-bold mb-4">Jobs Applied This Week</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={weeklyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="jobs" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}