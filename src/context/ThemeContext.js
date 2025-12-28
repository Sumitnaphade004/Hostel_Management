import { createContext, useContext, useState } from 'react';

// Theme definitions
export const themes = {
  light: {
    // Main backgrounds
    bg: '#ffffff',
    bgSecondary: '#f8f9fa',
    bgLight: '#e9ecef',
    
    // Sidebar
    sidebarBg: '#212529',
    sidebarText: '#ffffff',
    sidebarHover: 'rgba(255,255,255,0.1)',
    sidebarActive: '#0d6efd',
    sidebarBorder: '#343a40',
    
    // Topbar
    topbarBg: '#ffffff',
    topbarText: '#212529',
    topbarBorder: '#dee2e6',
    topbarHover: '#2563eb',
    
    // Text colors
    textPrimary: '#212529',
    textSecondary: '#6c757d',
    textMuted: '#adb5bd',
    
    // Buttons
    btnPrimary: '#0d6efd',
    btnPrimaryHover: '#0b5ed7',
    btnSecondary: '#6c757d',
    btnSecondaryHover: '#5c636a',
    btnDanger: '#dc3545',
    btnDangerHover: '#bb2d3b',
    btnSuccess: '#198754',
    btnSuccessHover: '#157347',
    
    // Borders & Cards
    border: '#dee2e6',
    cardBg: '#ffffff',
    cardShadow: '0 0.125rem 0.25rem rgba(0,0,0,0.075)',
    
    // Input fields
    inputBg: '#ffffff',
    inputBorder: '#ced4da',
    inputText: '#212529',
    inputPlaceholder: '#6c757d',
    inputFocus: '#86b7fe',
    
    // Status colors
    success: '#198754',
    warning: '#ffc107',
    danger: '#dc3545',
    info: '#0dcaf0',
    
    // Badge colors
    badgeDanger: '#dc3545',
    badgeSuccess: '#198754',
    badgeWarning: '#ffc107',
    badgeInfo: '#0dcaf0',
  },
  
  dark: {
    // Main backgrounds
    bg: '#0d1117',
    bgSecondary: '#161b22',
    bgLight: '#21262d',
    
    // Sidebar
    sidebarBg: '#010409',
    sidebarText: '#c9d1d9',
    sidebarHover: 'rgba(201,209,217,0.1)',
    sidebarActive: '#1f6feb',
    sidebarBorder: '#21262d',
    
    // Topbar
    topbarBg: '#161b22',
    topbarText: '#c9d1d9',
    topbarBorder: '#30363d',
    topbarHover: '#38bdf8',

    // Text colors
    textPrimary: '#c9d1d9',
    textSecondary: '#8b949e',
    textMuted: '#6e7681',
    
    // Buttons
    btnPrimary: '#1f6feb',
    btnPrimaryHover: '#388bfd',
    btnSecondary: '#30363d',
    btnSecondaryHover: '#484f58',
    btnDanger: '#da3633',
    btnDangerHover: '#f85149',
    btnSuccess: '#238636',
    btnSuccessHover: '#2ea043',
    
    // Borders & Cards
    border: '#30363d',
    cardBg: '#161b22',
    cardShadow: '0 0.125rem 0.25rem rgba(0,0,0,0.3)',
    
    // Input fields
    inputBg: '#0d1117',
    inputBorder: '#30363d',
    inputText: '#c9d1d9',
    inputPlaceholder: '#6e7681',
    inputFocus: '#388bfd',
    
    // Status colors
    success: '#2ea043',
    warning: '#d29922',
    danger: '#f85149',
    info: '#58a6ff',
    
    // Badge colors
    badgeDanger: '#da3633',
    badgeSuccess: '#2ea043',
    badgeWarning: '#d29922',
    badgeInfo: '#58a6ff',
  }
};

// Create Theme Context
const ThemeContext = createContext();

// Theme Provider Component
export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem('hostel-theme');
    return savedTheme ? savedTheme : 'light';
  });

  const theme = themes[currentTheme];

  const handleThemeChange = (newTheme) => {
    setCurrentTheme(newTheme);
    localStorage.setItem('hostel-theme', newTheme);
  };

  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const value = {
    theme,
    currentTheme,
    setCurrentTheme: handleThemeChange,
    isCollapsed,
    setIsCollapsed,
    themes
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use theme
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

export default ThemeContext;