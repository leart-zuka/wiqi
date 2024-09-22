export default function QTLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div className="flex justify-between">
            </div>
            <div className="p-20">{children}</div>
        </div>
    );
}
