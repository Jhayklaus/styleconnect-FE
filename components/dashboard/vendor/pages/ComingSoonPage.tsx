export function ComingSoonPage({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <p className="font-inter font-medium text-2xl text-text-900 mb-2">
        {title}
      </p>
      <p className="font-jost text-sm text-text-500 max-w-sm">
        This screen is part of the vendor module and will be built out next.
      </p>
    </div>
  );
}
