import React from 'react'
import { useTheme } from '../../context/ThemeContext'

function Footer() {
    const {theme, isCollapsed } = useTheme()
  return (
    <footer
    className="mt-auto py-3"
    style={{
        marginLeft: isCollapsed ? "80px" : "220px",
        background: theme.footerBg,
        color: theme.text,
        borderTopWidth: "2px",
        borderTopStyle: "solid",
        borderTopColor: theme.footerBorder,
        transition: "margin-left 0.3s ease, background 0.3s ease",
    }}
    >
    <div className="container-fluid d-flex justify-content-between align-items-center">
        <span className="small">
        © {new Date().getFullYear()} Hostel Management System
        </span>

        <span className="small">
            Designed & Developed by{" "}
            <span
                style={{ color: theme.link, cursor: "pointer" }}
                onMouseEnter={(e) =>
                (e.currentTarget.style.color = theme.footerHover)
                }
                onMouseLeave={(e) =>
                (e.currentTarget.style.color = theme.link)
                }
            >
                Sumit
            </span>
        </span>
    </div>
    </footer>
  )
}

export default Footer
