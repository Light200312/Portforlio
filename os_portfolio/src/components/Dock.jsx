import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Tooltip } from "react-tooltip";

// Note: Ensure you are importing your constants and Zustand store properly
// based on your exact file structure.
import { dockApps } from "#constants"; 
// import useWindowStore from "@/store/window"; 

const Dock = () => {
//   const { openWindow, closeWindow, windows } = useWindowStore();
  const dockRef = useRef(null);

  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const icons = dock.querySelectorAll(".dock-icon");

    const animateIcons = (mouseX) => {
      const { left } = dock.getBoundingClientRect();
      
      icons.forEach((icon) => {
        const rect = icon.getBoundingClientRect();
        const iconLeft = rect.left;
        const width = rect.width;
        
        // Calculate distance from cursor to the center of the icon
        const center = iconLeft - left + width / 2;
        const distance = Math.abs(mouseX - center);
        
        // Intensity curve so only nearby icons scale up
        const intensity = Math.exp(-(distance ** 2) / 5000);

        gsap.to(icon, {
          scale: 1 + 0.25 * intensity,
          y: -15 * intensity,
          duration: 0.2,
          ease: "power1.out",
        });
      });
    };

    const handleMouseMove = (e) => {
      const { left } = dock.getBoundingClientRect();
      animateIcons(e.clientX - left);
    };

    const resetIcons = () => {
      icons.forEach((icon) => {
        gsap.to(icon, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power1.out",
        });
      });
    };

    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", resetIcons);

    return () => {
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("mouseleave", resetIcons);
    };
  }, []);

  const toggleApp = (app) => {
    // if (!app.canOpen) return;
    
    // const window = windows[app.id];
    
    // // CodeRabbit Fix: Defensive check to prevent runtime errors 
    // // if there's a mismatch between dockApps and windowConfig
    // if (!window) return; 

    // if (window.isOpen) {
    //   closeWindow(app.id);
    // } else {
    //   openWindow(app.id);
    // }
  };

  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map((app) => {
          const { id, name, icon, canOpen } = app;

          return (
            <div key={id || name} className="relative flex justify-center">
              <button
                type="button"
                className="dock-icon"
                aria-label={name}
                data-tooltip-id="dock-tooltip"
                data-tooltip-content={name}
                data-tooltip-delay-show={150}
                onClick={() => toggleApp(app)}
                disabled={!canOpen}
              >
                <img
                  src={`/images/${icon}`}
                  alt={name}
                  loading="lazy"
                  className={canOpen ? "" : "opacity-60"}
                />
              </button>
            </div>
          );
        })}
      </div>
      <Tooltip id="dock-tooltip" place="top" className="tooltip" />
    </section>
  );
};

export default Dock;