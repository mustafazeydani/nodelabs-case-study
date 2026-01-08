import { StatisticsCardsSection } from './_components/statistic-cards-section';

export { metadata } from './_utils/metadata';

export default function Home() {
  return (
    <div className="flex gap-8">
      <StatisticsCardsSection />
    </div>
  );
}
