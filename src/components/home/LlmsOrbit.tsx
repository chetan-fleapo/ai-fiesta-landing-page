const LLMS = [
  { name: 'ChatGPT', src: '/images/models/chatgpt.png' },
  { name: 'Claude', src: '/images/models/claude.png' },
  { name: 'Gemini', src: '/images/models/gemini.png' },
  { name: 'Meta', src: '/images/models/meta.png' },
  { name: 'Perplexity', src: '/images/models/perplexity.png' },
  { name: 'DeepSeek', src: '/images/models/deepseek.png' },
];

const ORBIT_DURATION = 28; // seconds
const ORBIT_RADIUS = 120; // px
const ICON_SIZE = 46;
const CONTAINER = 320;
const ORB_SIZE = 90;

export function LlmsOrbit() {
  return (
    <>
      <style>{`
        @keyframes llm-carrier {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes llm-icon {
          from { transform: translateX(${ORBIT_RADIUS}px) rotate(0deg); }
          to   { transform: translateX(${ORBIT_RADIUS}px) rotate(-360deg); }
        }
        @keyframes orb-glow {
          0%,100% { box-shadow: 0 0 28px 6px rgba(0,196,140,0.55), 0 0 70px 10px rgba(0,196,140,0.22); }
          50%      { box-shadow: 0 0 40px 10px rgba(0,196,140,0.75), 0 0 90px 16px rgba(0,196,140,0.30); }
        }
        @keyframes disc-glow {
          0%,100% { opacity: 0.7; }
          50%      { opacity: 1; }
        }
      `}</style>

      <div
        className="relative mx-auto mt-6 sm:hidden"
        style={{ width: CONTAINER, height: CONTAINER }}
        aria-hidden="true"
      >
        {/* Radial backdrop */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 58%, rgba(0,180,120,0.18) 0%, transparent 75%)',
          }}
        />

        {/* Outer faint ring */}
        <div
          className="absolute rounded-full"
          style={{
            width: ORBIT_RADIUS * 2 + 36,
            height: ORBIT_RADIUS * 2 + 36,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            border: '1px solid rgba(0,200,150,0.10)',
          }}
        />

        {/* Main orbit ring */}
        <div
          className="absolute rounded-full"
          style={{
            width: ORBIT_RADIUS * 2,
            height: ORBIT_RADIUS * 2,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            border: '1px solid rgba(0,200,150,0.22)',
          }}
        />

        {/* Disc shadow beneath orb */}
        <div
          className="absolute rounded-full"
          style={{
            width: ORB_SIZE + 20,
            height: 18,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, 30px)',
            background:
              'radial-gradient(ellipse, rgba(0,180,120,0.45) 0%, transparent 75%)',
            filter: 'blur(6px)',
            animation: 'disc-glow 3s ease-in-out infinite',
          }}
        />

        {/* Orbiting LLM icons */}
        {LLMS.map((llm, i) => {
          const delay = -((ORBIT_DURATION / LLMS.length) * i);
          return (
            <div
              key={llm.name}
              className="absolute"
              style={{
                top: '50%',
                left: '50%',
                width: 0,
                height: 0,
                animation: `llm-carrier ${ORBIT_DURATION}s linear infinite`,
                animationDelay: `${delay}s`,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  width: ICON_SIZE,
                  height: ICON_SIZE,
                  top: -ICON_SIZE / 2,
                  animation: `llm-icon ${ORBIT_DURATION}s linear infinite`,
                  animationDelay: `${delay}s`,
                }}
              >
                <div
                  style={{
                    width: ICON_SIZE,
                    height: ICON_SIZE,
                    borderRadius: '50%',
                    background: 'rgba(10,12,18,0.88)',
                    border: '1.5px solid rgba(255,255,255,0.13)',
                    backdropFilter: 'blur(12px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 18px rgba(0,0,0,0.35)',
                  }}
                >
                  <img
                    src={llm.src}
                    alt={llm.name}
                    width={28}
                    height={28}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
            </div>
          );
        })}

        {/* Central glowing orb */}
        <div
          className="absolute flex items-center justify-center"
          style={{
            top: '50%',
            left: '50%',
            width: ORB_SIZE,
            height: ORB_SIZE,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background:
              'radial-gradient(circle at 36% 30%, #a8ffea 0%, #00c896 35%, #007d60 70%, #003d30 100%)',
            animation: 'orb-glow 3.2s ease-in-out infinite',
            zIndex: 10,
          }}
        >
          <img
            src="/images/logo.svg"
            alt="AI Fiesta"
            width={52}
            height={52}
            style={{ filter: 'brightness(0) invert(1)', opacity: 0.88 }}
          />
        </div>
      </div>
    </>
  );
}
