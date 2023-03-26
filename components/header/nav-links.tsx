const links = [
  { url: "/", label: "Home" },
  { url: "/races", label: "Races" },
  { url: "/qualifying", label: "Qualifying" },
];

export default function NavLinks() {
  return (
    <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.url}
            className="block py-2 pl-3 pr-4 font-russo text-xl text-white bg-blue-700 rounded md:bg-transparent text-whitemd:p-0"
            aria-current="page"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
