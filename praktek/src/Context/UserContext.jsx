import { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
};

export const AppProvider = ({ children }) => {
  const [likedUsers, setLikedUsers] = useState(new Set());
  const [followedUsers, setFollowedUsers] = useState(new Set());
  const [theme, setTheme] = useState("light");

  const toggleLike = (userId) => {
    setLikedUsers((prev) => {
      const next = new Set(prev);
      if (next.has(userId)) next.delete(userId);
      else next.add(userId);
      return next;
    });
  };

  const toggleFollow = (userId) => {
    setFollowedUsers((prev) => {
      const next = new Set(prev);
      if (next.has(userId)) next.delete(userId);
      else next.add(userId);
      return next;
    });
  };

  const toggleTheme = () =>
    setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <AppContext.Provider
      value={{
        likedUsers,
        followedUsers,
        toggleLike,
        toggleFollow,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
