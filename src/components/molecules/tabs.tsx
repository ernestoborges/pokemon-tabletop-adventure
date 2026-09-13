import ButtonSelect from "../atoms/button-select";

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
          <ButtonSelect
            key={tab.key}
            shape="square"
            color="blue"
            selected={selectedTab === index}
            onClick={() => onSelectTab(index)}
          >
            {tab.name}
          </ButtonSelect>
        ))}
      </div>
    </div>
  );
}
