import axios from 'axios';

const LOG_API_URL = '/api/evaluation-service/logs';

/**
 * Reusable logger utility for the Notification Management System.
 * Constraints from Image:
 * stack: "frontend", "backend"
 * level: "debug", "info", "warn", "error", "fatal"
 * package: "api", "component", "hook", "page", "handler", "repository", "route", "service"
 * 
 * @param {string} stack - "frontend" | "backend"
 * @param {string} level - "debug" | "info" | "warn" | "error" | "fatal"
 * @param {string} packageName - Valid package name
 * @param {string} message - Descriptive log message
 */
export const Log = async (stack, level, packageName, message) => {
  // Validate package name to match constraints in Image 4 & 5
  // If the provided packageName isn't in the list, default to "page" or "component"
  const validPackages = ["api", "component", "hook", "page", "handler", "repository", "route", "service"];
  const pName = packageName.toLowerCase();
  const finalPackage = validPackages.includes(pName) ? pName : "page";

  const token = localStorage.getItem('token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhMjAyM2NzZTkzNjRAaW1zZWMuYWMuaW4iLCJleHAiOjE3ODA5MDYxOTMsImlhdCI6MTc4MDkwNTI5MywiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjBkMmU2MTc1LTdjODctNDc1My05YTJlLWMwZjE5YmVkNjE4MSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6Imxha3NoYXkgc2hhcm1hIiwic3ViIjoiZGY5MjJiMjgtNDNmZi00MTYxLTgwMTgtOWI1NDNjNDhlMjUyIn0sImVtYWlsIjoiYTIwMjNjc2U5MzY0QGltc2VjLmFjLmluIiwibmFtZSI6Imxha3NoYXkgc2hhcm1hIiwicm9sbE5vIjoiMjMwMTQzMDEwMDEyOCIsImFjY2Vzc0NvZGUiOiJueVhRTXUiLCJjbGllbnRJRCI6ImRmOTIyYjI4LTQzZmYtNDE2MS04MDE4LTliNTQzYzQ4ZTI1MiIsImNsaWVudFNlY3JldCI6ImNqeWdWYVBndkFIZnlNUlEifQ.CQ7endwg5NKleCje3u4aI241I7myladrQ1CyG9Hit90';

  const logData = {
    stack: stack.toLowerCase(),
    level: level.toLowerCase(),
    package: finalPackage,
    message
  };

  try {
    await axios.post(LOG_API_URL, logData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(`[LOG SENT]: [${finalPackage}] ${message}`);
  } catch (error) {
    console.error(`[LOG FAILED]: [${finalPackage}] ${message}`, error.response?.data || error.message);
  }
};
