export default function Footer() {
  return (
    <footer className="bg-slate-700 px-3 py-3">
      <p className="select-none text-xs text-white">
        © {new Date().getFullYear()}, Built with{" "}
        <span className="hover:animate-pulse">❤️</span> by Humans for Humans
      </p>
    </footer>
  );
}
