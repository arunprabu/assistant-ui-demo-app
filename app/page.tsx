export default function Home() {
  return (
    <div className="h-full">
      <ul>
        <li>
          <a
            href="/rsc"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Go to RSC Based Chat page
          </a>
        </li>
        <li>
          <a
            href="/chat"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Go to Use chat based Chat page -- not working now
          </a>
        </li>
      </ul>
    </div>
  );
}
