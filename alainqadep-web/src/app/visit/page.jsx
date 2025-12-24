import {
  fetchPageByType,
  getVisitHeroSectionFromVisitPage,
  getBreadcrumbNavFromVisitPage,
  getTicketsOpeningHoursFromVisitPage,
  getGettingHereFromVisitPage,
  getVisitorFacilitiesFromVisitPage,
} from '@/app/lib/umbraco';
import VisitPageHeroSection from './components/VisitPageHeroSection';
import BreadcrumbNav from '../components/BreadcrumbNav';
import TicketsAndOpeningHoursSection from './components/TicketsAndOpeningHoursSection';
import GettingHereSection from '../components/GettingHereSection';
import VisitorFacilitiesSection from './components/VisitorFacilitiesSection';

export default async function Visit() {
  // Fetch visit page data from Umbraco
  const visitPage = await fetchPageByType('visit');

  // Debug: Log the full API response
  console.log('Full visitPage data:', JSON.stringify(visitPage, null, 2));

  // Extract data using mappers
  const heroSectionData = getVisitHeroSectionFromVisitPage(visitPage);
  const breadcrumbData = getBreadcrumbNavFromVisitPage(visitPage);
  const ticketsOpeningHoursData = getTicketsOpeningHoursFromVisitPage(visitPage);
  const gettingHereData = getGettingHereFromVisitPage(visitPage);
  const visitorFacilitiesData = getVisitorFacilitiesFromVisitPage(visitPage);

  // Debug logging
  console.log('Visitor Facilities Data:', visitorFacilitiesData);

  return (
    <main>
      <VisitPageHeroSection heroData={heroSectionData} />
      <BreadcrumbNav
        items={breadcrumbData?.items}
        backgroundColor={breadcrumbData?.backgroundColor}
      />

      <TicketsAndOpeningHoursSection data={ticketsOpeningHoursData} />

      <GettingHereSection
        smallTitle={gettingHereData?.smallTitle}
        mainTitle={gettingHereData?.mainTitle}
        transportOptions={gettingHereData?.transportOptions || []}
        googleMapEmbed={gettingHereData?.googleMapEmbed}
        backgroundColor={gettingHereData?.backgroundColor}
      />
      <VisitorFacilitiesSection data={visitorFacilitiesData} />

      <div className="max-w-7xl mx-auto py-10 px-6">
        {/* Additional visit page content goes here */}
      </div>
    </main>
  );
}
