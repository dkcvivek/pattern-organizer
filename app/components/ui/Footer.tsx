export default function Footer() {
  return (
    <footer className="h-12 bg-gray-900 text-gray-400 flex items-center justify-center text-sm">
      © {new Date().getFullYear()} Pattern Organizer
    </footer>
  );
}
