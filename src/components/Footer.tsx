import Image from "next/image";
import CurrentYear from "@/components/CurrentYear";

type FooterLink = {
  label: string;
  /**
   * Same-page hash anchor when the item maps to a real section, otherwise "#"
   * for products without a panel (intentional demo placeholders).
   */
  href: string;
};

type FooterColumn = {
  heading: string;
  links: FooterLink[];
};

const columns: FooterColumn[] = [
  {
    heading: "Vehicles",
    links: [
      { label: "Model S", href: "#model-s" },
      { label: "Model 3", href: "#model-3" },
      { label: "Model X", href: "#model-x" },
      { label: "Model Y", href: "#model-y" },
    ],
  },
  {
    heading: "Energy",
    links: [
      { label: "Solar Roof", href: "#solar-roof" },
      { label: "Solar Panels", href: "#solar-panels" },
      { label: "Powerwall", href: "#" },
      { label: "Megapack", href: "#" },
    ],
  },
  {
    heading: "Charging",
    links: [
      { label: "Supercharger", href: "#" },
      { label: "Home Charging", href: "#" },
      { label: "Trip Planner", href: "#" },
      { label: "Find Us", href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Investor Relations", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];

const legalLinks: FooterLink[] = [
  { label: "Privacy & Legal", href: "#" },
  { label: "Vehicle Recalls", href: "#" },
  { label: "Locations", href: "#" },
  { label: "News", href: "#" },
  { label: "Careers", href: "#" },
];

const linkClass =
  "text-sm text-white/55 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-sm";

export default function Footer() {
  return (
    <footer
      id="site-footer"
      className="flex min-h-[100svh] snap-start flex-col border-t border-white/10 bg-ink"
    >
      {/* Link grid */}
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 py-24">
        <Image
          src="/images/tesla.svg"
          alt="Tesla"
          width={342}
          height={35}
          className="w-[188px] invert"
        />

        <nav
          aria-label="Footer"
          className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4"
        >
          {columns.map((column) => (
            <div key={column.heading}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-white/90">
                {column.heading}
              </h2>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={linkClass}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Legal bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <p className="text-xs text-white/60">
            © <CurrentYear /> Tesla, Reimagined · Demo project, not affiliated
            with Tesla, Inc.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-xs text-white/55 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
