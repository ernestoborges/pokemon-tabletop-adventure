export default function Tabs({
  selectedTab,
  tabs,
  onSelectTab,
}: {
  selectedTab: number;
  tabs: { name: string; key: string }[];
  onSelectTab: (index: number) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        {tabs.map((tab, index) => (
          <button
            key={tab.key}
            className={`px-4 py-2 rounded-lg shadow-md cursor-pointer ${
              selectedTab === index
                ? "bg-primary text-white"
                : "bg-card hover:bg-background-hover"
            }`}
            onClick={() => onSelectTab(index)}
          >
            {tab.name}
          </button>
        ))}
      </div>
    </div>
  );
}
