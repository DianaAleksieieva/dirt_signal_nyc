"use client";

import React from 'react';

/* Display charts */
const ImageGallery = ({ images, title, onImageClick }) => (
  <div className="mt-4">
    <h3 className="text-sm font-medium text-gray-700 mb-2">{title} Click any chart to view larger</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-lg shadow-inner p-4">
      {images.map((image, index) => (
        <div 
          key={index} 
          className="border border-gray-100 rounded-lg overflow-hidden transition duration-300 transform hover:scale-[1.01] shadow-md cursor-pointer"
          onClick={() => onImageClick(image)}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-auto object-contain"
            contentfetchid={image.id}
          />
        </div>
      ))}
    </div>
  </div>
);

const AnalysisBlock = ({ title, description, images, onImageClick }) => (
  <div className="bg-white/95 rounded-xl shadow-xl p-6 mb-10 border border-eco-green-dark/10">
    <h2 className="text-xl font-semibold text-eco-green-dark mb-2">
      {title}
    </h2>
    <ImageGallery images={images} onImageClick={onImageClick} />
    <p className="text-eco-text-dark/70 mb-4">{description}</p>
  </div>
);


export default function TrashAnalysis() {
  const [selectedImage, setSelectedImage] = React.useState(null);

  const customColors = {
    'eco-beige': '#f5f5f0',
    'eco-text': '#333333',
    'eco-text-dark': '#1a1a1a',
    'eco-green-light': '#a8e6cf',
    'eco-green-dark': '#2c6e49',
  };

  const categories = [
    {
      title: '📊 1. 2024 Municipal Waste Analysis',
      description: "The trend shows a division between in the high trash districts: a cluster above and a cluster below. Noticibly, Queens District 7 had a significant jump from 2017 to 2018, going from below to above to becoming the highest tons collected of all the districts.",
      images: [
        { id: 'uploaded:1.png-5dabec64-ed57-490c-b49c-a346fbc269ee', src: '/trash_charts/1.png', alt: 'Average Monthly Refuse Tons Collected by Borough (2024)' },
        { id: 'uploaded:2.png-faf897f2-456e-4d7e-b874-d365cb5362e2', src: '/trash_charts/2.png', alt: 'Top 10 Community Districts by Average Monthly Refuse Tons Collected (2024)' },
        { id: 'uploaded:3.png-27a74a68-a8f8-4b10-a438-ac72855c50d1', src: '/trash_charts/3.png', alt: 'Refuse Tons per 1000 Residents by Borough and Community District (2024) - Heatmap with Tons' },
        { id: 'uploaded:4.png-cb620397-5a73-488b-ad93-ff7157b1d600', src: '/trash_charts/4.png', alt: 'Average Monthly Refuse Tons Collected by Borough and Community District (2024) - Heatmap' },
        { id: 'uploaded:5.png-bcc2cd47-3715-4bb4-9600-2785a504348c', src: '/trash_charts/5.png', alt: 'Trend of Average Monthly Refuse Tons Collected (2014-2024) for Top 10 Districts' },
      ],
    },
    {
      title: '🗑️ 2. Waste Per Capita (Tons per 1000 Residents) Analysis',
      description: "It is apparent that only one district, Bronx District 2, has an astronomical amount of trash per capita contrasted with all other districts. Looking at the past decade, it was higher and increasing until 2020, during the pandemic. The meaning here, is not that residents in that area produce more trash, but potentially high waste industrial activity in that area of the Bronx.",
      images: [
        { id: 'uploaded:6.png-67de1078-0785-4376-8e70-2e9e574965ad', src: '/trash_charts/6.png', alt: 'Average Monthly Refuse Tons per 1000 Residents by Borough (2024)' },
        { id: 'uploaded:7.png-ba9e9d25-e887-4471-86fb-f2e6575f688a', src: '/trash_charts/7.png', alt: 'Top 10 Community Districts by Refuse Tons per 1000 Residents (2024)' },
        { id: 'uploaded:8.png-8724c1bf-a261-4bef-bd6d-81ec69e3ab61', src: '/trash_charts/8.png', alt: 'Refuse Tons per 1000 Residents by Borough and Community District (2024) - Heatmap' },
        { id: 'uploaded:9.png-8c0f784f-5a26-49fa-b851-4b29f68dfa70', src: '/trash_charts/9.png', alt: 'Refuse Tons per 1000 Residents by Borough and Community District (2024) - Empty Heatmap' },
        { id: 'uploaded:10.png-21bab919-cb8d-4456-bb39-d8d6e339de10', src: '/trash_charts/10.png', alt: 'Trend of Refuse Tons per 1000 Residents in Bronx, District 2 (2014-2024)' },
      ],
    },
    {
      title: '📞 3. 311 Complaint Analysis',
      description: "Chart 1 visualizes the number of 311 reports in the highest waste districts. Of the highest waste districts, those that have high 311 reports mean this area has a lot of trash, but poor sanitation. These areas need attention, especially the top 3. Chart 2 visualizes the amount of waste in the districts with the highest 311 reports. Interestingly, the waste amounts are pretty similar (flatter), meaning these probably are not the dirtiest areas, but other reasons for the high 311 reports.",
      images: [
        { id: 'uploaded:11.png-b667b34a-b3da-4fbd-b1c6-aeed5739d7d5', src: '/trash_charts/11.png', alt: '311 Complaint Count for Top 10 Refuse Districts (2024)' },
        { id: 'uploaded:14.png-77e50703-17eb-4a89-88bf-e1b6eec98cc5', src: '/trash_charts/14.png', alt: 'Average Monthly Refuse Tons Collected for Top 10 Complaint Districts (2024)' },
        { id: 'uploaded:12.png-c9aab15b-fe89-4d09-bc6f-956d7871cdf1', src: '/trash_charts/12.png', alt: 'Total 311 Collection Complaints by Borough and Community District (2024) - With numbers' },
        { id: 'uploaded:13.png-95e79971-ac8c-47b5-9abe-199c1ff2bf26', src: '/trash_charts/13.png', alt: 'Total 311 Collection Complaints by Borough and Community District (2024) - Heatmap' },
      ],
    },
  ];

  return (
    <>
      <style jsx global>{`
        :root {
          --color-eco-beige: ${customColors['eco-beige']};
          --color-eco-text: ${customColors['eco-text']};
          --color-eco-text-dark: ${customColors['eco-text-dark']};
          --color-eco-green-light: ${customColors['eco-green-light']};
          --color-eco-green-dark: ${customColors['eco-green-dark']};
        }
      `}</style>
      
      <script>
        {`
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  'eco-beige': 'var(--color-eco-beige)',
                  'eco-text': 'var(--color-eco-text)',
                  'eco-text-dark': 'var(--color-eco-text-dark)',
                  'eco-green-light': 'var(--color-eco-green-light)',
                  'eco-green-dark': 'var(--color-eco-green-dark)',
                },
              },
            },
          }
        `}
      </script>

      <div className="min-h-screen bg-eco-beige text-eco-text pt-8 px-4 sm:px-6 lg:px-8 pb-10 font-sans">
        
        <header className="max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl font-extrabold text-eco-green-dark mb-3">
            🚮 DSNY Trash Collected Report
          </h1>
          <p className="text-lg text-eco-text-dark/80">
            This page visualizes NYC's Sanitation Operations (DSNY). Tonnage is the total amount of waste collected by the city. Waste collected from litter baskets is “less than 3%” of all DSNY waste according to NYC's 2024 Zero Waste Report. They are the trash bags or overfilled bins on the sidewalks that can leak, spill, and be torn open by rats. So when you see a dirty street, it is not just pedestrians. 
          </p>
        </header>

        <main className="max-w-4xl mx-auto">
          {categories.map((category, index) => (
            <AnalysisBlock 
              key={index}
              title={category.title}
              description={category.description}
              images={category.images}
              onImageClick={setSelectedImage}
            />
          ))}
        </main>

        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-7xl max-h-full">
              <img 
                src={selectedImage.src} 
                alt={selectedImage.alt}
                className="max-w-4xl max-h-[70vh] object-contain"
              />
              <button 
                className="absolute top-2 right-2 bg-white/90 rounded-full w-8 h-8 flex items-center justify-center hover:bg-white"
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <footer className="mt-12 text-center text-sm text-eco-text/50">
          <p>Data Source: NYC Department of Sanitation (DSNY)</p>
        </footer>

      </div>
    </>
  );
}