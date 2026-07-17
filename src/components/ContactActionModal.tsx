import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  PhoneCall,
  Mail,
  X,
  ArrowUpRight,
} from "lucide-react";

interface ContactActionModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ContactActionModal({
  open,
  onClose,
}: ContactActionModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!open) return;

    const ctx = gsap.context(() => {
      gsap.set(".contact-card", {
        opacity: 0,
        y: 18,
      });

      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.3,
        }
      );

      gsap.fromTo(
        modalRef.current,
        {
          opacity: 0,
          y: 30,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          ease: "power3.out",
        }
      );

      gsap.to(".contact-card", {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        delay: 0.15,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", esc);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", esc);
    };
  }, [open]);

  const handleClose = () => {
    const tl = gsap.timeline({
      onComplete: onClose,
    });

    tl.to(".contact-card", {
      opacity: 0,
      y: 10,
      stagger: 0.04,
      duration: 0.18,
    });

    tl.to(
      modalRef.current,
      {
        opacity: 0,
        y: 20,
        scale: 0.98,
        duration: 0.25,
        ease: "power2.in",
      },
      "-=0.08"
    );

    tl.to(
      overlayRef.current,
      {
        opacity: 0,
        duration: 0.2,
      },
      "-=0.2"
    );
  };

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-lg p-5"
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          w-full
          max-w-lg
          rounded-3xl
          border
          border-white/10
          bg-[#222A35]
          p-8
          md:p-10
          shadow-[0_30px_80px_rgba(0,0,0,.45)]
        "
      >
        <button
          onClick={handleClose}
          className="
            absolute
            right-5
            top-5
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-white/5
            text-white/60
            transition
            hover:bg-white/10
            hover:text-white
          "
        >
          <X size={18} />
        </button>

        <p className="text-[11px] uppercase tracking-[0.35em] text-[#8D735B]">
          Contact
        </p>

        <img
          src="/logo.png"
          alt="KAD Studio"
          className="mt-5 h-11 w-auto"
        />

        <h2 className="mt-7 text-3xl font-light leading-tight text-white">
          Let's Build
          <br />
          Something Exceptional
        </h2>

        <p className="mt-5 max-w-md text-[15px] leading-7 text-white/60">
          Choose your preferred way to connect with our team.
          We're always happy to discuss your ideas and help
          bring your project to life.
        </p>

        <div className="mt-8 space-y-4">
          <ActionCard
            href="tel:+919826235711"
            icon={<PhoneCall size={20} />}
            title="Call Us"
            subtitle="+91 98262 35711"
          />

          <ActionCard
            href="tel:+918839461534"
            icon={<PhoneCall size={20} />}
            title="Call Us"
            subtitle="+91 88394 61534"
          />

          <ActionCard
            href="mailto:kadstudio1011@gmail.com"
            icon={<Mail size={20} />}
            title="Email"
            subtitle="kadstudio1011@gmail.com"
          />
        </div>
      </div>
    </div>
  );
}

interface CardProps {
  href: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

function ActionCard({
  href,
  title,
  subtitle,
  icon,
}: CardProps) {
  return (
    <a
      href={href}
      className="
        contact-card
        group
        flex
        items-center
        justify-between
        rounded-2xl
        border
        border-white/10
        bg-white/[0.03]
        px-5
        py-4
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:border-white
        hover:bg-white/[0.05]
      "
    >
      <div className="flex items-center gap-4">
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-[#8D735B]/10
            text-white
            transition-transform
            duration-300
            group-hover:scale-110
          "
        >
          {icon}
        </div>

        <div>
          <h3 className="text-[16px] font-medium text-white">
            {title}
          </h3>

          <p className="mt-1 text-sm text-white/55">
            {subtitle}
          </p>
        </div>
      </div>

      <ArrowUpRight
        size={18}
        className="
          text-white/30
          transition-all
          duration-300
          group-hover:translate-x-1
          group-hover:-translate-y-1
          group-hover:text-[#8D735B]
        "
      />
    </a>
  );
}