import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ChatPage from "@/pages/ChatPage";
import FamilyPage from "@/pages/FamilyPage";
import AnniversaryPage from "@/pages/AnniversaryPage";
import ProfilePage from "@/pages/ProfilePage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/chat" replace />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/chat/:id" element={<ChatPage />} />
        <Route path="/family" element={<FamilyPage />} />
        <Route path="/anniversary" element={<AnniversaryPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}
