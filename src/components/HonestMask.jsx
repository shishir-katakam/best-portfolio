import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, useSpring, useMotionValue, useMotionTemplate, useTransform } from 'framer-motion';

const CursorContext = createContext();

export const CursorProvider = ({ children }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovering, setIsHovering] = useState(false);

    const springConfig = { damping: 25, stiffness: 150 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <CursorContext.Provider value={{ cursorX, cursorY, mouseX, mouseY, isHovering, setIsHovering }}>
            {children}
            <CustomCursor />
        </CursorContext.Provider>
    );
};

export const useCursor = () => useContext(CursorContext);

const CustomCursor = () => {
    const { cursorX, cursorY, isHovering } = useCursor();

    return (
        <motion.div
            style={{
                left: cursorX,
                top: cursorY,
                translateX: '-50%',
                translateY: '-50%',
            }}
            className="fixed pointer-events-none z-[9999] flex items-center justify-center"
            animate={{
                width: isHovering ? 300 : 12,
                height: isHovering ? 300 : 12,
            }}
        >
            <div className={`w-full h-full rounded-full bg-accent transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-100'}`} />
        </motion.div>
    );
};

export const DualText = ({ professional, honest }) => {
    const { setIsHovering, cursorX, cursorY, mouseX, mouseY } = useCursor();
    const [isLocalHover, setIsLocalHover] = useState(false);
    const [rect, setRect] = useState({ left: 0, top: 0 });
    const containerRef = React.useRef(null);
    const hoverRef = React.useRef(false);

    hoverRef.current = isLocalHover;

    useEffect(() => {
        const updateRect = () => {
            if (containerRef.current) {
                const newRect = containerRef.current.getBoundingClientRect();
                setRect({ left: newRect.left, top: newRect.top });

                const mx = mouseX.get();
                const my = mouseY.get();
                const isMouseInside = mx >= newRect.left && mx <= newRect.right && my >= newRect.top && my <= newRect.bottom;

                if (hoverRef.current && !isMouseInside) {
                    // Cursor scrolled out from under text → un-hover
                    setIsHovering(false);
                    setIsLocalHover(false);
                } else if (!hoverRef.current && isMouseInside) {
                    // Text scrolled into a stationary cursor → hover
                    setIsHovering(true);
                    setIsLocalHover(true);
                }
            }
        };
        updateRect();
        window.addEventListener('resize', updateRect);
        // Important: Listen to document scroll, not just window scroll
        document.addEventListener('scroll', updateRect, true);

        return () => {
            window.removeEventListener('resize', updateRect);
            document.removeEventListener('scroll', updateRect, true);
        };
    }, []);

    // cursorX and cursorY are clientX/clientY (relative to viewport).
    // rect.left and rect.top are also relative to viewport! 
    // They are perfectly synchronized naturally, as long as rect is updated on scroll.
    // Calculate cursor position strictly relative to the container's top-left corner
    const relativeX = useTransform(cursorX, x => x - rect.left);
    const relativeY = useTransform(cursorY, y => y - rect.top);
    const maskImage = useMotionTemplate`radial-gradient(150px circle at ${relativeX}px ${relativeY}px, black 100%, transparent 100%)`;

    return (
        <span
            className="relative inline-grid group"
            onMouseEnter={() => { setIsHovering(true); setIsLocalHover(true); }}
            onMouseLeave={() => { setIsHovering(false); setIsLocalHover(false); }}
            ref={containerRef}
            style={{ cursor: "none" }}
        >
            {/* Professional Text (Always 100% visible, no fading) */}
            <span className="[grid-area:1/1] whitespace-nowrap text-inherit flex items-center justify-center pointer-events-none">
                {professional}
            </span>

            {/* Honest Text (Top Layer - identical size, but masked to show only under cursor) */}
            <motion.span
                className="[grid-area:1/1] pointer-events-none text-background font-black whitespace-nowrap flex items-center justify-center z-[10000]"
                style={{
                    WebkitMaskImage: maskImage,
                    maskImage: maskImage,
                    opacity: isLocalHover ? 1 : 0
                }}
            >
                {honest}
            </motion.span>
        </span>
    );
};
