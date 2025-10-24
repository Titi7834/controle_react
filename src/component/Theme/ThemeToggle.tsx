import { useTheme } from './Theme';
import './ThemeToggle.css';

function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button 
            className="theme-toggle"
            onClick={toggleTheme}
        >
            {theme === 'light' ? '🌙' : '☀️'}
        </button>
    );
}

export default ThemeToggle;