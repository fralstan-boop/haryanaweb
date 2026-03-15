"use client";

import useIsDesktop from "@/hooks/useIsDesktop";

export default function DesktopGate({ children }: { children: React.ReactNode }) {
  const { isDesktop, checked } = useIsDesktop();

  if (!checked) return null;

  if (!isDesktop) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#02060F] text-center px-6 overflow-hidden">
        <div className="max-w-xl">
          <h1 className="text-4xl font-semibold text-white mb-4">
            Cinematic Experience Recommended
          </h1>

          <p className="text-gray-400 mb-8">
            This digital archive is designed with intentional 3D depth and cinematic transitions tailored for desktop displays.
          </p>

          <div className="bg-[#0b1324] border border-white/10 rounded-xl p-6 mb-8">
            <p className="text-gray-300">
              To continue on mobile:
              <br />
              Open your browser menu and enable
              <strong> "Desktop Site"</strong>.
            </p>
          </div>

          <img
            src="/hayacorp.png"
            alt="HayaCorp"
            className="mx-auto max-w-[320px] opacity-90"
          />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
